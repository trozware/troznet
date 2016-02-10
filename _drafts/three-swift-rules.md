## Three Rules for Writing Better Swift:

### 1. Do not use !

Swift uses optionals for values that can be nil. To use an optional value, you need to "un-wrap" it first, which means getting the actual value out. assuming that the value exists and the optional is not actually nil.

Optionals will be the subject of a complete post by themselves, but for now, I will just say this:
When you use ! you are **promising** the compiler that you will make sure there is a real value in that optional by the time it is needed.

If this is not the case, your app will crash as shown in this playground:

![Playground crash][1]

Instead of using ! you should use optional chaining with ? or check the value with `guard` or `if let` before use.

---

### 2. Use let, not var

Using constants in C-based languages is a pain. I could never remember the Objective-C syntax for declaring a static constant, so used to fall back to using #define for global constants. Inside my objects, all instance properties were variables, not constants. Inside functions, it was the same.

It doesn't take much imagination to work out that your apps will perform better and more securely if values that do not need to change are allocated as constants instead of variables.

With Swift, this is easy as you just declare a constant using the `let` keyword and declare variables using `var`. The Swift compiler will now warn you if you have used `var` where `let` would do, but I prefer to declare everything using `let` and only change to `var` when this causes an error as shown in this playground example:

![Playground let error][2]

---

### 3. Allow the compiler to infer types

With Objective-C and many other languages, you have to tell the compiler exactly what each variable is going to be: a string, an integer, an object of a certain type.

With Swift, the compiler is clever enough to work this out for you, which can make your code much cleaner looking and easy to read.

There are a few exceptions to this rule which are shown in the playground below:

Lines 3 - 6 are allowing the Swift compiler to decide what the type is and it is choosing valid types: Int, Double, String and UIView.

Line 8 is a case where we do not want the default type, which would be Double so we need to tell the compiler that this one really should be a CGFloat.

Lines 10 & 11 both deal with an array of Ints. In line 10, the values are supplied so the type of the array can be inferred.
In the second case, the array is initially empty, so the type needs to be specified in the declaration.

Lines 13 and 14 are the same but with dictionaries instead of arrays.

In each case, it would have been valid Swift to specify the type but why bother? The more text you enter , the more change of mistake and it leaves your code looking cluttered.

If you ever need to check what type has been assigned to a constant or variable, Option-click on it in Xcode and you willl get a popup telling you what it is.

![Playground types][3]

---

This was going to be five rules, but then I got a bot too verbose so will add more rules in a separate post.


[1]: /images/Playground2.png
[2]: /images/Playground3.png
[3]: /images/Playground4.png