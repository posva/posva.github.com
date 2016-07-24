---
layout: post
title: "Using Material Design Lite with Vue.js"
description: ""
categories: [js]
tags: [js]
---

When building an application I like to use a nice framework for the design.
Lately [Material
Design](https://www.google.com/design/spec/material-design/introduction.html)
has been getting some attention. Some implementation are being worked on and are
functional. One of these implementations is [Material Design
Lite](http://www.getmdl.io) which is library agnostic and can be used with any
data-reactive library/framework like Angular, Reactjs, Aurelia or, my preferred
one, [Vue.js](http://vuejs.org).

![vue]({{BASE_PATH}}/img/posts/vue-logo.png)

As MDL (Material Design Lite) is library/framework agnostic, you have to
manually call some functions on elements that are dynamically created. This is
clearly said on the [Getting Started](http://www.getmdl.io/started/index.html)
section of MDL. It is actually very simple as you only have to call the method
`componentHandler.upgradeElement` on an element to make it behave as any other
MDL component.

In Vue.js this is extremely easy to do by using a directive:

{% highlight js %}
Vue.directive('mdl', {
  bind: function() {
    componentHandler.upgradeElement(this.el);
  }
});
{% endhighlight %}

This directive will call the needed method at creation on any element using it.
In the case of a button, this will add the on click ripple effect.

But what about more complex components, like the progressbar?

![progress]({{BASE_PATH}}/img/posts/vue-mdl-progress.png)

It has a variable
value that must be changed with a special method
`element.MaterialProgress.setProgress`. It would be nice to have some markup
like this:

{% highlight html %}
<div v-progress="progressVariable" class="mdl-progress mdl-js-progress"></div>
{% endhighlight %}

If the `progressVariable` value changes, the progressbar should change
accordingly. Well, another incredibly simple directive solves this as well:

{% highlight js %}
Vue.directive('mdl-progress', function(val) {
  // The directive may be called before the element have been upgraded
  if (!this.el.MaterialProgress)
    componentHandler.upgradeElement(this.el);
  this.el.MaterialProgress.setProgress(val);
});
{% endhighlight %}

Easy peasy!
