---
layout: page
title: Welcome!
tagline: This is my little world
---
{% include JB/setup %}

# Hey!
Hi, I'm Ed (aka Posva) and this is my little dev blog where I post things I experiment with and the advancement on my projects.
Feel free to send me an email if you want to tell me something at posva13@gmail.com
You can find more information about myself [here]({{ BASE_PATH }}/about.html).

# Posts List
<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>


