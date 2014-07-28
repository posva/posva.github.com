---
layout: post
title: "Making your server public"
description: "and hosting it by yourself"
categories: [misc, server, web, rpi, pi, node]
tags: [nodejs, web, rpi]
---
{% include JB/setup %}

## The server

When you run a local server with `PHP`, `python`, `Java` or `node`, you can access it from any other computer in the same network by just typing the address of the computer inside the local network followed by `:port`. Usually `localhost:8080`, `localhost:3000` or `localhost:8000` when working on the same computer that is serving.

## The application

Once your web application is ready to be used you need to deploy it. With `PHP` and `Java` you can use many free servers that are available online and that will surely fit all of your needs, but when developing a node application the choices are quite limited yet. On top of that if your application won't borrow too much bandwidth or you just need it to run for some time and then turn it off, you can deploy it yourself either in your personal computer or in raspberry pi or beagle bone.

In order to deploy yourself in your own computer you will obviously need to install the server application and launch the server. The problem is that your computer is mostly invisible to the global network (no global ip) or that the IP may change. Here I am going to explain an easy solution I found to make your little application available globally. You can also use a service like [no-ip](http://www.noip.com) or [DynDNS](http://dyn.com)

## Deploying it

You need two things:

* static ip
* redirection
  * port redirection
  * requests redirection

The first thing is done by changing the DHCP setting where you can assign a static IP to a mac address. This way everytime the computer is connected to the router the router gives this computer the same IP. This is needed by the redirection.

Then you need to activate the demilitarized zone (DMZ) and use the static IP you gave to your computer. Finnally web request are sent to the port `80` but your server is serving on another port. You have to redirect the request to the correct port. This is achieved by using the NAT/PAT rule system and adding one rule to redirect the TCP request at port `80` to the port you are serving:

 {% highlight text %}
+-----------------+----------+-------------+-----------------+-----------------+
|Name of the rule | Protocol | Source Port | Device IP       | Destination Port|
+-----------------+----------+-------------+-----------------+-----------------+
|Webserver        | TCP      | 80          | rpi 192.168.1.5 | 3000            |
+-----------------+----------+-------------+-----------------+-----------------+
 {% endhighlight %}

Now you can retrieve the global address of your computer, which is actually the router's one by going to any website like [http://www.whatismyip.com/](http://www.whatismyip.com/) and then give it to anyone who needs to access the app.

## Address
But this is... annoying, right? Well if you buy a domain you just need to add an `A` record pointing to this address. You can do it with a subdomain as well.

Now you have some nice (app.domain.com)[app.domain.com] address to yourself hosted server :D
