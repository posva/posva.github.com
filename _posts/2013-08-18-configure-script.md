---
layout: post
title: "Configure Script"
description: "A simple script to generate Makefile for your C/C++ projects"
categories: [shell, c, cpp]
tags: [Makefile, gnu, configure, dev, tools, c, cpp, generate]
group: project
img: img/terminal-icon.png
comments: true
---
{% include JB/setup %}


##Configure script
-----------

This script generate a Makefile with the right dependencies for each file that need to be compiled. It also checks for any dos file and convert it to unix if the option -a is used.
![pic](http://i.imgur.com/Futju0p.png)

##Help
------------

Here is the help, you can get it aswell by passing the -h option

usage:

{% highlight csh %}
./configure.sh [-hfDa] [-s src-dir] [-o obj-dir] [-b bin-dir]
               [-c compiler] [-O "compiler options"] [-L link-dirs]
               [-l lib] [-I include-dir] [-M Makefile-name]
               [-e file-extension] [-E executable-name]
{% endhighlight %}

  -h    Show this help.

  -D    Supress the default options for -L,-I and -O

  -a    Automatic conversion of file in dos format to unix format. This option uses d

  -C    No colors.

  -f    Forces the creation of the Makefile when it already exists without doing any verification.

Running without arguments is equivalent to this:
{% highlight csh %}
./configure.sh -D -s src -o obj -b bin -c "xcrun clang++"
               -O "-Wall -Wextra -O2 -std=c++11 -stdlib=libc++"
               -Isrc -L/usr/local/lib -e cpp -E main -M Makefile
{% endhighlight %}

##Source Code
Get the source code [here](https://github.com/posva/configure-script)

