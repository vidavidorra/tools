module.exports = {
  hooks: {
    'pre-commit': 'lint-staged && npm run build',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  },
};
