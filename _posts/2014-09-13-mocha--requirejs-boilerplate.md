---
layout: post
title: "Mocha + RequireJS boilerplate"
description: ""
categories: [web, js, nodejs, tests]
tags: [node, nodejs, web, js, testing, mocha, require, requirejs]
---
{% include JB/setup %}

Yesterday I had a bit of a bad time trying to code some tests for a web application (written in `js`).
The main problem was that using `requirejs` needed some further configuration within tests. It didn't take too long to find what I was doing wrong but it may be confusing at the beginning.
During this post I'll be talking about:

* [Mocha](http://visionmedia.github.io/) for tests
* [should](https://github.com/shouldjs/should.js) for BDD style assertions
* [RequireJS](http://requirejs.org/) for JS modularity
* [selfish](https://github.com/Gozala/selfish) for prototypal inheritance

In order to run tasks you need to install `grunt` with `npm install -g grunt-cli`.

#Context

In order to learn some modular JavaScript and how `nodejs` works, I decided to code a card game called Dominion.
There are already multiple web versions of this game, there is even an official one. Yet this is a good way of practicing modularity, testing and server/client behaviour with `nodejs`.

Let's show how the work tree is organized:

{% highlight text %}
$ tree
.
├── Gruntfile.js
├── index.html
├── main.js
├── package.json
├── js
│   ├── app.js
│   └── card.js
└── test
    └── cards.js
{% endhighlight %}

Let's look at the `package.json` file as it includes all the dependencies needed:

{% highlight json %}
{
  "name": "TODO",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "test": "./node_modules/.bin/mocha"
  },
  "dependencies": {
    "domready": "^1.0.7",
    "requirejs": "^2.1.15",
    "selfish": "^0.3.2"
  },
  "devDependencies": {
    "grunt": "~0.4.5",
    "grunt-contrib-jshint": "~0.10.0",
    "grunt-contrib-requirejs": "~0.4.4",
    "grunt-http-server": "0.0.5",
    "grunt-mocha-test": "~0.11.0",
    "requirejs": "^2.1.15",
    "rjs-build-analysis": "0.0.3",
    "should": "~4.0.4"
  }
}

{% endhighlight %}

The `Gruntfile.js` file has been simplified to match the testing part:

{% highlight js %}
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mochaTest: {
        test: {
            options: {
                reporter: 'spec'
            },
            src: ['test/**/*.js']
        }
    },
  });

  grunt.loadNpmTasks('grunt-mocha-test');

  // Default task(s).
  grunt.registerTask('test', ['mochaTest']);

};
{% endhighlight %}

We are using `requirejs` to load modules. Therefore we can share some the configuration with a file: `require-config.js`

{% highlight js %}
requirejs.config({
    baseUrl: 'js',
    nodeRequire: require,
    paths: {
        ready: '../node_modules/domready/ready.min',
        selfish: '../node_modules/selfish/selfish',
    },
});
{% endhighlight %}

In this project I load this file only once, in the `main.js`. However when having more complex configuration you should load it every time you need it.

We first start by using `requirejs` and `selfish` to create some classes that will be used in the application:

{% highlight js %}
define(["selfish"], function(selfish) {
    var Base = selfish.Base;
    var Card = Base.extend({
        initialize: function(cost) {
            this.cost = cost || 0;
            this.img = "";
            this.text = "Empty text";
            this.type = [];
        },
    });

    return Card;
});
{% endhighlight %}

We can ignore `src/app.js` and `main.js` as they are used for the `requirejs` entry point and have nothing to deal with testing.

Here comes the important part which is accessing modules from the test and being able to use them.
First let's take a look at the test file:

{% highlight js %}
var requirejs = require("requirejs");
var assert = require("assert");
var should = require("should");
requirejs.config({
    baseUrl: 'js',
    nodeRequire: require
});

describe('Card Testing', function() {
    // Load modules with requirejs before tests
    var Card, Victory;
    before(function(done) {
        requirejs(['card'], function(card) {
            Card = card;
            done(); // We can launch the tests!
        });
    });

    describe('#instanciation', function(){
        it('should work without problems', function(){
            Card.should.have.property('new');
            var c1 = Card.new(1);
            var c2 = Card.new();
            c1.should.have.property('img', "");
            c1.should.have.property('cost', 1);
            c2.should.have.property('img', "");
            c2.should.have.property('cost', 0);
        });
    });
});
{% endhighlight %}

First we require the different modules needed by `node`

{% highlight js %}
var requirejs = require("requirejs");
var assert = require("assert");
var should = require("should");
    requirejs.config({
    baseUrl: '.',
    nodeRequire: require
});
{% endhighlight %}

We are going to use `requirejs` to load modules. This is actually different from the `nodejs` method `require()`.
Then we add the configuration. The `baseUrl` specifies from which point modules must be found.
This path is relative to the runtime, thus when running `grunt` at project root (cf `tree`) we must specify files as `card` or `subdir/file`.

When loading modules within tests there's one important thing: creating a test before calling `requirejs()`. This is because `Mocha` need to know tests exists.
After that we can load any modules needed by the tests:

{% highlight js %}
describe('Card Testing', function() {
    // Load modules with requirejs before tests
    var Card, Victory;
    before(function(done) {
        requirejs(['src/card'], function(card) {
            Card = card;
            done(); // We can launch the tests!
        });
    });
{% endhighlight %}

We declare a variable `Card` to store the `Card` class and use it later in the tests.
By using the `before(done)` function we ensure that classes will be available **before** any test.
Calling `done()` callback is necessary because we're dealing with asynchronous module loading, thus we have to notify `Mocha` that modules are available.
If we don't call `done()`, tests will fail because they will be called before `requirejs()` call ends.

**Note**: The `describre()`, `before(done)` and `it()` methods are `BDD` assertions style (as `shouldjs`). The `TDD` equivalents are `suite()`, `setup(done)` and `test()`

Once the *setup* is done we can do the tests as usual:

{% highlight js %}
describe('#instanciation', function(){
    it('should work without problems', function(){
        Card.should.have.property('new');
        var c1 = Card.new(1);
        var c2 = Card.new();
        c1.should.have.property('img', "");
        c1.should.have.property('cost', 1);
        c2.should.have.property('img', "");
        c2.should.have.property('cost', 0);
    });
});
{% endhighlight %}

Remember to use the `done()` callback when dealing with asynchronous code!

#Boilerplate

You can find the boilerplate here:

[https://github.com/posva/mocha-requirejs-boilerplate](https://github.com/posva/mocha-requirejs-boilerplate)

The `Gruntfile` contains more targets that help development, such as:

* `serve`: simple HTTP server
* `deploy`: Compress and unify every `js` file using `requirejs`
* `jshint`: run `jshint` on project files.
* `default`: will run `test`, `jshint` and `deploy`

There's also a `Victory` class to show that everything works just fine with more that one module loading.
