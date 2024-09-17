---
title: 'Xcode Folders & Groups'
date: 2024-09-17T14:12:42+10:00
draft: false
description: 'Xcode 16 uses folders instead of groups. What does this change and which should you use?'
tags: ['swift', 'xcode']
---

In Xcode 16, project files and folders are arranged differently in the Project navigator. What used to be a **group** is now a **folder**, and this simple change has some interesting effects. At first, I was against the new scheme - in fact in my [SwiftUI for Mac 2024][1] article, I specifically recommended reverting back to the old group method. But after doing some more reading and testing, I think the answer is not so clear cut.

Since Xcode 15 doesn't work on macOS Sequoia, now's my last chance to create sample apps with both Xcode 15 and Xcode 16 in macOS Sonoma, and compare the two.

<!--more-->

Using Xcode 15.4 and Xcode 16.0, I created a macOS app using Swift and SwiftUI. Both projects were placed under `git` control - you'll see why this is important soon. Both projects have identical files with identical contents, but take a look at the Project navigators:

{{< img_border >}}
{{< img_center >}}

![Xcode 15 & 16 Project navigators][i1]

At a first glance, there are two differences: the order of the files & folders and the color of the folder icons. A less obvious difference is that in Xcode 15, I can drag files around to arrange them in the order I prefer. In Xcode 16, I can't do that. I can drag files into or out of folders, but I can't move them around at the same level.

I like my Project navigator to be organized in a certain way, so I have to confess that I do find this annoying, especially since the folders at the top are ones I use infrequently. I did wonder whether the folders sorting to the top was due to the fact that I have that option turned on for Finder, but when I turned it off in Finder and made a new project, it was still the same.

### Adding a new file

What happens when you add a new file? There are many different ways to do this in Xcode 16, but I'll stick to the same old method that works for both. With **ContentView.swift** selected, press **Command-N** to open the file template chooser, select a new SwiftUI View file, and click **Next**. Name it **DetailView.swift** and click **Create**.

This is why I created `git` repositories for both projects - I wanted to see what source control changes were detected. In Xcode 16, the new **DetailView.swift** file is marked with the **A** that indicates an added file. But the top item in the Project navigator - the project itself - has no change marker. Going to the Source Control navigator confirms that there is only one change in the repository: the new file.

In Xcode 15, the new **DetailView.swift** file is marked with the **A**, but the project file is also marked with an **M** for a modified file. The Changes tab in the Source control navigator shows a lot of unreadable changes to the **project.pbxproj** file, which is one of the files hidden inside the **.xcodeproj** bundle:

![Xcode 15 Changes tab][i2]

This points out the fundamental difference between the two approaches: **groups** are an artificial construct that is stored in the project files. Usually, this mirrors the file and folder structure in Finder, but it doesn't have to. When you use **folders**, Xcode is reading the file and folder structure directly from the Finder.

One other difference: in Xcode 15, the new file is added to the Project navigator directly after the selected file. In Xcode 16, there appears to be a preset sort order, the logic of which escapes me for now. If I add a file with no other file selected, it's added to the root of the project, outside the main folder. Otherwise, it's added after **ContentView.swift**, no matter which file was selected.

### Importing files

So how does this affect importing files? For both projects, I used **Integrate -> Discard All Changes...** to revert them to their original states. Then in Xcode 15, I dragged my folder of sample files into the Project navigator, selecting where I wanted it to appear:

![Import folder in Xcode 15][i3]

This led to the dialog that I've always found slightly confusing and far too large, but I chose my standard settings.

![Import settings in Xcode 15][i4]

The source control markers showed three added files and a modified project file. Checking the project folder in Finder, I could see the new folder and its files in the correct place.

With Xcode 16, I wasn't able to select a precise location for the dropped folder, but I was able to choose the destination folder:

![Import folder in Xcode 16][i5]

The import dialog was less confusing - the only real option was whether to copy the files or move them.

The Utilities folder appeared below the Preview Content folder, the three files in it got the **A** marker, and the project file showed no changes.

But since Xcode is reading the file and folder structure directly from the Finder, I can add and move files in Finder as well as in Xcode. Still in Xcode 16, I discarded all changes again to revert to the starting app, then I right-clicked on **ContentView.swift** and selected **Show in Finder**. Then I dragged my Utilities folder into the project folder in Finder:

![Finder import][i7]

Back in Xcode, there was the folder and its files, but with no **A** markers on the files. The Source Control navigator showed only the addition of the Utilities folder and not the files inside it. I made a change in **ContentView.swift**, then went to **Source Control navigator -> Changes** and clicked **Stage All**. This added the three new files to the commit. So that worked, just not very smoothly, but again, there were no changes to the project file.

### Changing the Folder Structure

What else can I do in Finder that Xcode 16 will pick up? For my next test, I dragged a SwiftUI view file into the project folder in Finder. Then, still in Finder, I selected both the **...View.swift** files, right-clicked, and selected **New Folder with Selection**. I named the folder **Views** and sure enough, Xcode picked up the changes. The folders in the project appear to sort alphabetically, so the **Views** folder appeared after the **Utilities** folder. So I guess that while I don't have total control over the arrangement of the files in the Project navigator, I can organize the files into folders to suit.

Then I got to thinking about assets - can I add them to **Assets.xcassets** using Finder? The assets I add most frequently are images and app icons. I tried dragging an image into the **Assets.xcassets** folder but it didn't appear in Xcode - I had to import the image as usual which creates an **imageset** folder with the image and a **Contents.json** file. If I took an **imageset** folder from another project and added it using Finder, that worked as expected. Similarly, if I dragged an **AppIcon.appiconset** folder from another project into **Assets.xcassets**, that worked too, with Finder offering to merge or replace the existing folder. I chose replace, and my icon was there.

### Conclusion

Which style will I use going forward? With **groups**, I get the total flexibility that I'm used to, so I can arrange my files and folders exactly as I like. But with **folders**, I can use Finder to import and organize my files and folders. The big difference is in source control, especially if you're working with other people. When every file addition, deletion or move also changes the project file, you have a much greater chance of getting a merge conflict.

Finally, Apple has obviously decided that folders are the way to go - they are the default for new projects in Xcode. Over the years, I have seen Apple make many changes which seemed nonsensical or irritating at first, but nearly every time, it turned out that these changes were the precursor to more significant changes and if you had accepted the initial changes, you were in much better shape to handle the larger changes down the track.

Finally, as an educator, I try to stick to the defaults as much as possible. I don't want to confuse anyone by requiring them to make changes to their setup to match me. So I'll be using folders from now on.

But remember, if you hate it, or if you want to upgrade an older project, you can always swap. Right-click on the project folder in the Project navigator (the second item), and select **Convert to Group** or **Convert to Folder**.

What do you think? Will you go with the flow and use folders, or do you intend to stick with groups? If you have any other thoughts, ideas, suggestions or questions, I'd love to hear from you.

You can contact me using one of the links below or through the [Contact][contact] page. And if you found this article useful, please [buy me a coffee][kofi].

[i1]: /images/xcode_diffs.png
[i2]: /images/group_changes.png
[i3]: /images/import_folder_15.png
[i4]: /images/import_settings_15.png
[i5]: /images/import_folder_16.png
[i6]: /images/import_settings_16.png
[i7]: /images/finder_import.png
[contact]: /contact/
[kofi]: https://ko-fi.com/trozware
[1]: /post/2024/swiftui-mac-2024/
