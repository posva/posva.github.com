---
layout: post
title: "Moving cursor in console"
description: "More control over your terminal!"
category: "shell"
tags: [move, cursor, terminal, shell, misc, fun]
---
{% include JB/setup %}

## Cursor
While printing text for your tests or any other thing you sometimes want to make better output to make your tests look more elegant or whatever reason.

Using colors makes them quite cool but if you want to take it to the next level you can move cursor and rewrite over your text to make it look as an update.

## How to do it
This is more like a note to myself because I'll be using it shortly for my `sh2d` project that you can find [here](https://github.com/posva/sh2d) and for which I'll write a post later.

Meaning of symbols:

* `<L>` Line
* `<C>` Column
* `<N>` a number

Here they are:

* Position the cursor: `\033[<L>;<C>H` or `\033[<L>;<C>f`. If you don't change the cursor position again the shell prompt may erase other things you wrote earlier
* Clear the screen and move to current position:  `\033[2J`. This one is odd, test by yourself, you'll understand...
* Move the cursor up: `\033[<N>A`. It never erase before the first visible line
* Move the cursor down: `\033[<N>B`. It never scroll down more than the number of visible lines
* Move the cursor forward: `\033[<N>C`. It never goes over to the next line
* Move the cursor backward: `\033[<N>D`. It never goes back to the previous line
* Save the cursor position: `\033[s`
* Restore the cursor position: `\033[u`

This is not an exhaustive list but it covers the main codes and it's enough to work with.

## Reference
To find more characters sequence you can check them here: [ANSI escape code](http://en.wikipedia.org/wiki/ANSI_escape_code#CSI). Again it's not a complete list ^^
