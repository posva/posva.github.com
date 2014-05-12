---
layout: post
title: "My dotfiles"
description: "So easy to sync!"
categories: [shell, git, misc]
tags: [zsh, dotfiles, bash, custom, gitconfig, git]
---
{% include JB/setup %}

##What are the dotfiles

Dotfiles are all these files that usually start by `.` and let you configure many applications behaviour such as `vim` and `git`.

When you work on different computer you start missing your `vimrc`, `bashrc`, etc. This is when you start copying your files from one computer to another. That's **sooooo** annoying... `rsync`, `scp`you get tired of that very soon but there is a solution: `git`

##Syncing with git
That's right, `git` is the perfect tool as we're manipulating text all the time and we can perform upgrades to our dotfiles from anywhere with some `git push` and `git pull` or `gp` and `gl` if you like aliases :P

These are the steps I did to have my dotfiles working. I got inspired by someone else but I don't remember his name so I cannot give him credit :/
1. Create a directory (you can  do it with git so you already have the repo created aswell)
2. Copy your dotfiles to it without the `.` in front of it
3. Create an installation script adapted to your dotfiles. This is the harder step, depending on what you want to sync your script will be longer. Usually yoru script should always do a security copy of every file you are going to replace and then create symbolic links with `ln -s` to point to your files. Here is my `install.sh` script. It downloads `zsh` and oh-my-zsh, which I really recommend :P


3. Create an installation script adapted to your dotfiles. This is the harder step, depending on what you want to sync your script will be longer. Usually yoru script should always do a security copy of every file you are going to replace and then create symbolic links with `ln -s` to point to your files. Here is my `install.sh` script. It downloads `zsh` and oh-my-zsh, which I really recommend :P

_Warning!_ This version may change in future to check the current version go [here](https://github.com/posva/dotfiles/blob/master/install.sh)
{% highlight bash %}
#!/bin/bash
############################
# install.sh
# This script creates symlinks from the home directory to any desired dotfiles in ~/dotfiles
############################

########## Variables

dir=~/dotfiles               # dotfiles directory
olddir=~/dotfiles_old             # old dotfiles backup directory
files="bashrc vimrc vim zshrc gitconfig oh-my-zsh"    # list of files/folders to symlink in homedir

##########

# Verification of the install dir
if [[ ! "$(cd `dirname $0` && pwd)" == "$dir" ]]; then
  echo "The dotfiles repo is at a wrong place. It should be at $dir"
  exit 1
fi

# create dotfiles_old in homedir
echo "Creating $olddir for backup of any existing dotfiles in ~ ..."
rm -rf $olddir
mkdir -p $olddir
echo "done"

# change to the dotfiles directory
echo "Changing to the $dir directory ..."
cd $dir
echo "done"

# move any existing dotfiles in homedir to dotfiles_old directory, then create symlinks from the homedir to any files in the ~/dotfiles directory specified in $files
for file in $files; do
  echo "Moving any existing dotfiles from ~ to $olddir"
  if [ -f ~/.$file -o -d ~/.$file ]; then
    echo "moved $file"
    mv -f ~/.$file $olddir
  fi
  echo "Creating symlink to $file in home directory."
  ln -s $dir/$file ~/.$file
done

function install_zsh {
# Test to see if zshell is installed.  If it is:
if which zsh >/dev/null; then
  # Clone my oh-my-zsh repository from GitHub only if it isn't already present
  if [[ ! -d $dir/oh-my-zsh/ ]]; then
    echo "Cloning oh-my-zsh"
    git clone https://github.com/robbyrussell/oh-my-zsh.git
  fi
  # Set the default shell to zsh if it isn't currently set to zsh
  if [[ ! $(echo $SHELL) == $(which zsh) ]]; then
    if [ ! "$(grep $(which zsh) /etc/shells)" ]; then
      sudo echo "$(which zsh)" >> /etc/shells
    fi
    chsh -s $(which zsh)
  fi
else
  # If zsh isn't installed, get the platform of the current machine
  platform=$(uname);
  # If the platform is Linux, try an apt-get to install zsh and then recurse
  if [[ $platform == 'Linux' ]]; then
    sudo apt-get install zsh
    if [ ! "$?" = 0 ]; then
      echo "Couldn't install zsh. If you don't want me to install it, use -z to disable zsh installation"
      exit 1
    fi
    install_zsh
    # If the platform is OS X, tell the user to install zsh :)
  elif [[ $platform == 'Darwin' ]]; then
    if which brew >/dev/null; then
      echo "Installing Homebrew(brew)..."
      ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"
      echo "done"
    fi
    echo "Installing zsh..."
    brew install zsh
    echo "done"
    install_zsh
    exit
  else
    echo "What is your OS??? Install manually zsh"
    exit 1
  fi
fi
}

if [ ! "$1" = -z ]; then
  install_zsh
  if [ ! "$?" = 0 ]; then
    exit "$?"
  fi

  # Install posva zsh theme
  zsh_theme="oh-my-zsh/themes/posva.zsh-theme"
  if [ ! -f $zsh_theme ]; then
    echo "Installing zsh theme..."
    wget -q https://raw.github.com/posva/oh-my-zsh/6e611f2f45320eef572d13fc3c57391fd0beedb3/themes/posva.zsh-theme -O $zsh_theme
    echo "done"
  fi
fi

echo "Creating backup vim directory..."
mkdir -p vim/backup
echo "done"

if [[ ! -d $dir/vim/bundle/vundle/ ]]; then
  echo "Installing Vundle"
  git clone https://github.com/gmarik/vundle.git vim/bundle/vundle
  echo "done"
fi

if which vim >/dev/null; then
  vim -c "BundleInstall"
else
  echo "Install vim with python suppoort and then run \"vim -c BundleInstall\""
fi
{% endhighlight %}

Then push it to a remote repo and Profit :D!

Now everytime you do some modification you just have to `push` it and you will be able to `pull` it from another computer.

