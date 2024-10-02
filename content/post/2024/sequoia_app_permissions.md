---
title: 'App Permissions on macOS Sequoia'
date: 2024-10-02T11:33:26+10:00
draft: false
description: 'How to open unsigned apps in macOS Sequoia'
tags: ['macos', 'gatekeeper']
---

In 2012, with OS X Mountain Lion, Apple added a feature called [Gatekeeper][1]. It had been available earlier as a command line utility, but this was the first time they made it accessible through System Preferences. Gatekeeper allowed users to control which apps could be installed on their Macs by offering three options: allow apps from **App Store**, **App Store and identified developers** or **Anywhere**. This was the start of Apple trying to lock Macs down, similarly to how iOS devices are locked down, but it allowed power users to install any apps they wanted.

In macOS Sierra (2019), the **Anywhere** option was removed. It was still possible to open any app by right-clicking and selecting **Open**. You had to get past a couple of warning dialogs, but it worked. Now, in macOS Sequoia, even that has gone. So how can you open an app that isn't signed by an identified developer?

TL;DR: You can still run unsigned apps, but it's a bit more difficult. After trying once, you have to go to **System Settings -> Privacy & Security**, scroll to the end and click **Open Anyway** for that app.

<!--more-->

### Testing on my Computer

I created a test app called **UnsignedApp**, and made sure to leave the developer team set to **None** so the app could not be code signed. I archived the app in Xcode and clicked **Distribute App** in the Organizer window. Instead of selecting one of the standard options, I chose **Custom** and clicked **Next**.

{{< img_border >}}
{{< img_center >}}

![Custom distribution][i1]

Then I selected **Copy App** as it was the only option that wasn't going to sign the app.

![Copy App option][i2]

I saved the app to my desktop and opened it without any problems. Next, I moved it into my **Applications** folder and tried again. Still no problems. So presumably, even though it was unsigned, it was OK because I had created it. Next, I tried running it when logged in as a different user on my computer. This still worked, rather to my surprise. So I assume that my computer is registered to my developer account and any apps I create are allowed to run on it, regardless of user.

### Testing on Someone Else's Computer

The problems started when I tried running the app on someone else's Mac. This dialog appeared (presumably the default button says Move to Trash where appropriate):

![Unsigned app warning][i3]

I clicked **Done** to close the dialog and tried the old right-click and **Open** trick. No good - this showed the identical dialog.

Finally, I remembered reading something about this on Mastodon. I forget who posted it, so if it was you, thank you very much because Apple certainly wasn't helping here. I opened **System Settings** and went to **Privacy & Security**. After scrolling all the way down to the end, past the sign marked [**Beware of the Leopard**][2] (with apologies to the late, great Douglas Adams), I found this:

![System Settings][i4]

There is the Gatekeeper setting with the remaining two options, but added on is a message about my app being blocked. I clicked **Open Anyway** and got this dialog:

![Open Anyway dialog][i5]

At least this gave me an option to proceed. I clicked **Open Anyway** and got this scary (and badly written) message:

![Final warning][i6]

I authenticated and finally, the app ran. But there's one more interesting twist. The app has the ability to show its running location. When I ran the app from the **Applications** folder, it was in /Applications as expected, but when I deleted it from there and tried running it from the **Downloads** folder, macOS moved it into a hidden AppTranslocation folder and ran it from there:

![Running from secure location][i7]

### Using Terminal

The `spctl` command line utility used to allow full manual control of Gatekeeper. In macOS Sequoia, it has lost most of its power, but you can still use it to re-enable the **Anywhere** option in **System Settings -> Privacy & Security -> Allow applications from** using this command:

```shell
spctl --global-disable
```

![After running spctl command][i8]

If you're already in **System Settings -> Privacy & Security**, go to a different settings page and back again to see the change.

If you choose **Anywhere**, you have to authenticate, but then you can run any app. I wouldn't bet on this staying around forever, but for the moment, it's nice to see it's still there. The extra choice disappears after about 8 minutes if you don't select it.

### Conclusion

You can work around this limitation, but proceed with caution. There are bad Mac apps out there, so don't use these workarounds unless you're confident of the source. Be particularly wary of any app that asks you to authenticate.

Apple has always been very keen to keep iOS devices locked down. They maintain that this is essential for security but given some of the scams in the App Store, that is a debatable point. The Mac has historically always been open and allowed users to do what they wanted. Over the past few years we have seen Apple gradually closing down the Mac to bring it more in line with the other devices.

With my tech support hat on I can see the benefits of this, but as a power user, I want to have the tools to work around it if necessary.

As a developer, I realize that it is now virtually impossible to release any Mac apps without having a developer account. Mac apps must be notarized by Apple so that they fall into the **Known Developers** category, regardless of whether they are distributed through the App Store or by other means.

If you have any thoughts or suggestions about this, contact me using one of the links below or through the [Contact][contact] page. And if you found this article useful, please [buy me a coffee][kofi].

[1]: https://en.wikipedia.org/wiki/Gatekeeper_(macOS)
[2]: https://www.azquotes.com/quote/354892
[contact]: /contact/
[kofi]: https://ko-fi.com/trozware
[i1]: /images/2024/custom_distrib.png
[i2]: /images/2024/copy_app_option.png
[i3]: /images/2024/unsigned_app_1.png
[i4]: /images/2024/unsigned_app_2.png
[i5]: /images/2024/unsigned_app_3.png
[i6]: /images/2024/unsigned_app_4.png
[i7]: /images/2024/unsigned_app_5.png
[i8]: /images/2024/unsigned_app_6.png
