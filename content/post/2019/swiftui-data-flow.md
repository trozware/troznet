---
title: 'SwiftUI Data Flow'
date: 2019-09-16T08:47:57+10:00
lastmod: 2019-10-23T18:06:44+10:00
draft: false
description: 'Various ways to pass data around your SwiftUI apps.'
tags: ['swift', 'swiftui']
toc: true
---

{{< img_center >}}

[SwiftUI][1] gives us a completely new way to lay out out user interfaces, in a declarative and responsive way. Your data dictates what is displayed. But this leads to a new problem - how should the data models be constructed and how can they be passed around between the various views that make up your app?

In this post, I intend to discuss the possibilities with examples.

<!--more-->

At WWDC 2019, some Apple engineers gave a great presentation on [Data Flow Through SwiftUI][2] and I strongly recommend watching the video. But you need to watch it twice. First watch it so that you can get started, and then, when you feel that this is all way too complicated, watch it again and it will start to click into place. The only real difference between then and now is that BindableObject has become ObservableObject.

I guess I could stop there, but I will be illustrating my ideas with code examples, which I hope will make things clearer. Some of the examples are rather contrived in order to make a point, but the sample code is also sprinkled with other SwiftUI examples which I hope will prove useful.

[Download the sample project from GitHub][4] and open it in Xcode. Go to ContentView.swift and make sure the Canvas is open. Click Resume to make the view appear. Then click the Live Preview button and wait for the view to become active. I recommend clicking the Pin button at the bottom left of the Canvas so that you can investigate the code samples, while still working in the main navigation.

## Data Flow Options

There are 5 ways to specify data in SwiftUI:

- Property
- @State
- @Binding
- ObservableObject & @ObservedObject
- @EnvironmentObject

![Content View][2i]

## Property

```swift
struct Property: View {
    // Property
    let greeting = "Hello from SwiftUI!"

    var body: some View {
        // Using property directly
         Text(greeting)
             .font(.title)
    }
}
```

In this example, the `greeting` property is used in the view. `greeting` is static, so the view does not need to monitor it for changes. This may seem like a simplistic and obvious example, but separating it out allows for localization or re-usability. The property could also have been supplied by a parent view. And it is important to remember that not everything needs to be bound to the UI in a new way.

## @State

This is where things start to get very interesting in the SwiftUI world. SwiftUI views are contained in structs, so are non-mutable. Also, the views are re-created every time the data changes, so any properties are re-created then too. By marking a property with the `@State` property wrapper, you are telling SwiftUI that you want it to keep this data in a separate portion of memory, allow it to be mutated, and preserve the current value during the view refresh.

```swift
struct UsingState: View {
    @State private var toggleValue = true

    var body: some View {
        // Using state with 2-way binding
         Toggle(isOn: $toggleValue) {
             Text("Toggle is \(self.toggleValue ? "ON" : "OFF")")
         }
         .padding(50)
    }
}
```

In this example, `toggleValue` is declared as a `Bool` with a property wrapper of `@State`. Inside the `Toggle`, the `isOn` value is bound to `toggleValue` by the leading `$`. This allows the variable to set the toggle and the toggle to set the variable - 2-way binding.

![Toggle][7i]

`@State` variables are always value types and are usually local to their view, so Apple recommends marking them as `private`.

## @Binding

One problem with building SwiftUI views is that it is very easy to end up with a gigantic Pyramid of Doom as you embed views within views within views. The solution is to extract subviews, but then you need a way to pass the data to the subview.

This is where `@Binding` comes in as it allows you to tell a view that a property is actually coming from a parent and changes to that property should be passed back to the parent.

```swift
struct Numbers: View {
    @State private var stepperValue = 0

    var body: some View {
        NumberChooser(stepperValue: $stepperValue)
    }
}

struct NumberChooser: View {
    // Using state from parent with 2-way binding
    @Binding var stepperValue: Int

    var body: some View {
        ZStack {
            VStack {
                Stepper(value: $stepperValue, in: 0...20) {
                    Text("Value = \(stepperValue)")
                }

                NumberBlock(stepperValue: stepperValue)
            }
        }
    }
}

struct NumberBlock: View {
    // As this view never changes the value, there is no need to bind it
    var stepperValue: Int

    var body: some View {
        Image(systemName: "\(stepperValue).square")
    }
}
```

In this example, I have declared a `stepperValue` property and marked it with `@State`.

The interface has been extracted into a subview called `NumberChooser` and this property has been passed to `NumberChooser` using the `$` prefix to ensure that changes to the value can come back. Inside `NumberChooser` this property is wrapped in the `@Binding` property wrapper to indicate that it is coming from another source and that changes should be returned.

`NumberChooser` itself has a subview called `NumberBlock` but it is a display view only and never mutates the value itself, so `stepperValue` is passed to this subview as a propertry only, without the `$` prefix. It will still be updated every time the data changes as it is contained by the view with the `@State` property.

![Number CHooser][3i]

## @State & @Binding - Part 2

So far, the examples have used primitve data types for the @State properties, but given that `@State` properties are value types, any struct can be used. In the next example, I use a struct to hold the properties of a pizza order and use a SwiftUI Form to allow selections.

```swift
struct PizzaView: View {
    // Using @State for a struct
    @State private var pizza = Pizza()

    var body: some View {
            VStack {
                Form {
                    // Using 2-way binding but each component
                    // only needs 1 property from the struct
                    PizzaNamePicker(selectedPizzaName: $pizza.name)
                    PizzaSizePicker(selectedPizzaSize: $pizza.size)
                    PizzaCrustPicker(selectedPizzaCrust: $pizza.crust)
                }

                // Text representation to prove that the
                // subviews are modifying the parent struct
                Text(pizza.pizzaSelection)
             }
            .navigationBarTitle("Choose Your Pizza")
    }
}
```

Each subview gets the property it needs using `@Binding`:

```swift
struct PizzaNamePicker: View {
    @Binding var selectedPizzaName: PizzaName

    var body: some View {
      // see the GitHub project for more details
    }
```

The form consists of 3 subviews - one each for selecting the pizza, size and crust. The Pizza struct holds all three properties, but each subview only needs to have a link to the single property that it controls. The Text view after the Form is to prove that all the selections come back to the parent.

![Pizza View][4i]

## ObservableObject & @ObservedObject - Part 1

These are used if your data model is a class and you want to use reference-based data instead of the struct's value-based system.

To set up a data model to be Observable, it must conform to the `ObservableObject` protocol and any property that needs to be observed should have the `@Published` property wrapper. This makes sure that any time this property changes, all the Views that are observing the instance of this data model will be notified to perform the UI updates.

For this example, I have a ColorSet class with six color components that are used to assemble two RGB colors.

```swift
class ColorSet: ObservableObject {
    // ObservableObject
    // The 6 color components are marked as @Published so any changes
    // get published to the views that are observing

    @Published var foregroundRed = 0.0
    @Published var foregroundGreen = 0.0
    @Published var foregroundBlue = 0.0

    @Published var backgroundRed = 1.0
    @Published var backgroundGreen = 1.0
    @Published var backgroundBlue = 1.0
}
```

In the primary view, I set up an instance of this class as an `@ObservedObject`.

```swift
struct ColorSetView: View {
    @ObservedObject private var colorSet = ColorSet()
}
```

The background of the view and the foreground of a system image are set using these colors. A button presents a sheet with sliders to allow editing these colors. The `colorSet` is passed to the sheet like this:

```swift
  .sheet(isPresented: $showChooser) {
      // notice that this does not use $ as the ColorChooser
      // will get a reference to the ColorSet object
      ColorChooser(colorSet: self.colorSet)
  }
```

```swift
struct ColorChooser: View {
    @ObservedObject var colorSet: ColorSet

    var body: some View {
        // ...
    }
}
```

A sheet is not the ideal way of presenting a view that uses sliders for editing, but I wanted to demonstrate that changing the sliders instantly changes the value of the `@ObservedObject` for the parent view as well as for the subview. Editing the background color components shows the new background color in the back at the top of the sheet.

The `ColorChooser` itself uses 2 subviews and they get a reference to the `ColorSet` in the same manner.

![Color Chooser][5i]

## ObservableObject & @ObservedObject - Part 2

This section was that one that caused me the most trouble when writing the example app. I wanted to display a list of data and have each entry link to an editable detail view with the edits flowing back to the parent list.

The initial display of data in a List was straight-forward and I was then able to have the list rows navigate to a detailed view for each entry. The problem was getting the edited data back to the parent List.

The basic data model was an `ObservableObject` that publishes an array of `PersonViewModel` objects.

```swift
class PersonListModel: ObservableObject {
    @Published var persons: [PersonViewModel] = []

    func fetchData() {
        // get data from web ...

        DispatchQueue.main.async {
            self.persons = newData
        }
    }
}
```

Since this data is going to trigger a UI update after a background network call, it is important that changes to the `@Published` property get switched to the main thread.

The `PersonViewModel` also needs to be `Observable` with the editable properties marked as `@Published`.

```swift
class PersonViewModel: Identifiable, ObservableObject {
    // Even though this is not observed directly,
    // it must be an ObservableObject for the data flow to work

    var id = UUID()
    @Published var first: String = ""
    @Published var last: String = ""
    @Published var phone: String = ""
}
```

The odd thing was the way that I had to pass the data to the detail view. This is what I tried initially:

```swift
  List {
      ForEach(personList.persons) { person in
          NavigationLink(destination:
              PersonDetailView(person: person)
          ) {
              Text("\(person.first) \(person.last)")
          }
      }
  }
```

And in `PersonDetailView`:

```swift
    @ObservedObject var person: PersonViewModel
```

This almost worked. The correct data was passed to the detail view, and the data edits changed the data, but the parent list was never re-drawn. If I changed a record's first name then went back to the list, the change was not displayed. But if I then returned to the detail view for the same record, my edits were there, so I could tell that the data was changing correctly. The problem was how to change it in such a way that the parent view was notified of the change.

Trying to bind `person` with `PersonDetailView(person: $person)` gave the error `Use of unresolved identifier '$person'`, so the `ForEach` enumeration did not provide a direct connection to the `personList` object.

The solution I came up with was to switch to enumerating by index in the `ForEach` and passing a direct member of the parent list's data to the detail view. And switching the `PersonDetailView` to use `@Binding var person: PersonViewModel`.

```swift
  ForEach(0 ..< personList.persons.count, id: \.self) { index in
      NavigationLink(destination:
          PersonDetailView(person: self.$personList.persons[index])
      ) {
          Text("\(self.personList.persons[index].first) \(self.personList.persons[index].last)")
      }
  }
```

![Person List View][6i]

Thanks to [JSON Generator][3] for the sample data. And if anyone has a better solution to this problem, I would love to hear it.

## @EnvironmentObject

Think of the EnvironmentObject as a piece of global state. People who have used React or any of the similar web development technologies will be familiar with the concept of global state and while we may have been conditioned to think of globals as **A Bad Thing**, in this case, they seem to work well.

You set up a class as an EnvironmentObject model exactly as you would set up an ObservableObject with the same protocol conformance and using the `@Published` property wrapper to mark properties whose changes will trigger UI updates. Here is a very simple example with just one property.

```swift
class UserSettings: ObservableObject {
    @Published var isLoggedIn: Bool = false
}
```

![Nested Views][1i]

In this example, the yellow view is the parent view - the different views have different brightly colored backgrounds to make them easy to distinguish. The yellow view has access to the `UserSettings` like this:

```swift
struct NestingViews: View {
    @EnvironmentObject var userSettings: UserSettings

    var body: some View {
        ZStack {
            Color.yellow.edgesIgnoringSafeArea(.all)

            VStack {
                // UI omitted for space reasons

                // display first nested view
                ChildView()
            }
        }
    }
}
```

The `ChildView` contained in this parent - the green view - has no need to access this data and so gets no `@EnvironmentObject` property. But `ChildView` contains another subview - the blue one. And this `GrandChildView` does need access to the `UserSettings` so it has the exact same `@EnvironmentObject var userSettings: UserSettings` property as the parent view.

If this was using `@ObservedObject` the data would have to be passed through every view in an un-broken chain, even though `ChildView` did not need this data. By using `@EnvironmentObject` the chain can be broken, but any view that needs to, can access and mutate this data. In the example, both the yellow and the blue views display and edit the same data with updates happening in both when either button is pressed.

One key thing to remember about previewing `@EnvironmentObject` in the Canvas is that every view that uses it, or that contains a view that uses it, needs to be supplied with the `ObservableObject` in the preview using `.environmentObject()`.

```swift
struct NestingViews_Previews: PreviewProvider {
    static var previews: some View {
        NestingViews()
            .environmentObject(UserSettings())
    }
}
```

In the app itself, only the first view to access the `@EnvironmentObject` needs it set. In this example, it is done in the `NavigationLink` that goes to the `NestingViews` example. The `.environmentObject` can be provided to the root view in the `SceneDelegate` if the root view needs it.

```swift
    NavigationLink(destination: NestingViews().environmentObject(UserSettings())) {
        ListContents(title: "@EnvironmentObject", imageNumber: 6)
    }
```

## Summary

Or What Should I Use When?

- For value-based data models or data primitives, use `@State`.
- For reference-based data use `ObservableObject`.
- For data needed by a lot of views in your app, use `@EnvironmentObject`.
- Use `@Binding` or `@ObservedObject` to pass data to a view that can mutate it.

And one final tip: while creating a view from scratch, use `@State` with sample, hard-coded data. Once you have the interface you want, then put in the links to give it real data.

I am sure people will develop their own theories and their own ways of using SwiftUI, but those are the guidelines that I intend to follow for now. If you have different views and would like to discuss them, please contact me.

[1]: https://developer.apple.com/xcode/swiftui/
[2]: https://developer.apple.com/videos/play/wwdc2019/226/
[3]: https://next.json-generator.com
[4]: https://github.com/trozware/swiftui-data-flow/tree/master
[1i]: /images/NestedViews.png
[2i]: /images/ContentView.png
[3i]: /images/NumberChooser.png
[4i]: /images/PizzaView.png
[5i]: /images/ColorChooser.png
[6i]: /images/PersonListView.png
[7i]: /images/Toggle.png
