---
layout: post
title: "Random theme   Vim"
description: "Stop using only Monokai"
category: "vim"
tags: [vim, themes, tricks]
---

#Motivation

Do you really need one? IMO I get tired of using the same theme every time.
The solution is simple, just take the themes you love, put theme on an array and choose
randomly one at startup.

#Code

The code is pretty simple. You create an array and then choose one randomly using the localtime.

{% highlight vim %}
  let themes = ['monokai', 'mustang', 'vitamins', '256-grayvim', '256-jungle', 'peaksea', 'xoria256', 'ir_black']

  execute 'colorscheme '.themes[localtime() % len(themes)]
  unlet themes
{% endhighlight %}

Have fun!
