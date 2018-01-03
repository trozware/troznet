---
date: 2016-03-30T00:00:00Z
lastmod: 2018-01-03T19:53:00+10:00
tags:
- swift
- learning swift
- oop
- class
- struct
title: Structs vs Classes
---

One of the big debates among Swift developers is when to use `structs` and when
to use `classes`.

Classes are the building blocks of object-oriented programming
but structs as provided by Swift are newly powerful. Structs have been around in
C-based languages for a long time, but Swift has made them more powerful and
given them more features so that they are almost indistinguishable from classes.
So what are the differences and which one should you use?

---

## Where they are the same?

* both can define initializers
* both can define properties
* both can define methods
* both can conform to protocols

## Where they are different?

* classes can inherit from other classes
* structs cannot inherit from other structs
* classes are reference types
* structs are value types

---

The reference type vs value type difference is where things really get
interesting. Have a look at this example of a class with a single property:

```swift
class PersonClass {
    var name: String

    init(name: String) {
        self.name = name
    }
}

var personA = PersonClass(name: "Woody")
personA.name // Woody

var personB = personA
personB.name = "Buzz"
personB.name // Buzz
```

That looks like standard stuff, but what do you think `personA`'s name is now?
If you guessed "Buzz" then you win a prize! _(No, not a real prize - pat
yourself on the back.)_

This is because when we created the `personB` variable and assigned `personA` to
it, we did not assign the **VALUE** of `personA`, we assigned a **REFERENCE** to
`personA` - actually the address in memory of `personA` rather than the data
inside.

So now we have two objects and they are both looking at the same spot in memory
for their data. This means that changing the name of `personB` changed the name
of `personA` as well.

Let's try the same thing with a struct:

```swift
struct PersonStruct {
  var name: String
}

var personC = PersonStruct(name: "Rex")
personC.name // Rex

var personD = personC
personD.name = "Hamm"
personD.name // Hamm

personC.name // Rex
```

This time, because we are using a struct, when we assign `personC` to the new
`personD` variable, we are actually making a copy of `personC` and setting the
values of `personD` to this new copy. So now we can change `personD` without
messing with `personC`.

Note that I did not have a define an `init` for the struct because it creates
one automatically. You can still add one yourself if you want to do anything
different, but you do not have to.

---

At first glance, you may think that you should now use structs all the time to
avoid these unintended consequences, but it isn't quite as simple as that.
Sometimes a class is still the best thing to use.

The inheritance capabilities of classes can make your decision simple: if you
need to create a button and want to start by sub-classing UIButton or NSButton,
then your button must be a class, not a struct. This will apply to most user
interface objects.

Apple really wants us to use structs and in the Swift standard libraries, a very
high percentage of the objects are structs. But structs are especially well
suited to a certain subset of objects.

The best explanation that I have found of when to use a struct is the [Jeff Trick][1]. Reduced down, the rule is:

> If you can overload == to compare two instances of your object, use a struct.
> <br> If this doesn't make sense, use a class.

So use structs for your things: Person, Shape, Brick, Cat. <br> Use classes for
everything else.

I would add one caveat: don't fight the compiler. If using a struct is giving
lots of errors and warnings, change to a class.

---

A logical consequence of this is that all structs should conform to the
[Equatable][2] protocol.

Extending `PersonStruct` to make it conform just requires a single function:

```swift
extension PersonStruct: Equatable {
  static func == (lhs: PersonStruct, rhs: PersonStruct) -> Bool {
    return lhs.name == rhs.name
  }
}
```

Since this struct only has one property, we can say that two instances of this
struct are equal if the names are equal.

Testing this, we can see:

```swift
var personC = PersonStruct(name: "Rex")
var personD = personC
personD.name = "Hamm"

personC == personD // false

let personE = PersonStruct(name: "Rex")
personC == personE // true
personC != personE // false
```

Conveniently, providing an `==` function effectively gives us a `!=` function
for free as you can see from the last example.

---

There is one final point I would like to make about struct and that concerns
mutating functions. Look at what happens if we include a function that changes
the `name` property in the struct:

![Mutating error][3]

Fix-it is very helpfully pointing out that the method needs to be marked as
`mutating` for this to work and is showing where this should go. Accepting the
suggestion will get rid of the error and then the name can be changed using this
method.

```swift
struct PersonStruct: Equatable {
    var name: String

    mutating func changeName(to newName: String) {
        if !newName.isEmpty {
            name = newName
        }
    }
}

var personC = PersonStruct(name: "Woody")
personC.name // Woody

personC.changeName(to: "Sid")
personC.name // Sid
```

There is no problem about using `mutating` and it will not have the unintended
consequences of using classes. Despite the scary name, a mutating function
actually returns a new copy of the struct.

The problem arises if you have many nested structs and the mutating has to
spread through the list. So don't nest your structs - at least not more than two
deep!

[1]: http://faq.sealedabstract.com/structs_or_classes/#an-alternative-hypothesis
[2]: http://swiftdoc.org/v2.2/protocol/Equatable/
[3]: /images/mutating.png
