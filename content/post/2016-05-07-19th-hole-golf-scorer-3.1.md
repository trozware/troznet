---
date: 2016-05-07T00:00:00Z
iphoneappdesc: The golf scoring app for everyone, for iPhone and Apple Watch.
iphoneappid: 871686159
iphoneappname: 19th Hole Golf Scorer
tags:
- ios
- golf
- scoring
title: 19th Hole Golf Scorer 3.1
---

One of the problems with using 19th Hole on the Apple Watch is making the app
show every time you raise your wrist. My solution to this was to go into
Settings (either on my iPhone through the Watch app, or directly on the watch)
and change it to "Resume Last Activity" on wrist raise. This worked fine but as
I usually prefer the watch face to show on wrist raise, I had to keep setting
and re-setting this which was a pain.

But last week I noticed the fine print when changing this setting. In this
screen shot from the Watch app on my iPhone, you can see that "session-based
apps" and "some third-party workout apps" will over-ride the "Show Watch Face"
setting.

![Wrist raise settings][1]

I started to research this and found that if an app starts a "workout session",
then it will become the active app until the session is ended or some other app
starts a session. So I got to work and added a workout session to the 19th
Hole's Apple Watch app.

When you start scoring a round on the Apple Watch, you will see this dialog
asking if you would like to start a workout:

![Start workout dialog][2]

The workout will be stopped automatically when you have scored the last hole.
You can also use a force-press on the scoring screen to turn the workout off or
on at any time.

![Stop workout][3]

This should make the app much more usable as an Apple Watch app, so happy
golfing :-)

[1]: /images/WakeScreen.jpg
[2]: /images/Watch-workout.png
[3]: /images/Watch_end_workout.png
