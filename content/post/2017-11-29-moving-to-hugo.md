---
title: "Moving to Hugo"
date: 2017-11-29T17:42:57+10:00
lastmod: 2017-11-29T17:42:57+10:00
draft: false
tags: ["hugo", "jekyll", "web", "blog"]
---

Yesterday, I came to update my blog: I had a new post in draft form and I wanted
to update the Swift code to version 4. However installing High Sierra had
removed [Jekyll][1] which is the site generator that I had been using. I
re-installed Jekyll but found that it had been updated from version 2 to version
3.

<!--more-->

---

## Jekyll Problems

Then my problems started: missing dependencies due to the basic Jekyll install
no longer including certain features, and then syntax errors due to changes in
the way things are done, particularly to do with pagination.

I tried to fix this myself, then thought that maybe the theme I was using had
already solved these issues so I tried re-installing that. It wanted to add
about 25 more gems and then failed to install - sigh - spend some time rolling
that back...

At this point I decided that if Jekyll was going to cause me a lot of trouble,
it might be worth looking at an alternative.

My main criteria were the ability to import my Jekyll site and the ability to
host on [GitHub Pages][2]. After checking out the options, I decided to have a
look at [Hugo][3].

---

## Moving to Hugo

One of the most lauded features of Hugo is speed. I had found with Jekyll that
when I saved an edited page, it took about 5 seconds before the edits could be
reloaded into the browser. Hugo is supposedly fast and does auto reloads.

Following the [Quick Start][4] guide, I installed Hugo. Importing my Jekyll site
worked easily and so fast I wasn't sure anything had happened, transferring my
posts to `contents/posts` and my other files (status pages, images etc.) to
`static`.

Then the main exercise appeared to be choosing a theme which would provide not
only the visuals but the capabilities of the site.

So I drew up a list of demands for any theme I chose:

### Must Have Features

* Responsive
* Blog style:
  * front page with recent posts
  * tags
  * archive page
* Written using Markdown
* Static pages for apps listing, about, contact etc.
* Syntax highlighting
* Social links
* Google Analytics

### Would Be Nice Features

* Disqus commenting
* Twitter cards
* JSON Feed
* Searching within the site

The Hugo themes page https://themes.gohugo.io has themes listed by capabilities,
but no way that I could see to combine a selection of capabilities.

Some of the features like Google Analytics or Disqus comments, I could probably
add myself using templates from theme that did include them, if the template I
chose did not.

Conveniently, nearly all these seem to come with an exampleSite folder that
contains the configuration info.

---

## Configuring a Theme

After testing out several alternatives, I decided to go with [Even][5] - at
least to start with. I installed the theme and copied the contents of the
example `config.toml` to my own `config.toml` file and started configuring.

I wasn't happy with some of the fonts, but soon worked out how to change the CSS
in the theme and then re-build it to apply the changes. And I changed the theme
colour from the default red to "Cobalt Blue".

Most of the other changes were done using the `config.toml` file. I was able to
set up menus, configure the social media links I wanted to show, set date
formats, set the number of items to show per page and so on.

I had a couple of more static pages that I wanted to show, so I added their
Markdown files to the content folder.

One nice feature which I had missed in Jekyll (or at least the way I had it set
up) was the ability to separate blog posts from more static web pages. Each of
my apps has an information/support page that does not accept comments and
doesn't need to be listed in the Archives. By moving these Markdown files from
`contents/posts` to `contents/pages`, I was able to achieve this.

Adding Google Analytics and Disqus commenting was as easy as entering my IDs in
the relevant places in the `config.toml` file.

I had to do some editing of my imported posts from Jekyll - mainly getting rid
of references to `{{ site.url }}` so that images and internal links would work.
And sometimes I just needed to re-save a file to make Hugo re-evaluate it (there
is probably a command to force a complete re-build if I looked for it.)

---

## Working out the Structure

One thing that I was puzzled by was what templates the various pages are
generated from.

The main page is easy enough as the theme folder has a layouts folder with an
`index.html` file containing the templating. When a post is displayed, that
looks like it comes from `layouts/posts/single.html` while
`layouts/posts/summary.html` contains the templating for each entry in the index
page.

But clicking on the Archives link in the me takes me to https://troz.net/post/
and there is no `post.html` file in layouts. There is a `post` folder, but it
contains the `single.html` & `summary.html` files described already.

Delving ever deeper, `layouts/_default/section.html` appears to contains the
Archives page template. But how does that relate to the https://troz.net/post/
link? And the Tags template is in `layouts/_default/terms.html` but appears in
https://troz.net/tags/. Checking the Hugo documentation for creating a theme, I
find the information I need. Hugo has a selection of file paths that it checks
for such templates, and these file paths match some of those. So now I know
where to go to customise further.

One feature that I really like about the Even theme is the ability to have a
table of contents displayed beside each blog post if your page is wide enough.
It takes the headers in the post and uses them to make the table. I may need to
add or edit the headers in some posts, but I really like this feature.

And if you want a laugh, test out the 404 page - here is a [bad link][7] - which
generates a random text emoji each time!

---

## Publishing

I wanted to use my existing GitHub Pages setup, so I replaced the site files in
my local repository with the new Hugo site files. I generated the static site
files using `hugo` in Terminal, then pushed the pages to GitHub. All I had to do
then was change the settings so that GitHub Pages knew my site was coming from
the `docs` folder and I was live with the new site.

---

## Final Thoughts

So how am I going with my check list?

* Responsive - ALMOST, not Hugo's fault
* Blog style - YES
* Written using Markdown - YES
* Static pages for apps listing, about, contact etc. - YES
* Syntax highlighting - YES
* Social links - YES
* Google Analytics - YES
* Disqus commenting - YES
* Twitter cards - NO
* JSON Feed - NO
* Searching within the site - NO

The Hugo generated pages are all responsive and look great on my iPhone, but my
old static page for listing my apps does not look good, so I need to re-design
that.

Twitter cards - I have found some articles on how to set that up, so it is
possible, but I haven't done it yet.

JSON Feed is not working. There are themes that apparently have this, but I
haven't yet worked out how to implement it - hopefully later.

In-site search - this was something I was able to get in my old WordPress site,
but not in Jekyll. There are Hugo themes listed that support search, but they
seem to just give a link to Google or DuckDuckGo. Maybe this can be edited to
restrict it to the site, but I dislike using such searches, so I will not add a
search unless it works internally. One theme I found uses [Algolia][6] to search
the site, so I will investigate that.

Overall, I am impressed. The transition was relatively easy, especially
considering that I didn't take the time to learn anything about Hugo first, but
just blundered in and tried to work it out on the fly.

The speed of generating pages and the live reload while developing make Hugo a
pleasure to work with. Now all I have to do is write some interesting posts...

And I want to tidy up the URLs, headers and tags for the older pages as well as
investigating Twitter cards, search & JSON Feed.

[1]: https://jekyllrb.com "Jekyll"
[2]: https://pages.github.com/ "GitHub Pages"
[3]: https://gohugo.io "Hugo"
[4]: https://gohugo.io/getting-started/quick-start/ "Hugo Quick Start"
[5]: https://github.com/olOwOlo/hugo-theme-even "Even"
[6]: https://www.algolia.com "Algolia"
[7]: https://troz.net/bad-link/ "404"
