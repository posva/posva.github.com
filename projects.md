---
layout: page
title: Projects 
group: navigation
dropdown: project
---
{% include JB/setup %}

<h2>All Pages</h2>
<ul>
{% assign pages_list = site.pages %}
{% assign group = 'project' %}
{% include JB/pages_list %}
</ul>
