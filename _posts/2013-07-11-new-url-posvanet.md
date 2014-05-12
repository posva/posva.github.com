---
layout: post
title: "New URL: posva.net"
description: ""
categories: [misc, blog]
tags: [misc, blog, url, namecheap]
---
{% include JB/setup %}

For some reason I wanted to have my own URL, it's nice to have [http://posva.github.io](http://posva.github.io) as URL but having a `.com`, `.net`, `.org` is even better!

I searched for some Domain sellers with nice prices and found this one: [Namecheap](http://namecheap.com). I found the prices to be good enough to be worth so I searched some coupons codes (Because I saw a Coupon Code option while I was purchasing) and got around 1$ reduction. It costed around 8€.

Then I needed to go through 2 easy steps of configuration:

- Add a `CNAME` file to my blog repo (the one I push to github, [this one](https://github.com/posva/posva.github.com) with my new URL, in this case `posva.net`. It must be added without the `http://` and you must be sure that your URL doesn't start by `www`, otherwhise the `www` must be added too:

{% highlight bash %}
echo "posva.net" > CNAME
git add CNAME
git commit -m "New URL for my Blog"
git push origin master
{% endhighlight %}

- Finally you must configure the URL to point to gihub servers. For [Namecheap](htpp://namecheap.com) I needed to go to URL Forwarding and then change the existing values as follows:

![p]({{BASE_PATH}}/img/posts/namecheap.png)

Always as `A` records (the type!).

Then it takes quite a bit for the changes to be effectives, so be patient, it took 20 minutes for me.

I hope this helps someone someday!

##A bit more

If you want to have something like `blog.posva.net` pointing to the blog you should add it in All Host Records section as a subdomain. Make it point to the same adress and you're done.

