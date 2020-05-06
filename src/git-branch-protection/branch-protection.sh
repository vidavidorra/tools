#!/bin/sh
#
# Git branch protection (from git hook).
#
# This disallows some commands to be used on the protected branches. For
# example, the commands below will not be allowed if `master` is protected.
#
# - `git push --force origin master`
# - `git push --delete origin master`
# - `git push origin :master`
#
# Arguments:
# - This script excepts a list of strings, containing the branch names to
#   protect, as argument(s).
# Examples:
# - Protection of only the master branch.
#   branch-protection.sh "master"
# - Protection of the master and develop branch.
#   branch-protection.sh "master" "develop"


################################################################################
# Global configuration
################################################################################
# Redirect stdout to stderr.
# Some GUIs, like GitHub Desktop, will only show stderr, in the commit window
# for example. We just redirect all output to stderr so this output is seen by
# both terminals and GUIs.
exec 1>&2


################################################################################
# Constants
################################################################################
readonly PROTECTED_BRANCHES="$*"
readonly MINIMUM_GIT_VERSION='2.20.0'
readonly MINIMUM_GREATER_EQUAL_GIT_VERSION='2.19.99'


################################################################################
# Global variables
################################################################################
OS=''
GIT_COMMAND=''


################################################################################
# Functions
################################################################################
red() { printf "$(tput setaf 1)$*$(tput setaf 9)"; }

########################################
# Require Git version greater than MINIMUM_GIT_VERSION.
#
# Require a specific git version and exit with a non-zero code if the required
# version is not satisfied.
#
# Globals:
#   MINIMUM_GIT_VERSION
# Arguments:
#   None
# Returns:
#   None
########################################
require_git_version() {
  readonly minimum_version="minimum version ${MINIMUM_GREATER_EQUAL_GIT_VERSION}"
  readonly git_version="$(git --version)"

  if (printf "%s\n%s" "${minimum_version}" "${git_version}") \
      | sort --reverse --version-sort --key=3 | tail -1 | grep -q 'git'; then
      red "Unsupported git version. Found '${git_version}', but minimum "
      red "required version is '${MINIMUM_GIT_VERSION}.\n"
      exit 1
  fi
}

########################################
# Get operating system.
#
# Globals:
#   OS
# Arguments:
#   None
# Returns:
#   OS (global) - The OS.
########################################
get_os() {
  readonly kernel_name="$(uname -s)"

  case "${kernel_name}" in
    Darwin) OS='macOS' ;;
    Linux|GNU*) OS='Linux' ;;
    CYGWIN*|MSYS*|MINGW*) OS='Windows' ;;

    *)
      red "Unknown OS detected '${kernel_name}', please raise a ticket to add"
      red "support for your OS.\n"
      exit 1
    ;;
  esac

  readonly OS
}

########################################
# Get git command.
#
# Get the git command that triggered this script. It could be something like
# `git push --force`.
# We need to get the third parent because Husky is in-between the git command
# and this script. The two parents in-between are the original git hook and the
# Husky runner.
# To get there, we need to use two different methods, one for macOS and one for
# Linux and Windows. For macOS we go through the 'call stack' to get the third
# parent and for Linux and Windows we get the process group ID, which
# essentially is the PID of the git command.
#
# Globals:
#   OS
#   PPID or $$ - Depending on the OS.
# Arguments:
#   None
# Returns:
#   GIT_COMMAND (global) - The git command that triggered this script.
########################################
get_git_command() {
  # We need to get the third parent because Husky is in-between the git command
  # and this script. The two parents in-between are the original git hook and
  # the Husky runner.
  # To get there, we have
  if [ "${OS}" = 'macOS' ]; then
    readonly second_ppid="$(ps -oppid= ${PPID})"
    readonly third_ppid="$(ps -oppid= ${second_ppid})"
    GIT_COMMAND="$(ps -ocommand= ${third_ppid})"
  elif [ "${OS}" = 'Linux' ] || [ "${OS}" = 'Windows' ]; then
    # These lines are Windows and Linux.
    # The process group ID of the process (see proc manpage).
    readonly pgid="$(cut -f5 -d' ' /proc/$$/stat)"
    readonly GIT_COMMAND="$(xargs -0 < /proc/${pgid}/cmdline)"
  fi
}

########################################
# Protect git branch(es).
#
# Protect git branch(es) by disallowing the following list of commands. If a
# disallowed command is used, this will exit with a non-zero code.
# - `git push --force origin master`
# - `git push --delete origin master`
# - `git push origin :master`
#
# Globals:
#   PROTECTED_BRANCHES
#   GIT_COMMAND
# Arguments:
#   None
# Returns:
#   None
########################################
git_branch_protection() {
  readonly current_branch=$(git branch --show-current)
  readonly git_force_re='\-\-force|\-f'
  git_delete_re='\-\-delete|\-d'

  # Complete the git force regular expression with the special `:` refspec. See
  # the git-push documentation for more details on this case.
  for branch in ${PROTECTED_BRANCHES}; do
    git_delete_re="${git_delete_re}| :${branch}"
  done

  readonly git_delete_re

  if ( echo "${GIT_COMMAND}" | grep -Eq "${git_force_re}" ||
     echo "${GIT_COMMAND}" | grep -Eq "${git_delete_re}" ) &&
     echo "${PROTECTED_BRANCHES}" | grep -q "${current_branch}" ; then
  red "Force pushes and deletion of the '${current_branch}' are not allowed!\n"
  exit 1
fi
}


################################################################################
# Main script
################################################################################
require_git_version
get_os
get_git_command
git_branch_protection

exit 0
