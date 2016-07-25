---
layout: post
title: "configure.py"
description: "Fast, simple, efficient script in python3 to generate Makefiles"
categories: [python3, c, cpp]
tags: [Makefile, gnu, configure, dev, tools, c, cpp, generate, python, python3]
group: project
img: images/configure.py.png
---

## configure.py
---

I already did a `bash` version that is posted [here](http://posva.net/shell/c/cpp/2013/08/18/configure-script/). Although I was not very happy of the performance. The script was slow, **very** slow. 14 seconds were needed to generate a makefile for my project [Kill da Duck](http://posva.net/kdd/index.html). With this python version only  0.5 seconds are needed.

![img](http://i.imgur.com/Z6Lmt6V.png)

## How does it work
----

The behaviour is quite the same, I just added memoization to make it faster

1. Parse options
2. Find directory tree inside the `src-dir`
3. Fin files inside `src-dir`
4. Generate standalone rules
5. For each file find its dependencies and create a rule

Python actually made the coding very easy, I don't know it very well yet but still, it really makes a difference. Even more if we compare it to `bash`.

The use of *dictionaries*, *lists* and *sets* that are built-in types made the dev easy and fast.

## Performance

At the beginning I was very impressed by the performance as I was used to my *old*, **slow** version in `bash`. I didn't tested too much because I don't really need it as I must be the only one using this script but if someone report an issue I'll fix it *asap*.

## Source Code

Get the source code [here](https://github.com/posva/configure.py)
