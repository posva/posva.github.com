---
layout: post
title: "Git Flow aliases"
description: ""
categories: [shell, git, zs]
tags: [zsh, git, flow, completion, alias, aliases]
---

I recently started using [git-flow](https://github.com/nvie/gitflow) which is an
utility that makes it really easy
[nvie's branching
model](http://nvie.com/posts/a-successful-git-branching-model/)

The branching model is well explained in his blog. If you've never heard about
it, I really recommend you to read it.

About git-flow itself, there is a nicely done cheatsheet
[here](http://danielkummer.github.io/git-flow-cheatsheet/)

If you're on a mac you can install it with brew

{% highlight bash %}
brew install git-flow
{% endhighlight %}

This also downloads the completion files. Which are in my opinion really useful
when you start using a tool

![completion]({{ site.baseurl }}/images/posts/git-flow-completion.png)

However we can bring it to the next level by setting up some aliases. This takes
very little time and saves you some keystrokes everyday. I couldn't find any so
I created my own:

{% highlight bash %}
alias gf='git-flow'
alias gfi='git-flow init'
alias gfid='git-flow init -d'

alias gff='git-flow feature'
alias gffv='git-flow feature -v'
alias gffco='git-flow feature checkout'
alias gffd='git-flow feature diff'
alias gfff='git-flow feature finish'
alias gffp='git-flow feature publish'
alias gffl='git-flow feature pull'
alias gffr='git-flow feature rebase'
alias gffs='git-flow feature start'
alias gfft='git-flow feature track'

alias gfr='git-flow release'
alias gfrv='git-flow release -v'
alias gfrf='git-flow release finish'
alias gfrp='git-flow release publish'
alias gfrs='git-flow release start'
alias gfrt='git-flow release track'

alias gfh='git-flow hotfix'
alias gfhv='git-flow hotfix -v'
alias gfhf='git-flow hotfix finish'
alias gfhp='git-flow hotfix publish'
alias gfhs='git-flow hotfix start'
{% endhighlight %}

Do you have any more aliases you use everyday?

