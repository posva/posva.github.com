---
layout: post
title: "Improoving catimg"
description: "Displaying pictures 10x faster!"
categories: [shell, retro, bash]
tags: [zsh, fun, color, bash, cat, img, catimg]
img: img/posts/catimg1.png
date: 2013-12-09
---

## Old catimg
The old version of `catimg` was slow, **VERY** slow.

Displaying sprites and tiny pictures was very cool as it was quite fast but larger images took _years_ to render and I was so sad about that :(

## Searching for catimg

By _googling_ `catimg` I found this nifty [gist](https://gist.github.com/livibetter/5954298 "Click Me"). It was quite funny because the script was published some days after mine but it was way faster (_Even more if we take into account the very first version with `grep` uugh_). The point is that some lines of code made me see that I was a fool using such slow techniques to convert colors...

I'm refering to this lines
{% highlight bash %}
((
  I++,
  IDX = 16
      + R * 5 / 255 * 36
      + G * 5 / 255 * 6
      + B * 5 / 255
))
    echo -ne "\x1b[48;5;${IDX}m  \x1b[0m"
{% endhighlight %}

Well first of all the `(( x = a + b, y = 3 ))` was new to me and I found it very nice (much better than using `expr` all the time), but I realized that the color could be calculated. I didn't see that colors code were used in a particular order and that I could exploit that, _shame on me..._

Then I realized that the script didn't converted grayscale colors so I added it:
{% highlight bash %}
if [ ! "$R" = "NO" ]; then
    if [ "$R" -eq "$G" -a "$G" -eq "$B" ]; then
      ((
      I++,
      IDX = 232 + R * 23 / 255
      ))
    else
      ((
      I++,
      IDX = 16
      + R * 5 / 255 * 36
      + G * 5 / 255 * 6
      + B * 5 / 255
      ))
    fi
    #echo "$R,$G,$B: $IDX"
    echo -ne "\e[48;5;${IDX}m${CHAR}"
{% endhighlight %}

I also check for transparent colors and that's why there is a `"$R" = "NO"` but that's not the point. Just by doing that the script speed **TRIPLED**.

After this I looked at another line:

{% highlight bash %}
convert "$SRC" -crop 1x1+$W txt:- 2>/dev/null |
  sed -e '1d;s/^.*(\(.*\)[,)].*$/\1/g;y/,/ /' |
  while read R G B _; do
{% endhighlight %}

Instead of saving the conversion to a new file just output it to teh stdout and parse it live. I used my own command line with my regexp and replaced the `_` with `f` because it gave some troubles and voila:

{% highlight bash %}
convert "$IMG" -resize $COLS\> +dither `echo $REMAP` txt:- |
sed -e 's/.*none.*/NO NO NO/g' -e '1d;s/^.*(\(.*\)[,)].*$/\1/g;y/,/ /' |
while read R G B f; do
{% endhighlight %}

## catimg at its best
And there it is a super fast catimg script \*0\*. There is also somethign better about my script: I use the `remap` option which gives MUCH better results.

The current version is very fast so I proposed it as a plugin for [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh). You can check the [pull request here](https://github.com/robbyrussell/oh-my-zsh/pull/2331)

If you find any improovement to the script, please, send me a message!

## Github Repo

You can find the [Github repo here](https://github.com/posva/catimg).

