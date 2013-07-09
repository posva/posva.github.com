---
layout: page
title: View module
group: doc-kdd
---
{% include JB/setup %}
##View
Here you'll find functions to change how the view behaves:
{% highlight lua linenos %}
View:setSize(160, 100)
View:setRotation(15)
View:setCenter(Body:get("ball"):getPosition())
{% endhighlight %}

###setSize(w, h)
Change the size of the view smoothly.
{% highlight lua %}
View:setSize(width, height);
{% endhighlight %}

#WIP
