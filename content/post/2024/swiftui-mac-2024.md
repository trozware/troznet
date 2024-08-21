---
title: 'SwiftUI for Mac 2024'
date: 2024-08-20T15:23:01+10:00
draft: true
description: 'Mac app development using SwiftUI on macOS Sequoia'
tags: ['swift', 'swiftui', 'mac']
---

Over the years, I have written apps and accompanying articles, demonstrating the new features of each years SwiftUI updates with particular emphasis on macOS app development. Last year, the major update to SwiftUI was the new data flow system using the Observation framework. I covered that in my article [SwiftUI Data Flow 2023][1] but I didn't feel there were sufficient UI changes to warrant an update of my usual sample app.

This year, the HTTP Cats app is back! And I'll cover new features from WWDC 2023 and WWDC 2024.

<!--more-->

It's currently August 2024 and I am running macOS Sequoia 15.1 Beta (24B5024e) with Xcode 16.1 beta (16B5001e). Things may well change, but this is what work right now.

Here are the new or changed features that I intend to discuss:

- Xcode
- Previews
- Windows
- Tabs
- Charts
- Colors and gradients
- SF Symbols

### Xcode

When you create a new project in Xcode 16.1, the second item in the project navigator is now a folder instead of a group. This sounds trivial, since it really is a folder in Finder but I find it really annoying because it doesn't allow me to arrange my other files and folders as I want them. To fix this, right-click on the folder and select **Convert to Group**. The icons switches from blue to gray and you can now once again drag to re-order.

The next thing to look at in Xcode is **Predictive Code Completion**. While the Xcode betas run on macOS Sonoma, predictive code completion requires Sequoia. We do not yet have the promised Swift Assist which is supposed to allow for a more detailed way of asking Xcode to write code. But the code completion is supposed to be better.

I've used GitHub Copilot for writing JavaScript for a couple of years now and overall, it works well. Xcode has a way to go to catch up yet. Surprisingly, it suffers from one of the same problems as Copilot - it appears to have been trained on old code.

I know some people are very negative about using any form of AI to write parts of your code, but I see it as just another tool to help us be more efficient. For example, I bet you've written code to download and process JSON many, many times. Why not let Xcode write that for you? you still have to do the thinking? What's the URL? Which properties do I need? How am I going to use the data? But you don't have to write the boilerplate. It's similar to using a library or a pre-built function.

I put the predictive code completion to the test by creating a new Swift file called Networker. I set up a Networker class and gave it a web address. Then I started to write a fetch function:

![Predictive Code Completion 1][i1]

It used the address to deduce that I was downloading quotes - not unreasonable. i pressed tab to accept this and got the next chunk:

![Predictive Code Completion 2][i2]

After a few more tabs, I ended up with this:

![Predictive Code Completion 3][i3]

This doesn't build and it uses old-style completion handlers instead of async/await. The biggest problem I see is that it's fallen into the usual URLSession trap and not called `resume` on the task. So this was never going to download anything.

I started to define a NetworkError enum and it filled in the cases it had used, so that was really good. When I started to define a Quote struct, it also added some reasonable properties, as well as marking it as conforming to Codable - bonus points there.

When I tried to build, I got sensible warnings pointing out that I had not used either `task` or `data`. This would have reminded me to call `resume` if I hadn't already noticed. I also got a Swift 6 concurrency warning about the completion handler.

So overall, not great yet. Old technology and a flawed implementation. One of the points Apple people made at WWDC 2024 was that these code tools would be trained on the latest Apple APIs. This is not the case here, but I'm still running a beta, so I'll give them the benefit of the doubt for now. I'll definitely be keeping an eye on this feature and hope to be able to make good use of it in the future.

Before I move on from Xcode, there's one more feature I want to mention and that's the new options for creating a new file. If you press **Command-N**, you get the file template chooser, just as before. But now there are other possibilities. you can use the File menu or the right-click menu to add a new file, but the one I like best is the ability to make new files from the clipboard. I don't know about you, but when I'm working on a swiftUI project, I'll often pout more than one view into a single file, especially if I've created it by extracting a subview. Later on, I'll want the view to have it's own file.

I had a view called MeshBackground in another file, so I selected the entire struct and pressed Command-X to cut it out. Then the contextual menu and the File -> New menu offered me **New "Meshbackground.swift" from Clipboard**. When I selected this, it added the file, named it and pasted in my struct. The only thing I had to do was to add the import SwiftUI statement at the top of the new file. I think it could have been smart enough to work this one out, but maybe later.

This is a great time-saver and will really encourage me to keep my code well-organized.

### Previews

Last year, we got the `#Preview` macro which made SwiftUI previews a lot neater. we went from:

```swift
struct SidebarRowView_Previews: PreviewProvider {
  static var previews: some View {
    SidebarRowView(code: "418", title: "I'm a teapot")
  }
}
```

To this:

```swift
#Preview {
  SidebarRowView(code: "418", title: "I'm a teapot")
}
```

Much cleaner and neater. Xcode 15 had a converter you could use to switch to the new format, but Xcode 16.1 does not. I'm not sure why they removed it, but it's not a big deal to do it manually.

The new thing this year in previews is the `@Previewable` macro which lets us provide data to a preview. This is especially useful for binding properties. As an example, in Si debarView.swift in the sample app, I show the old style:

```swift
SidebarView(httpSections: HttpSection.localData, selectedStatus: .constant(nil))
```

selectedStatus is a Binding, so I can't just pass in nil. I had to use `.constant` to create a Binding set to nil. With `@Previewable`, I can do this:

```swift
@Previewable @State var selectedStatus: HttpStatus? = nil
SidebarView(httpSections: HttpSection.localData, selectedStatus: $selectedStatus)
```

I expected to be able to supply an actual HttpStatus here and have it start as the selected item in the list, but although it compiled fine, it didn't show up as selected in the preview initially. But I am now able to change the selection in the preview.

### Windows

This is the biggie in this years release.

### Tabs

The syntax for defining tabs got what appears to be quite a minor upgrade, but it feels so mush better. Here's the old syntax:

```swift
TabView {
  ChartSamplesView().tabItem {
    Text("Chart")
  }
  FormSamplesView().tabItem {
    Text("Form")
  }
}
```

My problem with this was that it felt backwards to me. The label of the tab itself is in the closure and the view that the tab leads to is first, with a `tabItem` modifier.

the same tab view now looks like this:

```swift
TabView {
  Tab("Chart", systemImage: "chart.bar.doc.horizontal") {
    ChartSamplesView()
  }
  Tab("Form", systemImage: "list.bullet.clipboard") {
    FormSamplesView()
  }
}
```

This suits my brain much better. I define the tab first and then use the closure to say what it will show. The only issue I have with this is that it has not considered Mac tabs which are mostly text only. You must specify an image for the tab, even when it won't appear. Note that in than app's Settings view, the tabs are different and will show an image, but not in a conventional Mac window.

Ok, the image CAN appear in a conventional Mac window if you style the tab view differently. If you add a `.tabViewStyle` modifier to a tab view, you can set it to either `automatic`, `grouped`, `sidebarAdaptable` or `tabBarOnly`. On macOS, the default is `automatic` which looks to be the same as `tabBarOnly`. The grouped option is marked as being in beta, but it looks very familiar. It moves the tabs down so they are more like part of the content. The new one is `sidebarAdaptable` which moves the tabs to the sidebar And shows the images. I think this would only be useful if you had a long list of tabs that wouldn't fit horizontally.

In the sample app, open SamplesView.swift and test the different tab styles to see what you think. I've added the two non-standard options there commented out so you can try them in the preview.

### Charts

Last year, Swift Charts got a pie or donut option. This year, the charts team added vector and function plotting. In **ChartSamplesView.swift**, I have three different charts: a bar chart as before, a pie chart and a line chart that plots various sine waves. My understanding is that the Plot charts are great for large data sets but for more comprehensive information, check out the WWDC presentation: [Swift Charts: Vectorized and function plots][2].

In my samples, I have a separate computed property for each of the three chart types, with a `@ViewBuilder` property to return the correct chart. I've also updated the chart image export to use SwiftUI's `fileExporter` instead of the AppKit's `NSSave`. I had a slight issue with fileExporter. I started off by including the image content type when configuring the exporter. This gave **generic error** when I tried to save - not the most helpful of messages. I removed the content type and it worked fine. I'm not sure if this is a bug or a feature.

### Colors and gradients

[1]: /post/2024/swiftui-mac-2024.md
[2]: https://developer.apple.com/wwdc24/10155
[i1]: /images/predictive_code_1.png
[i2]: /images/predictive_code_2.png
[i3]: /images/predictive_code_3.png
