# vidavidorra logo

This document describes the construction of the vidavidorra logo, as shown below.

```
\\\\\\\\\\                                                          //  //////
 \\\\\\\\\\                                                        //  //////
  \\      \\                                                      //  //  //
   \\  \\  \\                                                    //  //  //
    \\  \\  \\                                                  //  //  //
     \\  \\  \\                                                //  //  //
      \\  \\  \\                                              //  //  //
       \\  \\  \\                                            //  //  //
        \\  \\  \\                                          //  //  //
         \\  \\  \\                                        //  //  //
          \\  \\  \\                                      //  //  //
           \\  \\  \\                                    //  //  //
            \\  \\  \\                                  //  //  //
             \\  \\  \\                                //  //  //
              \\  \\  \\                              //  //  //
               \\  \\  \\                            //  //  //
                \\  \\  \\                          //  //  //
                 \\  \\  \\                        //  //  //
                  \\  \\  \\                      //  //  //
                   \\  \\  \\                    //  //  //
                    \\  \\  \\                  //  //  //
                     \\  \\  \\                //  //  //
                      \\  \\  \\              //  //  //
                       \\  \\  \\            //  //  //
                        \\  \\  \\          //  //  //
                         \\  \\  \\        //  //  //
                          \\  \\  \\      //  //  //
                           \\  \\  \\    //  //  //
                            \\  \\  |   //  //  //
                             \\  \\    //  //  //
                              \\  \\  //  //  //
                               \\  \\//  //  //
                                \\  \/  //  //
                                 \\    //  //
                                  \\  //  //
                                   \\//  //
                                    \/  //
```

<a name="toc"></a>

# Table of contents

- [Dimensions](#dimensions)
  - [Perpendicular distance of thickness](#perpendicular-distance-of-thickness)
  - [Horizontal line section](#horizontal-line-section)
  - [Vertical line section](#vertical-line-section)
- [Sections](#sections)
  - [Double V](#double-v)
  - [Single V](#single-v)

# Dimensions

The dimensions as described in the table below are used in the icon. The dimensions for `PT`, `HS` and `VS` are formulae are described in [Horizontal line section](#horizontal-line-section) and [Vertical line section](#vertical-line-section), respectively.

| symbol | value                   | description                                                     |
| ------ | ----------------------- | --------------------------------------------------------------- |
| `H`    | 100                     | total height of the logo                                        |
| `T`    | 3                       | thickness of the line (purely vertical)                         |
| `W`    | $H$                     | width of a full-size `V` (this determines the angle of the `V`) |
| `PT`   | $0.5T$                  | perpendicular distance due to moving `T` in one axis            |
| `HS`   | $\sqrt{T^2 + (0.5T)^2}$ | purely horizontal slice of the line                             |
| `VS`   | $2HS$                   | purely vertical slice of the line                               |

## Perpendicular distance of thickness

This section shows how the perpendicular distance to moving `T` in one axis, is determined.

```
    |\
    | \
    |  \
    |   \
  a |    \
    |     \
    |      \
    |       \
    |________\
        b
```

If the thickness of the line is moved vertically, shown as `a` in the graph above, that will result in a horizontal movement for other points in the logo, shown as `b` in the graph above. This can be both horizontal and vertical, depending on the axis of moving the thickness of the line in. However, this movement is always perpendicular to the thickness of the line. Due to the definition of $W$ we know that `a` must be two times `b`. Therefore, we can define this perpendicular distance as $0.5T$, which we'll call $PT$.

## Horizontal line section

This section shows how the length of the horizontal section of the line, denoted with `c` in the graph below, is determined.

```
      ///////////
     /    c    /
    /         /
   /         /
  /         /
 /         /
/         /
```

When we rotate this section counter clockwise we get the following right triangle. Of this triangle we know two things.

1. `a` is the thickness of the line, $T$.
2. `b` is $\frac{T}{2}$. We know this due to definition of $W$.

With this information we can define `c` as $\sqrt{T^2 + \frac{T}{2}^2}$, which we'll call $HS$.

```
    |\
    | \
    |  \
    |   \
  a |    \ c
    |     \
    |      \
    |       \
    |________\
        b
```

## Vertical line section

This section shows how the height of the vertical section of the line, denoted with `d` in the graph below, is determined.

```
           ///////////
          /|        /
         / |       /
        /  |      /
       /   |     /
      /    | d  /
     /     |   /
    /      |  /
   /       | /
  /________|/
      c
```

From the [Horizontal line section](#horizontal-line-section), we know `c`. Due to the definition of $W$ we know that `d` must be two times `c`. Therefore, we can define it as $2HS$, which we'll call $VS$.

# Sections

The absolute origin for the logo is at the top left corner and is positive in the right and down directions.

## Double V

This table describes the construction of the double `V`, denoted by the non-dotted section of the logo below, and the point numbers in the logo.

| point       | horizontal (`x`)    | vertical (`y`) |
| ----------- | ------------------- | -------------- |
| 1 (initial) | $0$                 | $0$            |
| 2           | $\frac{H}{2}$       | $H$            |
| 3           | $H - PT$            | $T$            |
| 4           | $H - PT + HS$       | $T$            |
| 5           | $\frac{H}{2} + HS$  | $H$            |
| 6           | $\frac{H}{2} + 2HS$ | $H$            |
| 7           | $H + 2HS$           | $0$            |
| 8           | $H - HS$            | $0$            |
| 9           | $\frac{H}{2}$       | $H - VS$       |
| 10          | $PT + HS$           | $T$            |
| 11          | $PT + 4HS$          | $T$            |
| 12          | $\frac{H}{2}$       | $H - 4VS$      |
| 13          | $\frac{H}{2}$       | $H - 5VS$      | # x and Y are slightly different! |
| 14          | $5HS$               | $0$            |

```
1                                                                       8     7
\\\\\\\\\\ 14                                                       ..  //////
 \\\\\\\\\\                                                        ..  //////
  \\10  11\\                                                      ..  //34//
   \\  ..  \\                                                    ..  //  //
    \\  ..  \\                                                  ..  //  //
     \\  ..  \\                                                ..  //  //
      \\  ..  \\                                              ..  //  //
       \\  ..  \\                                            ..  //  //
        \\  ..  \\                                          ..  //  //
         \\  ..  \\                                        ..  //  //
          \\  ..  \\                                      ..  //  //
           \\  ..  \\                                    ..  //  //
            \\  ..  \\                                  ..  //  //
             \\  ..  \\                                ..  //  //
              \\  ..  \\                              ..  //  //
               \\  ..  \\                            ..  //  //
                \\  ..  \\                          ..  //  //
                 \\  ..  \\                        ..  //  //
                  \\  ..  \\                      ..  //  //
                   \\  ..  \\                    ..  //  //
                    \\  ..  \\                  ..  //  //
                     \\  ..  \\                ..  //  //
                      \\  ..  \\              ..  //  //
                       \\  ..  \\            ..  //  //
                        \\  ..  \\          ..  //  //
                         \\  ..  \\        ..  //  //
                          \\  ..  \\      ..  //  //
                           \\  ..  \\ 13 ..  //  //
                            \\  ..  |   ..  //  //
                             \\  .. 12 ..  //  //
                              \\  ..  ..  //  //
                               \\  ....  //  //
                                \\  ..  //  //
                                 \\ 9  //  //
                                  \\  //  //
                                   \\//  //
                                    \/  //
                                    2  5 6
```

## Single V

This table describes the construction of the single `V`, denoted by the non-dotted section of the logo below, and the point numbers in the logo.

| point       | horizontal (`x`) | vertical (`y`) |
| ----------- | ---------------- | -------------- |
| 1 (initial) | $2PT + 2HS$      | $2T$           |
| 2           | $\frac{H}{2}$    | $H - 2VS$      |
| 3           | $H - 2HS$        | $0$            |
| 4           | $H - 3HS$        | $0$            |
| 5           | $\frac{H}{2}$    | $H - 3VS$      |
| 6           | $2PT + 3HS$      | $2T$           |

```
                                                                    4 3
..........                                                          //  ......
 ..........                                                        //  ......
  .. 1  6 ..                                                      //  ..  ..
   ..  \\  ..                                                    //  ..  ..
    ..  \\  ..                                                  //  ..  ..
     ..  \\  ..                                                //  ..  ..
      ..  \\  ..                                              //  ..  ..
       ..  \\  ..                                            //  ..  ..
        ..  \\  ..                                          //  ..  ..
         ..  \\  ..                                        //  ..  ..
          ..  \\  ..                                      //  ..  ..
           ..  \\  ..                                    //  ..  ..
            ..  \\  ..                                  //  ..  ..
             ..  \\  ..                                //  ..  ..
              ..  \\  ..                              //  ..  ..
               ..  \\  ..                            //  ..  ..
                ..  \\  ..                          //  ..  ..
                 ..  \\  ..                        //  ..  ..
                  ..  \\  ..                      //  ..  ..
                   ..  \\  ..                    //  ..  ..
                    ..  \\  ..                  //  ..  ..
                     ..  \\  ..                //  ..  ..
                      ..  \\  ..              //  ..  ..
                       ..  \\  ..            //  ..  ..
                        ..  \\  ..          //  ..  ..
                         ..  \\  ..        //  ..  ..
                          ..  \\  ..      //  ..  ..
                           ..  \\  ..    //  ..  ..
                            ..  \\  .   //  ..  ..
                             ..  \\ 5  //  ..  ..
                              ..  \\  //  ..  ..
                               ..  \\//  ..  ..
                                ..  \/  ..  ..
                                 .. 2  ..  ..
                                  ..  ..  ..
                                   ....  ..
                                    ..  ..
```
