---
layout: post
title: "Spacecraft"
description: "Minecraft in Space"
categories: [university, game]
tags: [game, cpp, minecraft, spacecraft]
group: project
img: img/spacecraft.png
---
{% include JB/setup %}

I'm very late as this project ended in June but better late than never!
Anyways, this project was done during the 2nd year speciality project. We were three: [Arthur Sonzogni](http://panigame.fr/), [Smea](http://smealum.net/) and myself.
The original idea was first introduced by Smea.

> Minecraft in Space.

From this point I won't talk about Minecraft, so you better google it if you don't know what it is.

##Motivation

Minecraft is cool. Exploring *infinite* worlds, destroying, creating thing, crafting, etc. But you are not on a planet, you cannot go around the world, you'll never reach your original location.
Imagine if you just could fly away from the planet and visit other planets or other solar systems!. That would be so cool!

However the duration was bout three weeks, so we didn't have enough time to implement everything. Therefore we focused on Level of Detail, procedural generation and saving world modifications.
Using some nifty shaders we accomplished nice looking effects. Mainly by using an atmospheric scattering shader and noise generated sun surfaces.

##Screenshots

![planet and sun](https://camo.githubusercontent.com/8168386eeef91113b638fa0e5397b9b73f456b55/687474703a2f2f692e696d6775722e636f6d2f693568354b36722e706e67)
![sunset](https://camo.githubusercontent.com/2e299b8136d1cf5ae66534c0dc88dd1c2f607e01/687474703a2f2f692e696d6775722e636f6d2f755936787731482e706e67)
![editing](https://camo.githubusercontent.com/03445e8ec20ccab961de4c0c187f67c068abf0c5/687474703a2f2f692e696d6775722e636f6d2f7171797059776a2e706e67)

##Results

We were very happy of the results.
Personally I learned a lot from this project even if I focused more on technical stuff than the engine related things, which is the more interesting and difficult part.

The code of the project is available on [Github](https://github.com/smealum/SPACECRAFT).
There are detailed instructions about how to build it for Linux, OS X and Windows.
Controls are really hard, reading them before even trying to move around is a must.
