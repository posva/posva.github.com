---
layout: compress
---

<!DOCTYPE html>
<html>
{% include head.html %}
<body id="posts" class="inner-post-page">

    <div class="block-left full-width">
      <div class="content">
        <a href="{{ site.baseurl }}/" class="logo"><img src="{{ site.baseurl }}/images/{{ site.logo }}"></a>
        <div class="post-title-section">
          <div class="section-line">Posts <em>/</em></div>
          <h1 class="section-title">{{ page.title | markdownify | remove: "<p>" | remove: "</p>" }}</h1>
          <ul class="tags">
            {% for tag in page.tags %}
              <li><a href="{{ site.baseurl }}/tags#{{ tag }}">{{ tag }}</a></li>
              {% unless forloop.last %}
              {% endunless %}
            {% endfor %}
          </ul>
          <div class="section-line reverse"><a href="{{ site.baseurl }}/posts">Back to posts</a> <em>/</em></div>
        </div>
      </div>
      <canvas></canvas>
    </div>
    {% include scripts.html %}
    {% include overlay.html %}
</body>
</html>