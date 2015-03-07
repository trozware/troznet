---
id: 205
title: Making a Mac Screen Saver
author: Sarah
layout: post
guid: /?p=205
permalink: /making-a-mac-screen-saver/
dsq_thread_id:
  - 3565951419
categories:
  - Screen saver
  - Time in Words
---
Having just completed the my first screen saver for Mac &#8211; the [Time In Words Screen Saver][1], I thought I would share some of the experiences. I am using OS X Lion (10.7) and Xcode 4.3.2

The first thing is to create a new project in Xcode using the Screen Saver template:

[<img class="aligncenter size-medium wp-image-206" title="Xcode Screen Saver Template" src="/wp-content/uploads/2012/05/ScreenSaverTemplate-441x300.png" alt="Xcode Screen Saver Template" />][2]

Xcode sets up a project for you with everything you need for a screen saver module. Start editing the ScreenSaverView.m file. The most important method here is animateOneFrame.

This is called every time the animation time interval elapses. This interval is set in initWithFrame:isPreview:. I have seen some debate online as to whether the drawing should be done in the animateOneFrame method or in the drawRect method. I chose to use animateOneFrame because they are both called when the screen saver starts which can lead to an unpleasant flicker.

Now it is up to you to decide what to show in the animateOneFrame method. For Time In Words, I assembled the data as a string, created a dictionary of text attributes, calculated the location where I wanted to show the text and used drawAtPoint:withAttributes: to display it.

There are a couple of important tricks when working out locations: firstly, you will need to know the bounds of the screen saver area. This will vary depending on the monitor, screen size or whether the screen saver is appearing in the preview window in System Preferences. The screen saver view has a method that does this work for you.

    NSRect viewBounds = [self bounds];

The next trick is that you are most likely going to need some random numbers. Again, the screen saver framework supplies these to you in several forms. I used SSRandomFloatBetween but there are others. Check the documentation.

I ran into an oddity in System Preferences that made testing a bit tedious. I built the screen saver module and double-clicked on it to install into System Preferences. That worked fine, but when I made some changes and repeated the process, the original screen saver was still in place. I found that I had to quit System Preferences each time. Deleting the old version of the screen saver was not necessary, but quitting the System Prefs app was essential.

So that gives the basic screen saver module but with no options. Adding options is not difficult, but as always, there are a few things that are not obvious on first glance.

Add a xib file to your project: I used a window template. Then change the window&#8217;s class to NSPanel and configure it as shown:

<img title="NSPanel Settings" src="/wp-content/uploads/2012/05/PanelSettings.png" alt="NSPanel Settings" />

Set the File&#8217;s Owner class to the class of your Screen Saver view. In your ScreenSaverView.h file, declare a property for this new panel. e.g.

    @property (assign) IBOutlet NSPanel *optionsPanel;
  
@synthesize this in the ScreenSaverView.m file.
In the xib file, connect the panel to this outlet.

  Now go back to ScreenSaverView.m and add the following code:

    - (BOOL)hasConfigureSheet {
        return YES;
    }
    
    - (NSWindow*)configureSheet {
        if (!self.optionsPanel) {
            [NSBundle loadNibNamed:@"Options" owner:self];
        }
        return self.optionsPanel;
    }
    
    
    - (IBAction)closeConfig:(id)sender {
        [[NSApplication sharedApplication] endSheet:self.optionsPanel];
    }

The hasConfigureSheet and configureSheet stubs are already there for you, but you can replace them with these versions.

Go back to the xib file and drag in a button to close the options panel. Connect it to the closeConfig: action.

Save everything, build, install in System Preferences and test. Firstly, the &#8220;Options&#8230;&#8221; button should be enabled. Clicking it should open your panel as a sheet, and when you click your button, the panel should close.

If that doesn&#8217;t work, check the class assignments, the connections, the settings for the NSPanel and the code in that order.

Once the panel is opening and closing as required, you need to add the ability to store and retrieve the settings. Instead of using NSUserDefaults as you would in a standard Mac app, there is a special class call ScreenSaverDefaults for screen savers. It needs a unique module name, so I used the bundle identifier. For my Time In Words screen saver, this is &#8220;net.troz.Time-In-Words-Screen-Saver&#8221;. I defined a constant to hold this as a string, so I could use it anywhere I needed.

In the initWithFrame:isPreview: method, I got a reference to the screen saver defaults for my screen saver and registered the defaults. I am never very sure about the need to do this, but it is supposed to be a good practice.

    ScreenSaverDefaults *defaults = [ScreenSaverDefaults defaultsForModuleWithName:kModuleName];
    [defaults registerDefaults:[NSDictionary dictionaryWithObjectsAndKeys: 
        @"NO", @"UseAlternativeZone", @"", @"AlternativeZoneName", nil]];
        
    Using them is exactly the same as using NSUserDefaults: 

    // Reading
    ScreenSaverDefaults *defaults = [ScreenSaverDefaults defaultsForModuleWithName:kModuleName];
    BOOL useAlternativeZone = [defaults boolForKey:@"UseAlternativeZone"];
    NSString *alternativeZoneName = [defaults objectForKey:@"AlternativeZoneName"];
    
    ...
    
    // Writing
    ScreenSaverDefaults *defaults = [ScreenSaverDefaults defaultsForModuleWithName:kModuleName];
    [defaults setBool:useAlternative forKey:@"UseAlternativeZone"];
    [defaults setObject:alternativeZoneName forKey:@"AlternativeZoneName"];
    [defaults synchronize];
    
One last thing: if you want to distribute the screen saver, you will want to create an archive, possibly code-signing with your Apple developer ID to allow for Mountain Lion&#8217;s up-coming Gatekeeper security system. I code-signed the project and built an archive, but when I clicked &#8220;Distribute&#8221; in the Organizer, the only appropriate options was &#8220;Save Built Products&#8221;. I selected this option and ended up with a series of folders inside folders, with the screen saver module in about the fifth folder down. I don&#8217;t know why the module gets distributed like this, but I pulled it out of the folders and it worked fine.

And that&#8217;s about it. A lot of this stuff is online or in Apple&#8217;s documentation, but there are enough oddities to make it worthwhile gathering together all that I learnt while making this screen saver.

Click this icon to download the screen saver:
  
<a href="/screensaver/download-TiWscreenSaver.php"><img class="size-full wp-image-196 aligncenter" style="border-style: initial; border-color: initial; border-width: 0px;" title="Click to download Time In Words Screen Saver" src="/wp-content/uploads/2012/05/ScreenSaverIcon128.png" alt="Time In Words Screen Saver Download" width="128" height="128" /></a>

 [1]: /time-in-words-screen-saver-for-mac/ "Time In Words Screen Saver for Mac"
 [2]: /wp-content/uploads/2012/05/ScreenSaverTemplate.png