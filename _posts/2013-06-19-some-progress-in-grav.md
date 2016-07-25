---
layout: post
title: "Some progress in Grav"
description: ""
categories: [grav, cpp, games]
tags: [grav, games, cpp, vvvvvv, gravitron]
date: 2011-10-21
---

Hi! I have been coding a bit the game, but not very much because of the exams, in fact I still have two next week, but these one are about compuer science.
Anyway, what I have been working on is the timer, the sequences, the play... everything to be more precise.
You can now play a classic game, that looks a lot to super gravitron with the same sequences but with a better and more intuitive movement control, you'll see veyr soon what I'm talking about ;) Your stats are now saved automatically to the server, you only have to create an account an the beggining with an ptional password (not implemented yet in the game but already done for the database).

By stats I mean the time you have been playing, the deaths, the best time, registration date...

I may add more stats later, I accepts any suggestions :) The connections are called in threads, so they doesn't interfer with the gameplay.

![pic]({{site.baseurl}}/images/posts/grav/pic005.png)
