---
title: 'macOS by Tutorials'
date: 2024-07-19T14:03:00+10:00
draft: false
description: 'New edition of macOS by Tutorials is coming soon.'
tags: ['mac', 'book', 'swift', 'swiftui']
---

In April 2022, Kodeco published the first edition of [macOS by Tutorials][1]. Nothing stays the same in the world of Apple development, so I started to plan an update after WWDC 2023. At around that time, Kodceo was going through a transformation from being like a library to being more of an educational institution. Their focus is now on multi-modal courses and they are no longer interested in publishing books.

Kodeco agreed to transfer the rights of the macOS by Tutorials book to me, since it was out-of-catalog and since then, I have been working on an update which is almost ready for release. I had hoped to have it out before WWDC 2024, but real-life has a habit of getting in the way, and that was not possible.

<!--more-->

Every project in this book has been updated to macOS 14 Sonoma and Xcode 15. They have also been tested using Xcode 16 beta 3.

{{< img_border >}}
{{< img_center >}}

![Book cover][i1]

The major changes in this edition include:

- The _On This Day_ app uses `NavigationSplitView` instead of the older `NavigationView`.
- _On This Day_ implements the new `Observation` framework for its data.
- The _Time-ato_ app no longer imports the external `LaunchAtLogin` package but now uses Apple's `ServiceManagement` library.
- Creating an app intent in _ImageSipper_ uses the new code-based system.
- The workflow for distributing your app has been updated to reflect the changes in App Store Connect and Xcode.

As I am now a self-publisher, I will be able to release more timely and incremental updates and will incorporate the latest changes to macOS, Xcode Swift and SwiftUI as they are released.

The book will be available at [Gumroad][2].

If you previously bought the book from either Kodeco or Amazon, please [email me][3] for a 50% discount code.
I am unable to provide a free update for the Kodeco version, but I will provide free updates subsequently for the self-published version.

To keep up-to-date with my books and other projects, please read my introduction and subscribe to my Gumroad [newsletter][4]. It will be very low volume, mainly about my own books.

[1]: https://www.kodeco.com/books/macos-by-tutorials
[2]: https://sarahreichelt.gumroad.com/l/oximx
[3]: mailto:books@troz.net?subject=macOS%20by%20Tutorials%20Discount
[4]: https://sarahreichelt.gumroad.com/p/welcome-to-sarah-s-books
[contact]: /contact/
[kofi]: https://ko-fi.com/trozware
[i1]: /images/mos_cover_small.png
