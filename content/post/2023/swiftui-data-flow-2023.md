---
title: "SwiftUI Data Flow 2023"
date: 2023-06-27T09:04:07+10:00
draft: true
description: 'Various ways to pass data around your SwiftUI apps, after WWDC 2023.'
tags: ['swift', 'swiftui']
toc: true
---

SwiftUI is a reactive framework where the data drives the UI. In 2019, I wrote a [post][1] detailing how I managed the various forms of data flow through a SwiftUI app, and with the help of others in the community, I iterated over this until I had a good understanding of the concepts and which method you should use when. In 2021, I updated the post to cover the minor changes, but there have been no major advances since then.

At WWDC 2023, things changed a lot! With the introduction of Swift macros, the SwiftUI team was able to reduce the number of property wrappers need to send data around and remove a lot of boilerplate code.

For this article, I have re-written my sample app as a Mac app and updated it to use the new data macros.

<!--more-->

If you would like to follow along, the code is available on [GitHub][2]. It requires macOS 14 and Xcode 15. Currently I'm using macOS 14.0 beta 2 and Xcode 15.0 beta 2, but I will update this article with any changes as we work through the beta cycle.

In the WWDC talk on [Discover Observation in SwiftUI][3], Apple showed the following flow chart:

![Apple's flow chart][i1]

This is a good starting point, but for me, it is too limiting, so I've made my own:

![My flow chart][i2]

There are really only two additions to my chart: if a view property doesn't need to change, it can be a `let`. And `@Bindable` only works for classes. The equivalent for structs or primitive data types is still `@Binding`.

My chart doesn't really show this, but `@Environment` is also restricted to classes.

The new macros system removes:

- @ObservableObject
- @ObservedObject
- @EnvironmentObject
- @Published

[1]: /post/2019/swiftui-data-flow/
[2]: https://github.com/trozware/swiftui-data-flow-2023
[3]: https://developer.apple.com/wwdc23/10149

[i1]: /images/apple_data_flow.jpeg
[i2]: /images/my_data_flow.png