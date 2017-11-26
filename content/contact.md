---
title: "Contact"
date: 2017-11-26T11:22:18+10:00
lastmod: 2017-11-26T11:22:18+10:00
draft: false
keywords: []
description: ""
tags: []
categories: []
author: ""

# you can close something for this content if you open it in config.toml.
comment: false
toc: false
# you can define another contentCopyright. e.g. contentCopyright: "This is an another copyright."
contentCopyright: false
reward: false
mathjax: false
---

<!--more-->

<style>
.py2 {
    padding-top: 1rem;
    padding-bottom: 1rem
}
.form-stacked input, .form-stacked textarea, .form-stacked select {
    width: 100%
}
input, select, textarea, fieldset {
    font-size: 1rem;
    margin-top: 0;
    margin-bottom: .5rem
}
input[type=text], input[type=datetime], input[type=datetime-local],
input[type=email], input[type=month], input[type=number], input[type=password],
input[type=search], input[type=tel], input[type=time], input[type=url],
input[type=week] {
    box-sizing: border-box;
    height: 2.25rem;
    padding: .5rem .5rem;
    vertical-align: middle;
    -webkit-appearance: none
}
.form-stacked input, .form-stacked textarea, .form-stacked select {
    width: 100%
}
button, .button {
    font-family: "Lato", "Helvetica Neue", Helvetica, sans-serif;
    font-size: inherit;
    font-weight: normal;
    text-decoration: none;
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box;
    line-height: 1.125rem;
    padding: .5rem 1rem;
    margin: 0;
    height: auto;
    border: 1px solid transparent;
    vertical-align: middle;
    -webkit-appearance: none
}
button, .button {
    text-shadow: none;
    background-image: none
}
.button:hover, .button:focus, .button:active {
    color: white;
    text-shadow: none;
    background-image: none
}
.button-blue {
    color: white;
    background-color: #0076df;
    border-radius: 3px;
    transition-duration: .1s;
    transition-timing-function: ease-out;
    transition-property: box-shadow, background-color
}
.button-blue:hover {
    opacity: .875
}
.button-blue:active, .button-blue.is-active {
    box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.125), inset 0 2px 3px 0 rgba(0, 0, 0, 0.25)
}
.button-blue:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5), 0 0 1px 4px rgba(0, 118, 223, 0.5)
}
.button-blue:disabled, .button-blue.is-disabled {
    opacity: .5
}
textarea {
    box-sizing: border-box;
    line-height: 1.75;
    padding: .5rem .5rem
}
</style>

<div class="py2">
  <form action="https://formspree.io/sarah@troz.net" method="POST" class="form-stacked form-light">
  <input type="text" name="name" class="input mobile-block" placeholder="Name">
  <input type="email" name="email" class="input mobile-block" placeholder="Email Address">
  <input type="text" name="_gotcha" style="display:none" />
  <input type="hidden" name="_subject" value="TrozWare Contact" />
  <input type="hidden" name="_next" value="/thanks/" />
  <textarea type="text" name="content" class="input mobile-block" rows="5" placeholder="What would you like to say?"></textarea>
  <input type="submit" class="button button-blue button-big mobile-block" value="Send Message">
  </form>
</div>
