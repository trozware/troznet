---
title: 'Moving to the Dark Side'
date: 2018-09-26T16:49:43+10:00
lastmod: 2018-10-01T15:01:32+10:00
draft: false
description: 'Upgrading Mac apps for macOS Mojave.'
tags: ['mac', 'app store']
toc: true
---

{{< img_border >}}

With the release of macOS Mojave on 24th September 2018, I have started updating my Mac apps, mainly to enable support for dark mode if appropriate.

And now I have updated this site too. Click the light bulb icon at the top right of the page to toggle between light and dark modes for this site.

<!--more-->

And with my apps, so far (1 st October 2018), I have updated [Icon Builder][1a], [World Time in Words][2a], [Dice Pass][3a] and [A Knight's Move][4a].

[![Icon Builder 5.1](/images/IconBuilder5.1.png)][1]

[![World Time in Words 3.2](/images/WTiW_dark.png)][2]

[![Dice Pass 3.2](/images/DicePass1.5.png)][3]

[![Knights Move 1.6](/images/KnightsMoveMac1.png)][4]

For A Knight's Move, I wanted to make sure the wood-look background didn't change, so I actually disabled dark mode.
For any developers looking for the way to do that, I added the following chunk to the `applicationDidFinishLaunching(_:)` method:

```swift
    if #available(OSX 10.14, *) {
        NSApp.appearance = NSAppearance(named: .aqua)
    }
```

Similar code could presumably be used to change the appearance of a running app. I may add the ability to switch to my apps later.

[1]: /icon-builder/
[2]: /time-in-words-for-mac/
[3]: /dicepass/
[4]: /knightsmove/
[1a]: https://itunes.apple.com/app/apple-store/id552293482
[2a]: https://itunes.apple.com/app/apple-store/id509085586
[3a]: https://itunes.apple.com/app/apple-store/id997688302
[4a]: https://itunes.apple.com/app/apple-store/id533321133
