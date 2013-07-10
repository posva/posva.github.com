---
layout: page
title: MangaDown
tagline: Download manga faster than ever!
group: project
img: img/mangadown.png
comments: true
---
{% include JB/setup %}

This is almost a copy paste from [here](http://posva.net/MangaDown/).

##General Information

MangaDown allows you to fastly download chapters from a manga. Its purpose is to support a large amount of websites using a parsing file for each. I already created 3 but you can create more if you want, I will add them to the repo and credit you if you send me the parser!.
MangaDown is cross platform and depends on SFML2.
I don't provide Linux binaries yet, but you can compile it by yourself.

##Help

Here you can find some help about how to use MangaDown. Remember that using it under Windows or under a UNIX OS makes the command `./bin/MangaDown` change to `bin\MangaDown.exe`. If you installed MangaDown using the pkg you can also do `MangaDown`. Remember you need to have the folder parsers with the parsers file inside of it in the working directory.

{% highlight csh %}
$ make
$ ./bin/MangaDown http://www.mangareader.net/93/naruto.html 120 140
{% endhighlight %}

##Download

Download the lastest version here. Last Update: 05/08/2012 12:40 GMT +01

* [Windows](https://dl.dropbox.com/u/13279485/MangaDownWin.zip)
* [OS X](https://dl.dropbox.com/u/13279485/MangaDownOSX.zip)

##Parsers

Currently supported parsers are:

* MangaReader
* Manga Fox
* MangaHere

To create a parser there is a [tutorial](http://youtu.be/uh1_CEIJhu0) you can watch.

##Support or Contact

If you need any further support feel free to contact me at GitHut [@posva](http://github.com/posva) or by mail at [posva13@gmail.com](mailto:posva13@gmail.com).

