---
layout: post
title: "Using task-logger.sh"
description: "to rewrite my dotfiles install.sh"
categories: [shell]
tags: [task, logger, sh, task-logger, task-logger.sh, shell, bash, zsh, dotfiles]
---
{% include JB/setup %}

#task-logger.sh

[**task-logger.sh**](https://github.com/posva/task-logger.sh) is a tiny shell lib I wrote about a week ago. It is compatible with `zsh` and `bash` and can be used with `sh` by just changing the `echo` calls (`sh` `echo` doesn't accept `-n` option).

It allows to have some fancy output, summarizing what is most important:
* execution time
* status code

The output is all written to temporary files in `/tmp`, making the status of each task easily readable.

ISERT PIC HERE

In my [dotfiles](https://github.com/posva/dotfiles) I use a quite simple `install.sh` script to install everything I need to work. The output isn't great and I cannot read easily if something fails. This is way I'm moving to **task-logger.sh**.

# Helpers

During my install script I want to have some critical tasks. However I just want to print messages and then exit instead of `-c` option behaviour for `log_cmd`.
Therefore I implement two functions `fail` and `crash`:

{% highlight bash %}
fail() {
  ko
  bad "$@"
}

crash() {
  ko
  bad "$@"
  exit 1
}
{% endhighlight %}

They are supposed to be used as a replacement for the `ko` function in the `log_cmd <task-name> <task> || ko` call.

# Approach

Most of the translation is pretty much straight forward but sometimes you want to group very tiny tasks such as `cd` or `mkdir`. You can either extend `working` functionality to fit your needs or create functions with `|| return 1` at the end of each command. I personally prefer the last one as it produces less output.

For instance backing up files looks like this:

{% highlight bash %}
_backup_dir() {
  mkdir -p $olddir || return 1
  for file in $files; do
    if [ -f ~/."$file" -o -d ~/."$file" ]; then
      mv -f ~/."$file" "$olddir" || return 1
    fi
  done
}
backup_dir() {
  working -n "Backing up files to $olddir"
  log_cmd $0 _backup_dir || crash "Backup failed, aborting"
}
{% endhighlight %}

You can even group many `log_cmd` inside a function if the tasks are dependants. For example when installing `oh-my-zsh`, I need `zsh` first. There is no point in installing `oh-my-zsh` if `zsh` already failed. To achieve this we create an other auxiliary function and call it from the main function adding a `|| ko` or any other equivalent (`warn`, `crash`, `failed`)

{% highlight bash %}
_install_zsh() {
  if [[ ! -x $(which zsh) ]]; then
    working -n "Installing zsh"
    log_cmd zsh-install ${INSTALL} zsh || return 1
  fi
  if [[ ! -d ${dir}/oh-my-zsh/ ]]; then
    working -n "Cloning oh-my-zsh"
    log_cmd oh-my-zsh git clone https://github.com/robbyrussell/oh-my-zsh.git || return 1
  fi
}
install_zsh() {
  _install_zsh || ko
}
{% endhighlight %}

Note the `|| return 1` to exit the function. The `|| ok` is actually necessary because `log_cmd` does print the check mark when the task succeed but doesn't print anything if it fails. It doesn't print a newline.

# Vim plugins

I install Vim plugins with Vundle, inside Vim. This means that Vim is launched and the progress is shown inside. Therefore using `log_cmd` is not the right way to go as this will print dots (`.`) while in Vim. You should actually use timers and print some custom information. It's this simple:

{% highlight bash %}
  # install plugins
  working -n "Installing plugins"
  reset_timer 5
  if vim -Nu "$dir/vim-plugins.vim" +PluginInstall! +qall; then
    echo -n "[$(get_timer 5) s]"
    ok
  else
    echo -n "[$(get_timer 5) s]"
    ko
  fi
{% endhighlight %}

In my dotfiles i replace the `ko` call with `return 1`

# Final result

At the moment I just have this tiny screenshot with a few tasks because most of them are skipped. I will added a better one when I can

![shot]({{BASE_PATH}}/img/posts/dotfiles-log.png)
