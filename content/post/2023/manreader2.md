---
title: 'Man Reader 2'
date: 2023-10-13T15:46:38+10:00
draft: false
description: 'Man Reader 2 is now available from the Mac App Store.'
tags: ['man reader', 'mac']
---

Several years after I started planning it, Man Reader version 2 is now available.
This is a major update with a completely new, modern, user interface and it’s available from the [Mac App Store][3].

Man Reader is a utility app for reading macOS's **man** pages. Man Reader allows
quick, convenient and easy access to the man pages on your system, useful for
programmers, system administrators and tweakers.

<!--more-->

[![Buy Man Reader from the Mac App Store][i3]][3]

- Complete re-write for modern versions of macOS.
- Only runs on macOS Sonoma 14.0 or later.
- Support for tabs and multiple windows.

{{< img_border >}}

![Man Reader 2][i1]
![Man Reader 2 dark mode][i2]

Read all the details at the [Man Reader support page][2].

---

## Development Notes

Version 1.0 of Man Reader was released in 2012. It was written in Objective-C
and it suffered from the MVC - Massive View Controller - problem, but it kept going.

Over the years, I added new features and fixed bugs, but as macOS evolved, it started looking its age.

I've been planning a major update for a long time, but I've been busy with other things so in 2021
I released an interim update to keep the app working and readable on the latest macOS.

This year, I finally got a decent break in my usual schedule and I was able to get to work.

The new version was always going to be in Swift. After writing Swift for years now, I am
very comfortable with it and I write better and safer code in Swift than I can in Objective-C.

The difficult question was whether to use SwiftUI or AppKit as the basis for the app, understanding that
whichever way I went, I could add in components from the other framework. This required
several iterations to find the best solution.

I prefer working in SwiftUI so I started there first, but as I have written elsewhere,
SwiftUI Lists, especially on macOS, do not handle large numbers of rows. This has improved a lot
in macOS Sonoma but it's still not great. On my system, I have
more than 10,000 man pages and that rises to over 25,000 if I include all of Xcode's commands.
I tried a number of different approaches to make a SwiftUI List work, but then decided I'd have to use
AppKit as the starting point for the app.

This solved the performance issue but caused others. I've got so used to SwiftUI's reactive
data flow that I found it difficult to work with pure AppKit. There were also things that SwiftUI is
just better at, like support for multiple windows.

So I went back to a SwiftUI base and embedded an AppKit `NSTableView` to handle the long list in the sidebar.
This was interesting because I dislike creating an `NSTableView` via code - there are just too many components
and settings that storyboards make simple. So for the first time, I embedded a Storyboard view into a SwiftUI
view. I did this by adding an `NSViewController` with a **xib** file and then using that in an
`NSViewControllerRepresentable` struct. This worked well and the published app has a SwiftUI base and an AppKit sidebar.

One feature that I was very keen to maximise was keyboard support. To a large extent, you can operate
Man Reader without the mouse. The menus show most of the available shortcuts, but you can also
press Tab or Shift-Tab to get to the two search fields. The sidebar is a table so you can use the arrow keys
to navigate but you can also use type-select if there is no active cursor. Start typing to select
the first page with a name starting with those characters.

One other design decision was to support the latest version of macOS only. The old version of Man Reader is
still available for anyone on older systems, but I wanted to learn and use all the latest features of
Swift and SwiftUI.

If you have any ideas for future versions or
encounter any bugs, please [email me][8] or get in touch through the [Contact][contact] page.

[i1]: /images/2023/ManReader2.png
[i2]: /images/2023/ManReader2_dark.png
[i3]: /icons/ManReader128.png
[2]: /manreader/
[3]: http://itunes.apple.com/app/man-reader/id522583774?mt=12
[8]: mailto:sarah@troz.net?subject=Man%20Reader%202
[contact]: /contact/
