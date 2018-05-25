---
title: "App Updates"
date: 2018-05-26T09:22:57+10:00
lastmod: 2018-05-26T09:22:57+10:00
draft: false
description: ""
tags: ["app store", "apps", "mac", "ios"]
toc: true
---

Just a quick post to let you know about some recent app updates...

<!--more-->

## Man Reader

[Man Reader v 1.10][2] was released on 11 May 2018.

I had to update [Man Reader][1] in November 2017 because of a really strange "feature" that arrived with macOS High Sierra. Man Reader displays the man pages as HTML which allows the tabs and internal links to work using anchor tags. These had worked for years, but under High Sierra, they just stopped working.

I eventually discovered that it was because I was loading the text directly into the WebView using:

```objectivec
[self.web.mainFrame loadHTMLString:manText baseURL:nil];
```

With no baseURL, the anchor links were all defaulting to `about:blank` and going nowhere. The solution was to save the text to a temporary file and then load using:

```objectivec
NSURLRequest *request = [NSURLRequest requestWithURL: tempFile];
[self.web.mainFrame loadRequest: request];
```

Needless to say, this took me ages to work out, including a lengthy excursion into using `WKWebView` to see if the more modern web view would solve the problem.

The second update (May 2018) was in response to a crash report from a user. I had great difficulty tracking this one down and even now, I cannot see how it can have happened, but it was in relation to the utility apps that are displayed in the toolbar.

For each app, Man Reader checks to see if the app bundle exists, then it checks for a bundle identifier. It appears that this can come back as nil which I had not realised. And trying to insert an item with a identifier of `nil` into the toolbar caused a crash.

As you can see from the code, ManReader is written in Objective-C. Going back to Objective-C from Swift is painful! And I know that this crash could not have happened if the app had been written in Swift as the identifier would have been an optional and I would have been forced to check that it was not nil before using.

On the plus side, Objective-C apps are tiny in comparison to Swift apps. And the Mac App Store review process set a new record for me. I submitted the app at 10:58 am and it was on sale at 12:03 pm the same day - 66 minutes from start to finish.

---

## Sequenza VII

The other app that I updated recently is [Sequenza VII][4]. Version 1.2 was released on 23 April 2018.

This is an app with a very limited audience - specifically oboe players who want to learn to play Berio's weird music. However Apple sent me a notice saying that as it hadn't been updated for ages, it would be removed from the store within 30 days unless I did something.

Updating it to use the iPhone X display was surprisingly difficult. I set the minimum system version to 11.0 and changed the storyboards to use the latest Xcode but the horns on either side of the notch were still being left blank. In the end, the trick I found was to create a new Launch storyboard - that seemed to fool the system into re-considering all the layouts.

[1]: /manreader/
[2]: http://itunes.apple.com/app/man-reader/id522583774?mt=12
[3]: /berio/
[4]: https://itunes.apple.com/us/app/sequenza-vii/id730234638?mt=8&uo=4
