---
date: 2013-04-01T00:00:00Z
tags:
- markdown
title: Markdown
---

For some time now, I have been aware of the increasing trend towards using
Markdown for text editing and for creating HTML. Markdown has been on my list of
"things I should learn some day" so I was interested last week to read about a
new iBooks book called [The MacSparky Markdown Field Guide][1]. This was
sufficient inspiration so I got the book and read through it this weekend.

![The MacSparky Markdown Field Guide][2]

Actually, to say that I _read_ through the book is a mis-representation. The
book was written using iBooks Author specially for the iPad and contains screen
casts and interviews as well as text. But by the end of it, I now feel I have a
basic understanding on Markdown and the ways in which I can use it.

I guess the really big thing about using Markdown is that is creates plain text
files that are human-readable even without being converted to HTML. This makes
them future-proof since they are not tied to a proprietary file format that may
cease to exist at any time.

---

## Using Markdown:

Since this web site is a self-hosted WordPress site, my next step was to look
for a WordPress plugin that would allow me to use Markdown to create my posts. I
could have used a Markdown editor that had HTML export, but I wanted to try
something that would eliminate the extra step. The first one I decide to try was
[Markdown on Save Improved][3].

One of the main reasons for choosing this one was that it stores the posts as
both Markdown and as HTML. This saves time when going back to edit a post,
avoids the constant changes that creep in when converting between formats all
the time, and makes it so that the post will still display correctly even if
Markdown is no longer supported. The only problem I have found so far is that it
doesn't automatically create links & image links using the Markdown format, but
uses standard `<a>` and `<img>` links instead.

My next stop, since I always use a Mac, was to get Brett Terpstra's collection
of [Services for Markdown][4]. These add a lot on convenient shortcuts: one of
my favourites is the ability to convert inline links to references links for
increased readability while editing.

---

## First Impressions:

So having written this first post in Markdown, how do I feel about it? I haven't
really tried anything too weird this time, but there are a few things that were
very easy to do. Particularly in the paragraph where I was talking about links &
images and wanted to include the tags as text without having it interpreted as
HTML. All I had to do was surround the text with back-ticks.

Links are vastly easier to manage and edit in Markdown. I miss the ability to
specify that links should open in a new tab - I prefer to have that setting for
links that take you outside my web site, but the modern theories on usability
seem to be heading towards deprecation of this feature, so I may just stop using
it.

With the standard WordPress editor, I always felt that I was fighting it. I had
to swap between the visual & HTML editor tabs and when I swapped tabs, things
would sometimes change without me doing anything. So far, I feel more in control
using Markdown and although I have lost the WYSIWYG visual editor, I no longer
have to wade through the HTML editor to get the effect I want or to remove the
results of a few careless clicks.

---

## What next?

Some of the things on my wish list would be solved by a better editor and some
by more powerful syntax.

Editor:

* Adding links & images using Markdown style instead of HTML
* Being able to create lists
  * Markdown makes this very easy but this WP plugin does not support lists as
    far as I can tell
  * So these lists are in HTML

Syntax:

* Alignment of text & images

Using a stand-alone Markdown editor would solve the editor questions, but I
wanted to try writing this post completely in WordPress.\
And with the alignment, there is nothing to stop me adding CSS to the Markdown.

Next time, I will test out a different WordPress Markdown editor and see how
that goes. I will also test using a standalone editor and exporting its HTML to
create a post.

[1]: http://macsparky.com/markdown
[2]: http://static.squarespace.com/static/5008676d84aeae82b8acdd8c/t/5147c7a6e4b0d224b4419401/1363658669971/Markdown%20Cover%20Art%20-%20JPG.jpg?format=500w
[3]: http://wordpress.org/extend/plugins/markdown-on-save-improved/
[4]: http://brettterpstra.com/projects/markdown-service-tools/
