---
layout: post
title: "Optimizing static webpages with gulp"
description: "usemin + imagemin + uncss"
categories: [web, gulp]
tags: [web, gulp, watch, usemin, uncss, imagemin, optimization, connect, server]
---
{% include JB/setup %}

Recently I decided to create my own online portfolio/CV. Having a Github profile
with all of your projects is nice but seems quite slow to inspect in my opinion.
I therefore want to show off myself with a simple and light webpage. This
doesn't only relate to the design, which I'm not very good with by the way, but
also in the resources you use: images, scripts (JavaScript), style sheets (CSS)
and HTML pages.

# Grunt or Gulp

![gulp-grunt]({{BASE_PATH}}/img/posts/gulp-grunt.jpg)

I'm not going to discuss about which one is better but I already used
[`Grunt`](http://gruntjs.com/) in
[dominion](https://github.com/posva/dominion) and it works pretty well. I find
it to be sometimes slow but my computer that may be my computer's fault too.
[`Gulp`](http://gulpjs.com/) is all about piping files into plugins and it runs
faster (at least in my case). It's a _streaming build system_. Finally I could
also use [Brunch](http://brunch.io/) but that won't be this time.

Gulp configuration file `gulpfile.js` is actually easier than a `Gruntfile.js`.
It starts as any node module:

{% highlight js %}
var gulp = require('gulp');
{% endhighlight %}

And then you add modules and tasks:

{% highlight js %}
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var from = {
  js: 'src/js/*.js'
};

gulp.task('jshint', function() {
  gulp.src(from.js)
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});
{% endhighlight %}

This is just an example to lint the `js` code using a better reporter. You will
have to install these modules with `npm install`.

#Directory structure

{% highlight text %}
.
├── README.md
├── fonts
│   └── fontawesome and stuff
├── gulpfile.js
├── images
│   ├── 404.png
│   ├── favicon.png
│   └── plogo.png
├── lib
│   └── js libs and stuff
├── css
│   └── css from libs and stuff
├── package.json
└── src
    ├── css
    │   ├── demo.css
    │   ├── tabs.css
    │   └── custom.css
    ├── index.html
    └── js
        └── app.js
{% endhighlight %}

* `lib` dir contains `js` lib but you could also use `bower` to install them.
* `css` dir contains `css` from lib/frameworks but you could, again, use `bower`.
* `src` contain all the files that we are writing ourselves

# Image optimization

When creating some webpages, the size of the resources is always what takes
longer to load. Therefore optimizing images is always a good idea. We will be
using `gulp-imagemin`. In addition to that we will also be using `gulp-changed` to only
pipe images that were modified and therefore diminishing deploy time.

{% highlight js %}
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');

var from = {
  img: 'images/**/*.@(png|jpg|gif)',
  js: 'src/js/*.js'
};
var to = {
  img: 'images/'
};

gulp.task('imagemin', function() {
  return gulp.src(from.img)
  .pipe(changed(to.img))
  .pipe(imagemin())
  .pipe(gulp.dest(to.img));
});
{% endhighlight %}

We are chaging the images in place because we don't need to save the same image
twice if we are only going to use one of them. `imagemin` can also optimize
`svg` files and support some options that should be taken into account depending
of the kind of pictures you'll be using on your site. You can check the
[readme](https://github.com/kevva/imagemin)
for more help.

# `gulp-usemin`

Now, we are going to minimize the `js`, the `css` and the `html` files all
together by using the gulp plugin `usemin`. This is really useful because it
will rename the tags used on your dev page as well, meaning that we won't need
to manually create an `html` page that includes your minified `css` and `js`
files. Unfortunately we need to add some lines to help it:

{% highlight html %}
<!-- build:css style.css -->
  <link rel="stylesheet" type="text/css" href="css/tabs.css" />
  <link rel="stylesheet" type="text/css" href="../css/normalize.css">
  <link rel="stylesheet" type="text/css" href="../css/skeleton.css">
  <link rel="stylesheet" type="text/css" href="css/custom.css"/>
  <link rel="stylesheet" type="text/css" href="../css/font-awesome.min.css"/>
<!-- endbuild -->
{% endhighlight %}

It's very similar for the `js`:

{% highlight html %}
<!-- build:js script.js -->
  <script src="../lib/modernizr.custom.js"></script>
  <script src="../lib/director.min.js"></script>
  <script src="../lib/cbpFWTabs.js"></script>
  <script src="js/app.js"></script>
<!-- endbuild -->
{% endhighlight %}

Our `ìndex.html` being located under `src` we need to reference the folders
properly. One downside about usemin is that it rips off any comment including
those targeting IE:

{% highlight js %}
<!--[if lt IE 9]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
{% endhighlight %}

I might fix this myself in a pull-request. `minifyHTML` should not be ripping
off these kind of comments because they're not comments!

Once our `html` is fine, we should add the corresponding `js` to the
`gulpfile.js`:

{% highlight js %}
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');

var from = {
  img: 'images/**/*.@(png|jpg|gif)',
  css: 'src/css/*.css',
  html: 'src/*.html',
  js: 'src/js/*.js'
};
var to = {
  img: 'images/',
  css: './',
  html: './',
};

gulp.task('usemin', function () {
  return gulp.src(from.html)
  .pipe(usemin({
    css: [minifyCSS(), 'concat'],
    html: [minifyHTML({empty: true})],
    js: [uglify(), 'concat']
  }))
  .pipe(gulp.dest('./'));
});

{% endhighlight %}

As you may have noticed we are creating the files at `.`, this is because having
a `gh-pages` branch allows to Github to directly serve that `index.html` without
further configuration.

Now we can do `gulp imagemin`, `gulp usemin` and we will be generating our site.
But you can do better right. Gulp does have a built-in `watch` method. However
we will not be using it because it doesn't detect new or deleted files. We are
therefore using `gulp-watch` plugin instead.

{% highlight js %}
var watch = require('gulp-watch');

gulp.task('watch', ['default'], function() {
  watch(from.img, function() {
    gulp.start('imagemin');
  });
  watch([from.js, from.html, from.css], function() {
    gulp.start('usemin');
  });
});

gulp.task('default', ['jshint', 'imagemin', 'usemin']);
{% endhighlight %}

Please note that `gulp.start` will be removed in later versions. We could just
copy the task code inside that function instead.
It's important to add `default` as a dependency so the generation will be
executed at least once. Otherwise it will just wait for changes before
generating anything.

# Optimizing even more

If we run audits on the page with Chrome or Firefox, you may notice that most of
the `css` is unused. What a shame! Fortunately we can fix this! We can rip off
the unused `css` rules with `gulp-uncss` plugin. It also takes the `html` to
detect what is not used. If some rules are not present in the `index.html` we
must add an `ignore` array to the `uncss` call. This is documented on the Github
page for `gulp-uncss`.

What we are going to do is simply strip off anything unused from the final
`style.css` file instead of doing it with each file because it's way faster. We
are going to create a task named `style` depending on `usemin` so that the
initial `style.css` file exists and we can modify it. We also need to update the
default task to depend on `style` instead of `usemin` and, a new
`watch(from.css,...)` and remove that `from.css` from the last `watch(...)`:

{% highlight js %}
var uncss = require('gulp-uncss');

gulp.task('style', ['usemin'], function() {
  return gulp.src(to.css + 'style.css')
  .pipe(uncss({
    html: [to.html + 'index.html']
  }))
  .pipe(gulp.dest(to.css));
});

gulp.task('watch', ['default'], function() {
  watch(from.img, function() {
    gulp.start('imagemin');
  });
  watch(from.css, function() {
    gulp.start('style');
  });
  watch([from.js, from.html], function() {
    gulp.start('usemin');
  });
});

gulp.task('default', ['jshint', 'imagemin', 'style']);
{% endhighlight %}

Finally I like to serve at the same time so I can launch `gulp watch` and then just
keep working. This is very easy, we just need to add the `gulp-connect` plugin,
create a task for it and add it as a dependency to the `watch` task:

{% highlight js %}
var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server();
});

gulp.task('watch', ['default', 'connect'], function() {
{% endhighlight %}

And voilà, happy coding.

The whole code source is available at
[Github](git@github.com:posva/portfolio.git). Thought it may change in
the future.

