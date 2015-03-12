---
title: Testing automation
author: Sarah
layout: post
permalink: /testing-automation/
tags:
  - 
---
Today I am experimenting with automating post generation.

Firstly, there is the structure of the post Markdown document, which really boils down to the file name and the header.

I have set up a macro in Typinator so that I just type the title of the post in a text document. Then I copy that titel to the clip board and type the shortcut. The header is then created with the title and the formatted permalink.

To save the document, I use another Typinator snippet to convert the title (still in the clipboard) to lower case and to replace the spaces in the title with dashes.

For starting the local Jekyll server, I have turned to an Alfred workflow. I have two actions in the workflow. One opens Terminal, cd's to my site folder and runs the command to start the local Jekyll server. The second opens my default browser to the local Jekyll test address.

Both these actions happen simultaneously so the browser usually fails until refreshed.
The server is left running in Terminal so I can shut it down when finished testing.

The final stage is to publish, so I need to work out the commands for doing a git commit and push. Then I should be able to make another Alfred workflow to perform those tasks.

Testing the git commands using Terminal, I have come up with the following sequence:

    git add .
    git commit -a -m 'Commit message here'
    git push

The commit message could be the title of the post, so I need a way to construct the command and then execute it. Typinator is good at text manipulation, so I constructed another macro that takes the clipboard, uses it has the commit message and performs the git commands. I have to go into Terminal to trigger this macro, but then it appears to work.


