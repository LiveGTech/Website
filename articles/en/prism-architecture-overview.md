---
title: Project Prism&colon; architecture overview
description:
    Earlier this week, our CEO James wrote about our ambitious plans to build a truly open smartphone.
author: tramcrazy
publishedAt: 1649432528000
---

Earlier this week, our CEO James wrote about our ambitious plans to build a truly open smartphone - based on web technologies. This is the first in a series of posts about the project, where we'll be covering our progress on different sections of this complex project. If you haven't read that first post, you should do so now - then you'll have a better understanding of our project. [Read the post here](/blog/en/prism-building-open-smartphone)

Before we get started... Hi! My name is tramcrazy, and I am CISO at LiveG. That means that I oversee all our cybersecurity systems and check code for issues. I also work on documentation.

At the foundation of gShell (the software running on the Prism) is Linux. We love Linux's open-source nature and the huge community that has grown around it in the last 30 years. It was the sensible choice for Prism. The specific version of Linux running on Prism is Mobian ([mobian-project.org](https://mobian-project.org)), which is a version of Debian designed for mobile phones. The underlying OS of Mobian could change in the future, because gShell runs in Electron which works on all operating systems.

Above Mobian is the X11 window system. This is the graphical user interface (GUI) of choice on Prism, and provides the desktop environment needed for gShell to function.

Above Mobian and X11, we have gShell itself. This runs in an Electron runtime which uses HTML, CSS and JS to provide a full mobile experience, along with NodeJS for the backend.

This is the full hierarchy of the Prism phone's OS, with extra explanation where needed:

```
Linux Kernel
 L X11 Xsession
   L gShell (Electron runtime)
     L OOBS (Out-of-box setup) - a first-time setup menu like the ones you might be familiar with on iOS or Android.
       L Basic power menu - a simple power menu providing options to shutdown or reboot.
     L Lock screen - a screen showing the current time, the user's background, and notifications. It also checks the password and switches to the user environment.
       L Notifications - a standard notifications drawer with various messages, some with actions to be performed inside the user environment.
       L Incoming call screen - this pops up when somebody is calling you, and handles the UI during the call.
       L Basic power menu
     L User environment - the environment used by the user once they have unlocked their phone. This lets the user open apps and perform other functions.
       L User-specific power menu - this is based on the basic power menu, but it includes time-critical functions like showing a bus pass or paying for an item.
       L Home screen - this screen lets the user launch apps, and its appearance can be customised.
       L Notifications
       L Incoming call screen
       L App switcher - this lets the user switch between running apps, and it contains the running apps inside webview tags.
         L Running privileged system apps - these are special apps which do not run inside webviews and have full access to the system, including managing system settings and displaying child webpages with no restrictions.
           L (example) Settings
           L (example) Sphere browser
         L Running unprivileged apps - these are standard apps, running inside webview tags, and they use an API to request permissions from the user. Often, these are third-party apps.
           L (example) Calculator
           L (example) Notes
```

As you can see, the architecture of gShell is complex and uses multiple layers. If you have any questions, leave them in the comments. You could also check out our gShell repository [on GitHub](https://github.com/LiveGTech/gShell).

---

_This article was originally posted on the [DEV Community](https://dev.to/liveg/project-prism-architecture-overview-278g)._