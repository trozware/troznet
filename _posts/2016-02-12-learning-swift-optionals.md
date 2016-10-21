---
title: Learning Swift - Optionals
author: Sarah
layout: post
permalink: /2016/02/learning-swift-optionals/
tags:
  - swift
  - learning swift
  - optionals
---

Today I plan to discuss optionals since they were a feature of Swift that I found difficult to grasp at first.

### What is an optional in Swift?

An optional is a variable of a specified type that can also be nil.

### Why does this matter?

In Objective-C, any object type could be nil. If you declared a variable like this:
{% highlight objc %}
NSString *myString;
{% endhighlight %}
then `myString` was set to nil by default.

But this could cause issues, especially as Objective-C does not complain if you send a message to nil. This could lead to bugs that were very difficult to track down.

The other big use for nil is when returning from a function which has found no appropriate data to return. The classic example is when looking for the index of an element in an array. What should be returned if the element is not found in the array? 

Some languages return -1, Objective-C uses `NSNotFound`, but you have to know what each language is going to do. The more logical answer is nil. However if your function is expected to return an integer, then it cannot return nil because nil is not an integer.

This is where optionals come in: if the function is expected to return an optional integer, it can return with an integer with the index of the matching element, or it can return nil if the element was not found. This is much clearer and less prone to error.

---

## How does Swift handle optionals?

One of the first things that struck me about Swift was how clean the code looked, without so many non-alphanumeric characters scattered around. Gone were all the:

{% highlight swift %}
* ; [ ]
  {% endhighlight %}

But instead, Swift code sprouted:

{% highlight swift %}
! ?
{% endhighlight %}

What were these?

**The key to understanding optionals is to realise that when you declare an optional variable of a certain type, you are actually declaring a box that can hold a variable of that type or can hold nil.**

Once you grasp that concept, it all becomes much more obvious.

{% highlight swift %}
var optionalInteger: Int?
{% endhighlight %}

The ? indicates that this is an optional variable. It does not have to be initialised as it is already set to nil which is valid for an optional variable. Without the ? this would require initialisation as it would not be valid for it to be nil.

---

### Setting an optional:

Setting the value of an optional variable is just the same as any other variable:

{% highlight swift %}
optionalInteger = 3
optionalInteger = 42
{% endhighlight %}

---

### Getting an optional:

The difference arises when you need to get the data out of the optional variable in order to use it. This process is called un-wrapping and it means to get the variable value out of the 'box' it is stored it.

#### The most obvious way is to use !

{% highlight swift %}
let newInteger = optionalInteger!
{% endhighlight %}

**DO NOT DO THIS!**

This is called forced-unwrapping and assumes that the optional variable is not nil. If the optional is nil, this will crash.
In Xcode, when you connect interface elements from your storyboard to a Swift file, Xcode will use ! like this:

{% highlight swift %}
@IBOutlet weak var startButton: UIButton!
{% endhighlight %}

I have to assume Xcode knows what it is doing and the button will be available when needed, but you should not use ! - it is un-safe. By using it, you are vowing to the compiler that when it gets to that point, the optional value will not be nil. There are much better and safer ways of doing that.

---

#### Use 'if let':

{% highlight swift %}
func doubleNumber(_ optionalInteger: Int?) -> Int? {
    if let integerValue = optionalInteger {
        // integerValue is not an optional
        // and is guaranteed to contain an Int
        return integerValue * 2
    }
    
    // no integer found in the optional,
    // so return nil to indicate failure
    return nil
}
{% endhighlight %}

---

#### Use guard:

{% highlight swift %}
func doubleNumber(_ optionalInteger: Int?) -> Int? {
    guard let integerValue = optionalInteger else {
        // get out quickly, 
        // returning nil to indicate failure
        return nil
    }
    
    // integerValue is not an optional 
    // and is guaranteed to contain an Int
    return integerValue * 2
}
{% endhighlight %}

These two alternatives (`if let` & `guard`) do the same job but in opposite ways. In both cases, they perform a conditional un-wrapping that may or may not give a valid result. `if let` checks if it is OK to proceed. `guard` checks to see if it is NOT OK to proceed. Which you use is really a matter of personal preference and working out what is more logical in each case.

The `guard` statement is really good for checking data early in a process and making a quick exit it something is wrong.
The `if let` construct encloses your success code inside a block and can sometimes leave the failure code a long way from the check which can make it less obvious. The other potential issue with `if let` is the "pyramid of doom" common in early Swift code as demonstrated in this rather contrived example:

{% highlight swift %}
func isValidAddressBookEntry(
    firstName: String?,
    lastName: String?,
    emailAddress: String?,
    phoneNumber: String?) -> Bool {
    
        if let validFirstName = firstName {
            if let validLastName = lastName {
                if let validEmail = emailAddress {
                    if let validPhone = phoneNumber {
                        return true
                    }
                }
            }
        }
        return false
}
{% endhighlight %}

Thankfully, Swift 2 allows us to chain both `if let` and `guard` statements. Here is the previous example re-factored for Swift 2:

{% highlight swift %}
func isValidAddressBookEntry(
    firstName: String?,
    lastName: String?,
    emailAddress: String?,
    phoneNumber: String?) -> Bool {
    
        if let
            validFirstName = firstName,
            validLastName = lastName,
            validEmail = emailAddress,
            validPhone = phoneNumber {
                return true
        }
        return false
}
{% endhighlight %}

---

#### Use optional chaining:

The final way to deal with optionals safely is to use optional chaining:

{% highlight swift %}
struct SocialMediaAccounts {
    var facebook: Person?
    var twitter: Person?
}

struct Person {
    var firstName: String?
    var lastName: String?
    var handle: String?
}

var socialMedia: SocialMediaAccounts?
socialMedia = SocialMediaAccounts()
var twitterAccount = Person()

socialMedia?.twitter = twitterAccount
let twitterHandle = socialMedia?.twitter?.handle
{% endhighlight %}

In this example, we have defined a `SocialMediaAccounts` struct that holds optional `Person` structs for the various social media outlets. The `socialMedia` variable is defined as an optional and then created. A `twitterAccount` variable of type `Person` is also created but contains no data at the moment.

When assigning the `twitterAccount` to the `socialMedia.twitter` property, a ? is inserted which checks to see that `socialMedia` is not nil. If it is nil, then execution of that line stops at the ? and nothing bad will happen.

In the same way, when trying to read back the twitter handle, we chained together 2 optionals with ?'s. If either `socialMedia` or `socialMedia.twitter` is nil, that line will not complete. Again this is perfectly safe and the app will not crash.

---

All the examples in this article are available in a [Swift playground][1] which has been updated to Swift 3 syntax.

[1]: https://github.com/trozware/optionals

