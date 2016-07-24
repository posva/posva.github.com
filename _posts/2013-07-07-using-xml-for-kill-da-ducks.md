---
layout: post
title: "Using xml for Kill da Ducks"
description: "Animations are now easier to write!"
categories: [games, kdd, cpp]
tags: [game, kdd, kill, da, ducks, cpp]
---

##Kill da Ducks
Today I had some fun adding a new way of reading animations for the engine of my game Kill da Ducks.

Before I used `ini` files which were enough but I just wanted more flexible config files so I switched to `xml` files.

I went from this:

####INI file
{% highlight ini %}
[bak1.png]
h = 64
w = 64
x = 0
y = 0

[s_block_strip4_0.png]
h = 8
w = 8
x = 64
y = 0

[s_block_strip4_1.png]
h = 8
w = 8
x = 0
y = 64

[s_block_strip4_2.png]
h = 8
w = 8
x = 72
y = 0

[s_block_strip4_3.png]
h = 8
w = 8
x = 64
y = 8

[s_box]
h = 8
w = 8
x = 8
y = 64

[s_box_trunk.png]
h = 4
w = 4
x = 0
y = 72
{% endhighlight %}

To this:

####XML file
{% highlight xml %}
<animations texture="pack_test.png" key="mini">
    <sprite name="bak1" originx="32.000000" originy="32.000000">
        <frame left="0.000000" top="0.000000" width="64" height="64"/>
    </sprite>
    <sprite name="s_block" originx="4.000000" originy="4.000000">
        <frame left="64.000000" top="0.000000" width="8" height="8"/>
        <frame left="0.000000" top="64.000000" width="8" height="8"/>
        <frame left="72.000000" top="0.000000" width="8" height="8"/>
        <frame left="64.000000" top="8.000000" width="8" height="8"/>
    </sprite>
    <sprite name="s_box" originx="4.000000" originy="4.000000">
        <frame left="8.000000" top="64.000000" width="8" height="8"/>
    </sprite>
    <sprite name="s_box_trunk" originx="2.000000" originy="2.000000">
        <frame left="64.000000" top="40.000000" width="4" height="4"/>
    </sprite>
</animations>
{% endhighlight %}

## New features

Which is absolutely better :D. I also added new functionnalities:

* Texture file inside the `xml` file
* Pack name inside the `xml` file
* Non animated/Animated sprites in the same format
* Different origins for each frame with a default origind defined inside `<sprite>`
* The same for the frames intervals

At the same time I updated my `txpack` in order to generate a nice `xml` from a directory!

