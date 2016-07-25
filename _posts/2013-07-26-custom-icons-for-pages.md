---
layout: post
title: "Custom icons for pages"
description: "Icons are good for you!"
categories: [blog, jekyll]
tags: [blog, help, jekyll]
---

## Icons are beautiful
I personnay like when things show off a bit. Icons are this kind of things that are simple yet beautiful.
This is way I wanted to add icons in front in the pages title, to make them more visible and catchy.

![lol]({{site.baseurl}}/images/posts/page-icon1.png)

This one is just for demostration.
As you can check there is also a dropdown menu which change depending on which page you're:

![drop-down]({{site.baseurl}}/images/posts/page-dropdown1.png)
![drop-down]({{site.baseurl}}/images/posts/page-dropdown2.png)

## Jekyll is awesome
The best of this icons is that they're generated dinamically, there's no hardcoding, all thanks to Jekyll.

For example, when I write a page and I want to add it an icon I just have to say where the icon is in the `yml` header

{% highlight text %}
---
layout: nil
title : RSS Feed
img: images/rss.png
rss: true
---
{% endhighlight %}

The tag `img` specify the relative path to the icon.

I also added an easy way to make a page visible in the dropdown menu

{% highlight text %}
---
layout: page
title: Grav
tagline: A VVVVVV Gravitron clone
group: project
img: images/grav.png
comments: true
---
{% endhighlight %}

Here the `group` allow me to do the work. There's also an icon as the variable `img` is set.

## The Code
Now let's see the code to get this working.
I first changed the way the pages are listes. So I edited the file `_includes/JB/pages_list`:

{% highlight html %}
<% if site.JB.pages_list.provider == "custom" %>
  <% include custom/pages_list %>
<% else %>
  <% for node in pages_list %>
    <% if node.title != null and node.group != "hide" %>
      <% if group == null or group == node.group %>
      	<% if page.url == node.url %>
          <li class="active"><a href="{{ site.baseurl }}{{node.url}}" class="active">
          <% if page.img != null %>
            <img src="{{site.baseurl}}/{{page.img}}" class="simple" width="24" height="24"/> 
          <% endif %>
          {{node.title}}</a></li>
        <% elsif node.dropdown != null and node.dropdown == page.group %>
          <li class="active dropdown">
          <a href="#" class="dropdown-toggle active" data-toggle="dropdown">
          <% if page.img != null %>
            <img src="{{site.baseurl}}/{{page.img}}" class="simple" width="24" height="24"/> 
          <% endif %>
          {{page.title}}<b class="caret"></b></a>
          <% assign drop_group = node.dropdown %>
          <% include JB/pages_dropdown %>
          </li>
        <% elsif node.dropdown != null%>
          <li class="dropdown">
          <a href="{{node.url}}" class="dropdown-toggle" data-toggle="dropdown">
          <% if node.img != null %>
            <img src="{{site.baseurl}}/{{node.img}}" class="simple" width="16" height="16"/> 
          <% endif %>
          {{node.title}}<b class="caret"></b></a>
          <% assign drop_group = node.dropdown %>
          <% include JB/pages_dropdown %>
          </li>
        <% else %>
          <li><a href="{{ site.baseurl }}{{node.url}}">
          <% if node.img != null %>
            <img src="{{site.baseurl}}/{{node.img}}" class="simple" width="24" height="24"/> 
          <% endif %>
          {{node.title}}</a></li>
      	<% endif %>
      <% endif %>
    <% endif %>
  <% endfor %>
<% endif %>

<% assign pages_list = nil %>
<% assign group = nil %>
{% endhighlight %}

I obviously changed the `{` and the `{` into `<` and `>` because otherwise it will be interpreted (there is a way to do it rigth but I was quite lazy, you can find it [here](http://alexpearce.me/2012/04/escaping-liquid-tags-in-jekyll/)).

The magic itself is done by the:
{% highlight html %}
  <li class="active"><a href="{{ site.baseurl }}{{node.url}}" class="active">
  <% if page.img != null %>
    <img src="{{site.baseurl}}/{{page.img}}" class="simple" width="24" height="24"/> 
  <% endif %>
  {{node.title}}</a></li>
{% endhighlight %}

This piece of code is repeated many times. There's also another include: `JB/pages_dropdown`
Here is a fast view of the code:

{% highlight html %}
<ul class="dropdown-menu">
<% for node in pages_list %>
<% if node.group == drop_group %>
  <li><a href="{{ site.baseurl }}{{node.url}}">
    <% if node.img != null %>
      <img src="{{site.url}}/{{node.img}}" class="simple" width="24" height="24"/> 
    <% endif %>
     {{node.title}}</a></li>
  <% endif %>
<% endfor %>
</ul>

<% assign pages_list = nil %>
<% assign drop_group = nil %>
{% endhighlight %}

Finnaly I have a page named `projects.md`
{% highlight html %}
---
layout: page
title: Projects 
group: navigation
dropdown: project
---

<h2>All Pages</h2>
<ul>
<% assign pages_list = site.pages %}
<% assign group = 'project' %}
<% include JB/pages_list %}
</ul>
{% endhighlight %}

As you can see I use some variables, such as group and dropdown to make the magic. Then I just use Twitter Bootstrap to display a dropdown. In my own case I needed to change the css to make the colors fit my theme.

