---
layout: post
title: "Elapsed time in shell scripting"
description: "Making your script look better"
categories: [shell, scripting]
tags: [shell, elapsed, time, zsh, sh, bash]
---
{% include JB/setup %}

Today I was looking at some building tools and they often print the time they take to do something. I wanted to add this feature to the [configure-script]({{site.url}}/shell/c/cpp/2013/08/18/configure-script/).

It turns out to be very easy, just using the `date` command bring us the elapsed time.
There's just a little detail, BSD `date` behaves a bit differently from GNU `date`.
More precisely BSD doesn't have the `%N` format for nanoseconds. We just need to check if the system uses a BSD `date` or a GNU one

{% highlight csh %}
#! /bin/bash
# Save the current time
if man date | grep BSD >/dev/null 2>/dev/null; then
  IS_BSD="YES"
fi
if [ "${IS_BSD}" ]; then
  LOG_START=`date +%s`
else
  LOG_START=`date +%s%N`
fi

# Do stuff
...

# Get the time and make the difference
if [ "${IS_BSD}" ]; then
  LOG_END=`date +%s`
  ELAPSED=$(( $LOG_END - $LOG_START ))
else
  LOG_END=`date +%s%N`
  ELAPSED=`echo "scale=8; ($LOG_END - $LOG_START) / 1000000000" | bc`
fi

{% endhighlight %}

This is more like a note to myself but it may be usefull for someone one day :)
