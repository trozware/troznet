---
title: 'SwiftUI Lists'
date: 2024-11-01T13:26:26+10:00
draft: true
description: 'Performance of lists on macOS sequoia has improved, if you set them up right.'
tags: ['swift', 'swiftui', 'mac']
---

In SwiftUI Mac apps, the performance of lists with a lot of data has always been a problem. iOS apps appeared to load list rows lazily, but Mac apps did not. In my [Man Reader][1] app, I follow a very common pattern of having a list of selectable `man` pages in the sidebar with a detail view that shows the selected page. The problem was that the list probably had at least 10,000 items and it could have nearly 30,000. Performance was terrible when I tried to do this in SwiftUI - the list took ages to display and both scrolling and selection were unusably unresponsive. I worked-around this by using AppKit's `NSTableView` instead and got great performance, although I do see a few crashes appearing with the table view trying to draw non-existent rows.

With macOS Sequoia, SwiftUI Lists are improved, although they're still not great, but I recently learned a trick that makes everything much better.

<!--more-->

I started with a sample app that displayed 10,000 rows in the sidebar of sidebar of a `NavigationSplitView`:

```swift
struct ContentView: View {
  @State private var listData: [Int] = []
  @State private var selectedRow: Int?

  var body: some View {
    NavigationSplitView {
      List(listData, id: \.self, selection: $selectedRow) { rowIndex in
        RowView(index: rowIndex)
      }
    } detail: {
      if let selectedRow {
        Text("You clicked row \(selectedRow)")
      } else {
        Text("Click any row to select.")
      }
    }
    .task {
      generateData()
    }
  }

  func generateData() {
    listData = Array(1 ... 10_000)
  }
}

struct RowView: View, Equatable {
  let index: Int

  var body: some View {
    Text("Row #\(index)")
  }
}
```

Running this in the app, I saw the window very quickly, but then the CPU on my M3 iMac was stuck at 100% for over 50 seconds before the list appeared. Selecting a row or scrolling by any non-trivial scroll zapped the CPU up to 100% again for 20 - 30 seconds. This is not usable.

I added some logging to `RowView` and found that all 10,000 row views were initialized on startup - twice, for reasons that escape me. But the slow part was the list drawing all 10,000 row views, even though only about 15 were visible. Changing to using a `ForEach` inside the list made no difference.

Then I read a thread on [Mastodon][2] where someone mentioned that they had solved this problem in an unexpected way, using `equatable`. So I conformed `RowView` to the `Equatable` protocol like this:

```swift
struct RowView: View, Equatable {
  let index: Int

  var body: some View {
    Text("Row #\(index)")
  }
}
```

And when calling it from the `List`, I added the `equatable` modifier:

```swift
List(listData, id: \.self, selection: $selectedRow) { rowIndex in
  RowView(index: rowIndex)
    .equatable()
}
```

My logging now showed that the app initialized all 10,000 row views on startup, but this took less than 0.1 of a second. The key point was that the row views were not drawn until they were scrolled into view. The list was now usable, and scrolling was smooth. Making selections or scrolling long distances bumped the CPU up to 25 - 30% usage, but I could only detect that in the debugger, not in the feel of the app.

The docs say that the `equatable` modifier:

> Prevents the view from updating its child view when its new value is the same as its old value.

So I'm guessing this is what is happening here. The list is not drawing all the rows at once, because only the visible ones have changed in any way.

Further on in the Mastodon thread, [Curt Clifton][3] suggested that the bad performance was only a problem in debug builds, not in release builds. To test this, I created a second scheme and set it to run using the **Release** build configuration:

![Release Scheme][i1]

The performance in this scheme was very similar to when using the `equatable` modifier in the debug build. Removing the `equatable` modifier in the release build made no difference, so Curt is correct and this is a debug build issue. However, as developers, we spend more time in debug builds than release builds, so this is still a very useful trick.

While I am sure there will be more debates about this, my current position is that when building an app with a large list in SwiftUI, I will now always conform my row view to `Equatable` and use the `equatable` modifier when calling it from the list. It seems to add no overhead in the release build and makes the app much more usable when working on it.

Now I just have to see whether this trick is enough to let me switch Man Reader to a SwiftUI list, which might stop the crashes I am seeing with the `NSTableView`.

If you have any other thoughts or suggestions, I'd love to hear them. You can contact me using one of the links below or through the [Contact][contact] page. And if you found this, or any of my articles useful, please [buy me a coffee][kofi].

[contact]: /contact/
[kofi]: https://ko-fi.com/trozware
[1]: /manreader/
[2]: https://iosdev.space/@babbage/113223944895124685
[3]: https://indieweb.social/@curtclifton/113273571392595819
[i1]: /images/2024/release_scheme.png
