---
title: 'Swift Format in Xcode'
date: 2024-11-06T16:29:20+10:00
draft: false
description: 'With Xcode 16, Apple has included Swift Format for code formatting.'
tags: ['swift', 'xcode', 'swiftlint', 'swiftformat']
---

In Xcode 16, Apple quietly introduced the ability to format your Swift files using Swift Format. I'm a long-time user of SwiftLint, but having such a tool built into Xcode would be a great convenience, so I decided to give it a try. Here is my description of why I use such a tool, how well it works compared to the alternatives, and how I configured it for my own purposes.

<!--more-->

## Why Format Your Code?

I have always been a big fan of consistent code formatting. As I wrote years ago in [Consistent Swift Style][1], we read code far more often than we write it, so anything that improves readability is great for productivity, even for a solo developer. If you work as part of a team, consistency is even more important as you don't want other people to have to spend their valuable time trying to understand your code, or the other way round.

I have been an editor and writer for [Kodeco][2] (formerly raywenderlich.com) for many years and with so many different authors on the team, it was crucial for there to be a consistent style. This is why I always use SwiftLint in my Kodeco projects, using the configuration file found here: [Kodeco Swift Style Guide][3]. For my own projects, I vary this configuration slightly, but I always use SwiftLint. Similarly, when doing web development, I always use [Prettier][4] which integrates beautifully with Visual Studio Code so that my files are automatically prettified on save.

## Swift Format

The name Apple chose is logical but confusing. I had experimented with Nick Lockwood's [SwiftFormat][5] a few years ago, but found that I preferred SwiftLint, so I stuck with the latter. When I saw that Xcode included Swift Format, I assumed that they had acquired Nick's formatter but it appears to be a different tool, officially called [swift-format][6]. It's downloaded as part of the toolchain when you install Xcode 16, so no further installation is required.

## Test Code

I created a test project in Xcode 16 and wrote a chunk of Swift and SwiftUI for testing. I deliberately formatted it badly so as to see which formatter did what to it, so don't hate me for this nonsensical code:

```swift
import SwiftUI

struct ContentView: View {
  @State var data = [String]()

    var body: some View {
      NavigationSplitView(sidebar: {
        List(data, id: \.self) { row in
          Text(row)
        }
      }, detail: {
        Text(someComputedProperty)
      })
        .onAppear(perform: createTestData)
    }

  func createTestData() {
    data = Array(0 ..< 1000).map { "Row #\($0)" }


  }

  func downloadData() {
    let address = "https://zenquotes.io/api/quotes"
    let url = URL(string: address)!
    let task = URLSession.shared.dataTask(with: url) { data, response, error in

      if let data = data,let string = String(data: data, encoding: .utf8) {
          print(string)
        }
      }

    task.resume()
  }

  var someComputedProperty: String {
    """
    This is a multiline string,
    that is a computed property which can be tricky to format.

    It has nothing to do with the list on the side, but I wanted to see how swift-format would handle it.
    """
  }

  func longFunctionNameThatDoesSomething() {
    print("This is a long function name that does something")
    FunctionwithLotsOfArguments(arg1: 1, arg2: 2, arg3: 3, arg4: 4, arg5: 5, arg6: 6, arg7: 7, arg8: 8, arg9: 9, arg10: 10)
  }

  // Yes, this deliberately starts with an uppercase letter
  func FunctionwithLotsOfArguments(arg1: Int, arg2: Int, arg3: Int, arg4: Int, arg5: Int, arg6: Int, arg7: Int, arg8: Int, arg9: Int, arg10: Int) {
    print("This is a function with a lot of arguments")
  }
}

#Preview {
    ContentView()
}
```

Some comments on this code:

- I use 2 space indentation, but Xcode creates files with 4 spaces, so indentation is a mess.
- The `NavigationSplitView` is not using multiple trailing closure syntax.
- I've left unnecessary blank lines in the code.
- The networking code is not what I would write, but it was suggested by GitHub Copilot.
- Multi-line strings are often difficult to format.
- The two functions at the end really need to spread over more lines and the last one should start with a lowercase letter.

## Using Other Formatters

Before checking out Xcode's `swift-format`, I want to try **SwiftLint** and **Prettier**. I have SwiftLint installed already, so I can run it from the Terminal. After I used `cd` to step into the project's code folder, I ran:

```shell
swiftlint ContentView.swift
```

This is using the default SwiftLint configuration and gave this result (I deleted the folder path but you'll still have to scroll sideways to read this.):

```text
Linting Swift files at paths ContentView.swift
Linting 'ContentView.swift' (1/1)
ContentView.swift:28:25: warning: Comma Spacing Violation: There should be no space before and one after any comma (comma)
ContentView.swift:51:3: error: Function Parameter Count Violation: Function should have 5 parameters or less: it currently has 10 (function_parameter_count)
ContentView.swift:51:8: error: Identifier Name Violation: Function name 'FunctionwithLotsOfArguments(arg1:arg2:arg3:arg4:arg5:arg6:arg7:arg8:arg9:arg10:)' should start with a lowercase character (identifier_name)
ContentView.swift:47:1: warning: Line Length Violation: Line should be 120 characters or less; currently it has 123 characters (line_length)
ContentView.swift:51:1: warning: Line Length Violation: Line should be 120 characters or less; currently it has 147 characters (line_length)
ContentView.swift:28:39: warning: Non-Optional String <-> Data Conversion Violation: Prefer using UTF-8 encoded strings when converting between `String` and `Data` (non_optional_string_data_conversion)
ContentView.swift:59:1: warning: Trailing Newline Violation: Files should have a single trailing newline (trailing_newline)
ContentView.swift:40:1: warning: Trailing Whitespace Violation: Lines should not have trailing whitespace (trailing_whitespace)
ContentView.swift:26:62: warning: Unused Closure Parameter Violation: Unused parameter in a closure should be replaced with _ (unused_closure_parameter)
ContentView.swift:26:72: warning: Unused Closure Parameter Violation: Unused parameter in a closure should be replaced with _ (unused_closure_parameter)
ContentView.swift:20:1: warning: Vertical Whitespace Violation: Limit vertical whitespace to a single empty line; currently 2 (vertical_whitespace)
Done linting! Found 11 violations, 2 serious in 1 file.
```

SwiftLint has the ability to fix some issues, so I ran:

```shell
swiftlint --fix ContentView.swift
```

The result was:

```text
Correcting Swift files at paths ContentView.swift
Correcting 'ContentView.swift' (1/1)
ContentView.swift:28:25 Corrected Comma Spacing
ContentView.swift:58:1 Corrected Trailing Newline
ContentView.swift:40:1 Corrected Trailing Whitespace
ContentView.swift:26:62 Corrected Unused Closure Parameter
ContentView.swift:26:72 Corrected Unused Closure Parameter
ContentView.swift:19:1 Corrected Vertical Whitespace
Done correcting 1 file!
```

This reduced the number of problems to 5, with 2 serious. What it fixed was mostly whitespace issues, but it also removed the two used parameters from the networking closure. It did not fix the indentation.

Next on my list was Prettier, so I reverted to the badly formatted code and opened the project folder in Visual Studio Code. I had already installed the Swift and Prettier extensions, so I opened and re-saved the file to make Prettier do its thing. This did a slightly better job than SwiftLint: it fixed the indentation and spread the long function call and definition over three lines. It also removed the two parameters from the networking closure and added some line feeds to make the code more readable.

## swift-format

Finally, it was time to see what `swift-format` can do. After reverting to the original code again, I chose **Editor -> Structure -> Format File with 'swift-format'**:

{{< img_border >}}

![Swift Format][i1]

This fixed the indentation and the whitespace issues. Interestingly, it split the long function call and definition over multiple lines, but still with more than one argument per line. It did not remove the two parameters from the networking closure. I think I may be running into the difference between a formatter and a linter.

While I was impressed overall, I disliked the way it removed spaces around the range operator. I prefer:

```swift
data = Array(0 ..< 1000).map { "Row #\($0)" }
```

But after using swift-format, it was:

```swift
data = Array(0..<1000).map { "Row #\($0)" }
```

## Configuring swift-format

The `swift-format` tool is installed as part of the Xcode toolchain, so the first step in configuring it was to locate it, using the instructions found [here][6] under **Included in the Swift Toolchain**. In Terminal, I used:

```shell
xcrun --find swift-format
```

Which gave me: **/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/swift-format**

Using this path, I was able to export the default configuration file (I included the full path to the tool in the command, but faked it here for ease of reading):

```shell
path-to/swift-format dump-configuration > swift-format-default-config.json
```

Opening the file, it has a bunch of settings and a long list of rules. I'm not going to go through them, but the file is in the project folder, so you can see it if you download the project from [GitHub][7] and switch to the `swift-format` branch.

The indentation is set to use 2 spaces. I assume that was picked up from my Xcode settings, since it's different to the default. The setting I want to change is:

```json
"spacesAroundRangeFormationOperators" : false
```

Before making any changes, I need to save the file in a location and with a name that `swift-format` can find. In my tests, I found that saving it as **.swift-format** in my home directory meant that it applied to every Xcode project. To do this, I followed this sequence in Finder:

- Open my **Home** directory.
- Press **Command-Shift-Period** to show hidden files.
- Option-drag **swift-format-default-config.json** to the Home directory.
- Rename the file to **.swift-format** agreeing to the warning about making it invisible.

Then I edited it, changing the setting to:

```json
"spacesAroundRangeFormationOperators" : true
```

Back in Xcode, I pressed **Shift-Control-I** to reformat the file. This time, the range operator was formatted with spaces as I wanted.

To make future configuration changes easier, I created an alias to **.swift-format** in my Home folder and called it **swift-format alias.json**. This gives me a visible link that will open in a JSON editor. With that in place, I pressed **Shift-Command-Period** again to hide invisible files.

`swift-format` has a lint option, so in Terminal, I ran:

```shell
swift-format lint ContentView.swift
```

Which reported:

```text
ContentView.swift:55:8: warning: [AlwaysUseLowerCamelCase] rename the function 'FunctionwithLotsOfArguments' using lowerCamelCase
```

If I was going to do this on a regular basis, I would want to add the path to the` swift-format` tool to my `PATH` variable or create an alias to it in my **.zshrc** file, but it was valid information.

One extra tip: use **Editor -> Structure -> Format to Multiple Lines** or **Control-M** to split long lines into multiples. This is a much more consistent way of spreading out long function calls and definitions. You'd think that **Editor -> Structure -> Reformat to Width** would do the opposite, but in my tests, it did either nothing, or the same thing as **Format to Multiple Lines**.

## Conclusion

I am going to use `swift-format` in my projects from now on. It's less intrusive than SwiftLint and I like that it's built into the Xcode toolchain. I am going to assign a different keyboard shortcut as **Shift-Control-I** is an awkward combination to reach on my Ergodox Moonlander keyboard.

Conveniently, the command applies to the entire active file, regardless of selection. I'm used to using **Command-A -> Control-I** to fix indentation issues, but this method only requires a single key command.

For future reference, be aware of this note from the [swift-format GitHub page][6]:

> NOTE: No default Swift code style guidelines have yet been proposed. The style that is currently applied by swift-format is just one possibility, and the code is provided so that it can be tested on real-world code and experiments can be made by modifying it.

I am hoping that Apple or the Swift team does develop a style guide while still allowing for customization, but in the meantime, I will continue to tweak the settings to suit myself. I presume that if I include a `.swift-format` file in my project, it will override any other settings. This would be great for distributing tutorial projects with a consistent style. I'd also love to be able to set the formatter to run on save, like Prettier does in Visual Studio Code.

The test project is on GitHub at [trozware/swift-format-tests][7] if you want to try it out for yourself. There's a separate branch for each formatter, with `main` holding the original, badly formatted code.

If you have any other thoughts or suggestions, I'd love to hear them. You can contact me using one of the links below or through the [Contact][contact] page. And if you found this, or any of my articles useful, please [buy me a coffee][kofi].

[contact]: /contact/
[kofi]: https://ko-fi.com/trozware
[1]: /post/2018/swiftlint/
[2]: https://www.kodeco.com/
[3]: https://github.com/kodecocodes/swift-style-guide/blob/main/SWIFTLINT.markdown
[4]: https://prettier.io
[5]: https://github.com/nicklockwood/SwiftFormat
[6]: https://github.com/swiftlang/swift-format
[7]: https://github.com/trozware/swift-format-tests
[i1]: /images/2024/swift-format.png
