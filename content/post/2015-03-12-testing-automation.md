---
author: Sarah
date: 2015-03-12T00:00:00Z
tags:
- jekyll
- web
title: Testing automation
url: /testing-automation/
---

Today I am experimenting with automating post generation.

Firstly, there is the structure of the post Markdown document, which really boils down to the file name and the header.

I have set up a macro in [Typinator][1] so that I just type the title of the post in a text document. I copy that title to the clipboard and type the shortcut. The header is then created with the title and the formatted permalink.

To save the document, I use another Typinator snippet to convert the title (still in the clipboard) to lower case and to replace the spaces in the title with dashes.

For starting the local Jekyll server, I have turned to an [Alfred][2] workflow. I have two actions in the workflow. One opens Terminal, cd's to my site folder and runs the command to start the local Jekyll server. The second opens my default browser to the local Jekyll test address.

Both these actions happen simultaneously so the browser usually fails until refreshed.
The server is left running in Terminal so I can shut it down when finished testing.

After writing the post, the final stage is to publish, so I need to work out the commands for doing a git commit and push. Then I should be able to automate those tasks.

Testing the git commands using Terminal, I have come up with the following sequence:

    git add .
    git commit -a -m "Commit message here"
    git push

The commit message could be the title of the post, so I need a way to construct the command and then execute it. Typinator is good at text manipulation, so I constructed another macro that takes the clipboard, uses it as the commit message and performs the git commands. This gave a good commit message, but the actual commit failed, so that was no use.

So then I went back to Alfred and created a workflow there with a series of Terminal commands to perform the actions above. This only allows a generic commit message, but it works as expected.

So there is still room for improvement, but with a set of macros, I can automate a lot of the standard text entry, which is always good for reducing errors.

--- 

The sequence now is:

1. Open the text editor and type the title of the post.
1. Cut this into the clipboard.
1. Run the Typinator macro to fill in the post header.
1. Save the post file, using the Typinator macro to construct the file name.
1. Write the post, then use an Alfred workflow to test it locally.
1. When ready, use an Alfred workflow to publish.

---
[1]: http://www.ergonis.com/products/typinator/
[2]: http://www.alfredapp.com