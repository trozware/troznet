---
date: 2015-03-16T00:00:00Z
tags:
- app store
- ios
title: App Store Preview Videos
---

Apple now allows app developers to add a video preview of their app when
uploading to iTunes Connect. This video is shown to potential purchasers when
they are looking at an app in the iTunes App Store, just like the screen shots.

I have been working on an update to [19th Hole][1] and since it uses a custom
method for data input, I decided that a video would be really useful in this
case.

The first step was to work out how to record video from my iPhone. In OS X
Yosemite (10.10), this can be done using QuickTime Player. Connect your device
to your Mac using a Lightning cable (I think it has to be a Lightning cable -
the old cables will not work). Open up QuickTime Player and choose "New Movie
Recording" from the File menu. By default this shows input from the Mac's
FaceTime camera, but just to the right of the red Record button, there is a down
arrow that shows a popup menu. Click this and you can select your iPhone as the
Camera. Since I wanted the sound effects included, I also selected my iPhone as
the Microphone, but if you want to provide a voice-over or sound-track, you
might want to change this.

That handles the technical side of recording, but I needed a way to show where I
was tapping and pressing on the iPhone screen. After some searching, I found
[Touchpose][2] which was exactly what I wanted. Since it requires changing the
main.m file, as well as changes to the app delegate, I created a branch in my
app's git repository so that I could apply these changes temporarily, but save
them for next time. The only alternation I made to the default settings was to
change the color of the cursor indicator to suit the color scheme of my app. And
since this was a temporary change, I set it to show the cursor indicator all the
time, not just when the screen was mirrored. All the details are shown in the
sample project.

Next step was to actually record a session. After my first attempt (which lasted
about 67 seconds), I checked the Apple specs and found that the video could not
be longer than 30 seconds. So I re-thought what I wanted to include and tried
again. It took a few tries to get what I wanted, but finally I ended up with a
.mov file that was 26 seconds long.

On to iTunes Connect where I had the new version of the app set up already with
its screen shots. Since I have an iPhone 6, the video was only suited for the
4.7 inch section. So I dragged it into the drop zone and waited. No good - the
video frame rate was too high. It has to be 30 fps or less. QuickTime Player had
made a video that was 50 fps.

The app I usually turn to for any video conversion needs is [Handbrake][3]. So I
ran the app through Handbrake, specifying a frame rate of 30. This converted the
video to .mp4 instead of .mov, but it was 30 fps. It wasn't until I tried to
upload it to iTunes Connect that I realised Handbrake had cropped the video from
750 x 1334 to 750 x 1330. After searching through the settings, I found where I
needed to turn on custom clipping and set it to 0 so that the original
dimensions were preserved. But iTunes Connect still didn't like it, although
this time the error message was un-informative.

Eventually, the brains trust on the other side of the room suggested iMovie. Not
only that, but he found that once the original had been dragged into iMovie, the
share options included an "App Preview" setting. This gave us a .mov file of the
correct dimensions and the correct frame rate which iTunes Connect accepted.

iTunes Connect that allowed me to select the poster frame for the video and save
the changes to the app meta data. At that point, it showed a notice saying that
the app preview was being processed which could take up to 24 hours. It appears
that the processing has been finished, as that notice has disappeared.

For the next stage, I ned to wait until the app gets reviewed and hopefully
approved. Then it will be interesting to see how the video looks in the iTunes
App Store.

---

As a reward for reading this post, here is a pre-release of the video, showing
how to enter the score data for a hole of golf using [19th Hole][1]:

<video controls poster="/images/19thHole-scoring-web.png">
  <source src="/images/19thHole-scoring-web.mp4" type="video/mp4">
	Your browser does not support the video tag.
</video>

[1]: https://troz.net/19th-hole/
[2]: https://github.com/toddreed/Touchpose
[3]: https://handbrake.fr
