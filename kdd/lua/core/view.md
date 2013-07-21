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

</br>
----
</br>

###setSize(w, h)
Change the size of the view smoothly.
- width: new width of the view
- height: new height of the view
{% highlight lua %}
View:setSize(width, height);
{% endhighlight %}
----

###setCenter(x, y)
Change the position of the view. The (x, y) represent the new center. The transition is done smoothly.
- x: new x center
- y: new y center
{% highlight lua %}
View:setCenter(x, y);
{% endhighlight %}

#WIP
