---
title: "SwiftUI for Mac Extras"
date: 2020-01-27T11:32:57+10:00
draft: false
description: ""
tags: ['swift', 'swiftui', 'mac']
---

Last year, I wrote a 3 part series of articles on [using SwiftUI to build a Mac][1] app. I would like to thank everyone who contacted me about this series. It was received very well and revealed that there is still a large amount of interest in programming for the Mac.

Some of the responses I got were pointing out different or better ways to do things, so I am going to list them here, adding to this post as I get new information. The relevant sections in the original posts will have links to the fixes suggested here, but I decided it was easier to list the changes in a separate post, rather than asking people to re-read the whole series looking for modifications.

<!--more-->

---

## Dismissing sheets 

> I just read your series on writing Mac apps with SwiftUI. Great stuff!
Just wanted to add that in part 2 when dismissing sheets there are two ways to do that, one of them is the one that you figured out and the other is to have the view dismiss itself by grabbing its PresentationMode from the environment. This way you don’t need to pass presentation bindings to your sheet views. 

Paul Hudson of Hacking with Swift explains how to use both methods very clearly in his article on [How to make a view dismiss itself][2].

My [original technique][5] passed the Boolean that triggered the sheet to appear, as a Binding to the sheet view. The sheet view could then toggle this to make the parent view dismiss it.

```swift
  .sheet(isPresented: $sheetIsShowing) {
      SheetView(isVisible: self.$sheetIsShowing)
  }
```

```swift
struct SheetView: View {
    @Binding var isVisible: Bool

    var body: some View {
        VStack {
            Text("This is a sheet.")
            Button("OK") {
                self.isVisible = false
            }
        }
        .frame(width: 300, height: 150)
    }
}
```

The presentation mode method leaves it up to the sheet to dismiss itself. The parent view shows the sheet but does not pass any binding.

```swift
  .sheet(isPresented: $sheetIsShowing) {
      SheetView()
  }
```

The sheet view gets an environment property that it can use to change its presentation mode, dismissing itself that way.

```swift
struct SheetView: View {
    @Environment(\.presentationMode) var presentationMode

    var body: some View {
        VStack {
            Text("This is a sheet.")
            Button("OK") {
                self.presentationMode.wrappedValue.dismiss()
            }
        }
        .frame(width: 300, height: 150)
    }
}
```

I guess the presentation mode method is slightly easier to understand and it leaves the caller of the sheet view less cluttered which is a good thing. But the two methods are functionally identical, so use whichever you prefer. The sample project now contains both methods, with one commented out, so you can swap the comments to test.

---

## Subscribing on the Main Thread

In [part 2 of this series][6], I created a menu item caused the downloaded image to be flipped. Selecting the menu item posted a notification:

```swift
    @IBAction func flipImage(_ sender: Any) {
        NotificationCenter.default.post(name: .flipImage, object: nil)
    }
```

which the view showing the image was listening for. 

```swift
    private let flipImageMenuItemSelected = NotificationCenter.default
        .publisher(for: .flipImage)
```

The outermost component of the view's body used an `onReceive` modifier to get this notification and react accordingly.

```swift
  var body: some View {
      VStack {
        // layout omitted for brevity
      }
      .onReceive(flipImageMenuItemSelected) { _ in
          DispatchQueue.main.async {
              self.imageIsFlipped.toggle()
          }
      }
    }
```

Since the notification was triggering a change to the UI, I made sure that this happened on the main thread.

But it was pointed out to me that it would be easier to make sure that the publisher was set up to use the main thread all the time, instead of having to specify the main queue when processing the notification.

So now the publisher is defined like this:

```swift
  private let flipImageMenuItemSelected = NotificationCenter.default
      .publisher(for: .flipImage)
      .receive(on: RunLoop.main)
```

And the `onReceive` modifier can toggle the `imageIsFlipped` flag directly, without having to worry about the thread.

This seems to me a much better solution as it sets the correct thread once when the publisher is created and makes using it much cleaner and easier.

---

## Passing data back from AppKit

The previous two changes have been more a matter of style, but this one is a real error that would stop an app working as it should.

In [the User Interface Elements section of the series][7], I used `NSViewRepresentable` to embed a standard `NSColorWell` in a SwiftUI view. I thought this was working properly, but then I got this email:

> I noticed that the selectedColor in the EmbeddedColorWell is not being mutated and is not being used in a two-way manner. The selectedColor is initialized to NSColor.blue and used to set the color in the NSColorWell view. When the NSColorWell color is changed, it does change the color of the EmbeddedColorWell view. However, the actual @State var selectedColor value is never mutated in this process beyond the initialized value of NSColor.blue.

This is in the Form tab of the UI Samples window. As suggested to me, I added a `background` modifier to set the background of a portion of the view to the selected color. And although the NSColorWell showed newly selected colors, the background remained stubbornly blue.

The solution was to add a `Coordinator` to the `NSViewRepresentable` and have it subscribe to any changes in the color and update the embedded view's selected color as needed. I would not have come up with this by myself, so many thanks to the person who sent it to me.

Here is the full code for the `EmbeddedColorWell` struct:

```swift
struct EmbeddedColorWell: NSViewRepresentable {
    @Binding var selectedColor: NSColor
    
    class Coordinator: NSObject {
        var embedded: EmbeddedColorWell
        var subscription: AnyCancellable?

        init(_ embedded: EmbeddedColorWell) {
            self.embedded = embedded
        }
        
        // Observe KVO compliant color property on NSColorWell object.
        // Update the selectedColor property on EmbeddedColorWell as needed.
        func changeColor(colorWell: NSColorWell) {
            subscription = colorWell
                .publisher(for: \.color, options: .new)
                .sink { color in
                    DispatchQueue.main.async {
                        self.embedded.selectedColor = color
                    }
            }
        }
    }
    
    func makeCoordinator() -> EmbeddedColorWell.Coordinator {
        Coordinator(self)
    }
    
    func makeNSView(context: Context) -> NSColorWell {
        let colorWell = NSColorWell(frame: .zero)
        context.coordinator.changeColor(colorWell: colorWell)
        return colorWell
    }
    
    func updateNSView(_ nsView: NSColorWell, context: Context) {
        nsView.color = selectedColor
    }
}
```

In the previous section, I changed the publisher to use the main RunLoop so as to avoid having the use `DispatchQueue.main.async`. In this instance, that did not work so well. It only updated the selected color after the mouse had been released. But using `DispatchQueue.main.async` made the update live.

---

As I explained at the start of these articles, I was documenting my explorations in using SwiftUI for a Mac app and while I hoped there would be some useful examples, this was not intended to be a definitive guide. So I am very grateful to everyone who has contributed to these updates.

If you have anything more that you would like to be included, please contact me using one of the contact buttons below or through the [Contact page][3] on this site.

The edited project is available on [GitHub][4].

[1]: /post/2019/swiftui-for-mac-1/
[2]: https://www.hackingwithswift.com/quick-start/swiftui/how-to-make-a-view-dismiss-itself
[3]: /contact/
[4]: https://github.com/trozware/swiftui-mac
[5]: /post/2019/swiftui-for-mac-3#sheets
[6]: /post/2019/swiftui-for-mac-2#passing-menu-data-to-a-view
[7]: /post/2019/swiftui-for-mac-2#user-interface-elements