---
title: 'Book Building'
date: 2024-08-06T11:29:44+10:00
draft: false
description: 'How I constructed all the versions of macOS by Tutorials'
tags:
  [
    'mac',
    'book',
    'ebook',
    'asciidoc',
    'markdown',
    'pandoc',
    'pdf',
    'epub',
    'html',
  ]
---

I started writing books for Kodeco when I was asked to contribute some Mac content to [SwiftUI by Tutorials][5]. I quickly learned that I really enjoyed long form technical writing but I wanted to create more Mac-specific content. After some negotiations, Kodeco agreed to my plan to write [macOS by Tutorials][6] and the first edition was published in April 2022.

As I have written elsewhere, Kodeco has pivoted away from books and into providing multi-modal courses. They agreed to transfer the rights of the macOS by Tutorials book to me as it was out-of-catalog and since then, I have released an update.

When writing for Kodeco, all I had to do was write the text and the accompanying code and images. The people at Kodeco took care of the rest. Many thanks to all involved - I greatly underestimated the work that this entailed! Now that I am self-publishing, I have had to learn how to create the various formats myself. This post is a summary of how I did that.

<!--more-->

### Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Formatting](#formatting)
  - [HTML](#html)
  - [PDF](#pdf)
  - [ePub](#epub)
- [Writing Tools](#writing-tools)
- [Conclusion](#conclusion)

### Introduction

Since I always used Markdown when writing for Kodeco, that's where I started. I wanted to produce the book as an ePub and a PDF, so I needed to convert the Markdown to those formats. I also wanted to produce a web version, so that required a Markdown to HTML conversion. After some research, I started off with [pandoc][7]. This is a command-line tool that can convert between many different formats, so it seemed like a good choice.

I found it very difficult to use and to configure to give the results I wanted. While looking for examples online, I discovered [Pro Git][1]. This looked like it was doing what I was trying to do, but even after following their examples, I was still having problems. Then I discovered that [Pro Git 2nd Edition][2] was written in AsciiDoc, not Markdown. I had never heard of AsciiDoc but it looked like it might make generating various book formats easier, so I decided to give it a try.

AsciiDoc is a markup language very similar to Markdown. This quick reference guide shows the syntax: [AsciiDoc Syntax Quick Reference][3]. The secret sauce was using AsciiDoctor to convert AsciiDoc files into HTML, ePub and PDF. This was much easier to use than pandoc but it took a bit of tweaking to get the results I wanted for each format.

## Project Structure

I started by copying the file and folder structure used for Pro Git. I've since modified it to suit my needs but the basic structure is much the same. In the root folder, I have the following:

- **Rakefile**: The Ruby file that contains the commands to generate the various formats.
- **Gemfile** & **Gemfile.lock**: These files handle the Ruby libraries used to create the various formats.
- **book.adoc**: The main file that assembles the contents of the book and is used for the PDFs and ePub versions.
- **book-html.adoc**: The same as book.adoc but with an added image, since the HTML version doesn't have a cover.
- **theme folder**: The files used to style the different versions.
- **images folder**: All the images used in the book.
- **fonts folder**: The custom fonts used in the book.
- **components folder**: The adoc files referenced by book.adoc.
- **book folder**: The adoc files for each chapter as well as preface, introduction, conclusion etc.

AsciiDoc files can import other AsciiDoc files, so I have a separate file for each chapter in the book as well as files for the non-chapter content. The **book.adoc** file includes **components/headers.adoc**, a link to the cover image and **components/contents.adoc**. **book-html.adoc** is the same except for including the cover as an image file.

The **headers.adoc** file is where AsciiDoctor reads the metadata for the book:

```asciidoc
= macOS by Tutorials
Sarah Reichelt
:doctype: book
:doctitle: macOS by Tutorials
:notitle:
:toc: macro
:toclevels: 2
:figure-caption!:
:description: macOS App Development for iOS Developers
:author: Sarah Reichelt
:copyright: (C) 2024 Sarah Reichelt. All rights reserved.
:epub3-stylesdir: theme
```

Some of these are self-explanatory, but there are some oddities:

- `:doctype: book`: Set the type of this document to a book. AsciiDoctor uses different formatting and allows different header levels for different types of documents.
- `:notitle: `: Turn off default title page. I wanted to customise my title page.
- `:toc: macro`: Setting this to macro allows me to specify the location for the table of contents, instead of using the default placement.
- `:toclevels: 2`: Set the number of header levels to include in the table of contents.
- `:figure-caption!:`: Tell AsciiDoctor not to add 'Figure #' to all image captions.
- `:epub3-stylesdir: theme`: The folder containing the styles for the ePub version.

The next file in components is **content.adoc**. This is where I include the title page, the table of contents, the introductory pages, the sections and the conclusion. Each section file has a header, an introduction and links to the chapter files.

With the folder structure in place, I copied the matching Markdown files from the original book. Then I used various tools to convert these files into AsciiDoc. The [Kramdown AsciiDoc][4] converter did most of the work to translate Markdown to AsciiDoc. The image links needed special handling, especially when it came to adding captions and sizes. I used Python scripts for this. Python is always my go-to tool for text and file manipulation. I also used Python to strip out the Markdown metadata at the start of every chapter and add the AsciiDoc metadata.

I am not artistic, so I used Keynote to create the cover image. This allowed me to do object-oriented design with images, shapes and text. I then exported it as a PNG file for use in the book.

Finally, I had all the files in the right places and in the correct formats. Now to generate and style the various versions.

This involved using Ruby to run the various AsciiDoctor commands. My Mac had Ruby installed but only an old version, so I used Homebrew to update to Ruby 3.3. I'm not familiar with Ruby, so I had to learn how to install and update the required gems. With them in place, I used the commands in the Rakefile to create the various formats.

## Formatting

The Pro Git Rakefile started by defining some parameters that could be passed to the AsciiDoctor commands for all the formats.
In their case, params included two attributes: `revnumber` and `revdate`. I also wanted to specify the syntax highlighter and its style. Working out what to use for the syntax highlighter was a bit tricky as I wanted the code blocks to look like they would in Xcode, but I eventually found the right combination using [pygments][14] and its **xcode** style:

My parameters used by all the different formats ended up like

```ruby
version_string = '2.0'
date_string = Time.now.strftime('%Y-%m-%d')

params = "--attribute revnumber='#{version_string}' --attribute revdate='#{date_string}'"
syntax_params = "--attribute source-highlighter=pygments --attribute pygments-style=xcode"
```

Then I had to work out how to style each format.

### HTML

Pro Git uses this command for generating the HTML, which gave me my starting point:

```ruby
sh "bundle exec asciidoctor #{params} -a data-uri progit.asc"
```

I had already added a second set of params for the syntax highlighter, but the next thing was to add my own style sheet. The Pro Git repo had a **theme** folder with sub-folders for each format. I tried editing **theme/html/html.css** but that didn't work. I eventually found that I needed to create a new file called **docinfo.html** in the **theme** folder and then add more attributes to access it. This changed my command to:

```ruby
book_title = 'macOS_by_Tutorials_v2.0.html'
style_sheet = '-a docinfodir=theme -a docinfo=shared'

sh "bundle exec asciidoctor #{params} #{syntax_params} #{style_sheet} -a data-uri -o #{book_title} book-html.adoc"
```

This meant that I could add my own CSS or JavaScript to the **theme/docinfo.html** file and it would be included in the HTML output. The `data-uri` attribute tells AsciiDoctor to embed the images in the HTML output. I didn't want to have to give people a folder of images to go with the HTML file, I wanted a single file that could be opened in a browser and would include everything.

I generated an HTML file using the default styling, then copied the default CSS into a `style` block in this file. I then edited it to my satisfaction.

One refinement for the HTML version was to add a copy button on the code blocks. I used [clipboard.js][8] for this and tweaked the style and position of the copy button to match my style. I also added JavaScript to make the copy operation ignore the numbered comment lines that are used to mark explanation points throughout the code.

### PDF

The PDF was the most difficult to format as it doesn't use CSS but includes some other formatting options in a YML file, perhaps based on Postscript? I used AsciiDoctor to export the default PDF theme so I could see the format. Then I created my own PDF theme file, extending the default theme. This involved quite a bit of trial and error as I had to work out what the various styles were called and how to override them. I also wanted to create a dark mode version of the PDF, so I made a second theme file for that.

The two theme files are called **pdf-theme.yml** and **pdfdark-theme.yml**. They are both inside the **theme** folder. I used these in the Rakefile like this:

```ruby
pdf_params = '-a pdf-theme=pdf -a pdf-themesdir=theme -a pdf-fontsdir=.'
output_name = book_title + '_v' + version_string + '.pdf'

sh "bundle exec asciidoctor-pdf #{pdf_params} #{syntax_params} #{params} -o #{output_name} book.adoc"
```

And:

```ruby
pdf_params = '-a pdf-theme=pdfdark -a pdf-themesdir=theme -a pdf-fontsdir=.'
syntax_params = "--attribute source-highlighter=pygments --attribute pygments-style=github-dark"
output_name = book_title + '_v' + version_string + '_dark.pdf'

sh "bundle exec asciidoctor-pdf #{pdf_params} #{syntax_params} #{params} -o #{output_name} book.adoc"
```

As you can see, the **-theme.yml** part of the file name is not included in the command, just the base name. The `pdf-themesdir` attribute is used to point to the theme folder and the `pdf-fontsdir` attribute is used to point to the root folder. This worked because I had the font files in a **fonts** folder and included the folder path in the font specifications of the YML files.

For the PDF versions, I also added a header to every page with the book title and the chapter title using the YML files.

### ePub

Finally, the ePub version. To my surprise, an ePub is actually a zip file. The contents are XHTML files, images and styles. The secret here was again to have files with the correct name in the correct location. In this case, I needed **epub3.scss** and **epub3-css3-only.css** in the **theme** folder. I left **epub3.scss** empty, but it still had to be there. The **epub3-css3-only.css** file had styles for where I wanted to override the defaults. It wasn't always easy to know what classes to apply the styles to, but I opened one of the XHTML files in my browser and used the web inspector to find them.

## Writing Tools

The editor I used was [Visual Studio Code][9]. While it's not a native Mac app, it's a very powerful editor and has a fantastic array of extensions. I installed the [AsciiDoc extension][10] which allowed me to preview the AsciiDoc files in the editor.

There was a problem with previewing because of the image paths. The **book.adoc** file specifies the path to the images folder, but when previewing an individual chapter file, this was not applied. I had to add a line to the metadata at top of each chapter file to include the path to the images folder. I also added a header to show a table of contents to make it easier to jump around the file while editing. When building the entire book, these headers had to go - the image path over-rode the one in the book.adoc file and meant that book.adoc couldn't find any images, and a table of contents was included in every chapter. I ended up turning to Python again and wrote a script to add and remove these headers as needed.

I use [GitHub][15] to store the book files and to collaborate with my editor, or language engineer as he prefers to be called.

The other important extension is [Code Spell Checker][11]. Of course there will still be typos in the final book, but this extension helps to catch some of them. A big advantage of this spell checker is that it defaults to US English spelling. I normally write UK/Australian English, but I prefer to use US English for my books to avoid things like **Create an NSColor is store the selected colour** :-). Another big plus is that the custom dictionary is a JSON file stored in the project. That way my editor gets the same spell checking as I do, and I can easily edit the file if I want to delete or change a custom spelling.

All the code is written in Xcode using the default settings and theme as much as possible.

Screenshots are taken with [CleanShot X][16] and edited in Preview, which usually just involves cropping.

For hardware, my main computer is a 24" M3 iMac, my keyboard is an [Ergodox Moonlander][12] and my mouse is a [Logitech MX Vertical][13]. I also have a 13" M1 MacBook Pro for when I need to work in a different location.

## Conclusion

AsciiDoc is just as easy to write as Markdown, but makes creating books vastly easier.

While creating all the files to format the first book took a lot of time and effort, I now have a template and subsequent books will start from that, making the process much less complicated. I imagine that I will keep tweaking the configuration and design as I go to make each format look better, but I now have the basic structure in place.

If anyone is interested, I am happy to share the template and the scripts I have written. Contact me using one of the links below or through the [Contact][contact] page.

[1]: https://github.com/progit/progit
[2]: https://github.com/progit/progit2
[3]: https://docs.asciidoctor.org/asciidoc/latest/syntax-quick-reference/
[4]: https://github.com/asciidoctor/kramdown-asciidoc
[5]: https://www.kodeco.com/books/swiftui-by-tutorials
[6]: https://troz.net/books/macos_tutorials
[7]: https://pandoc.org
[8]: https://clipboardjs.com
[9]: https://code.visualstudio.com
[10]: https://marketplace.visualstudio.com/items?itemName=asciidoctor.asciidoctor-vscode
[11]: https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker
[12]: https://www.zsa.io/moonlander/
[13]: https://www.logitech.com/en-au/products/mice/mx-vertical-ergonomic-mouse.910-005449.html
[14]: https://pygments.org
[15]: https://github.com
[16]: https://cleanshot.com
[contact]: /contact/
[kofi]: https://ko-fi.com/trozware
