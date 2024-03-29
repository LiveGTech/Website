---
title: What's new in LiveG OS V0.2.0&colon; multiplatform support and plenty more
description:
    A look at a number of new features that have been added to the latest Alpha release of LiveG OS, including support for the Raspberry Pi and PinePhone.
author: james
publishedAt: 1693303200944
---

After almost a full year of working on developing new features for LiveG OS, we're excited to announce the latest Alpha release of LiveG OS that is now available for a range of devices, including for the Raspberry Pi, the PinePhone, and both x86-64 and ARM64 computers. This new release realises our goal of making LiveG OS a truly multiplatform operating system, and one of only a few operating systems that can run on both desktop and mobile device form factors.

Our latest episode of LiveG Showcase demonstrates all the new features included in this new release, which is now available on YouTube. In this post, we'll be giving you a summary of these new features.

<a href="https://youtu.be/wa5K0FJ_rKk" target="_blank" class="videoLink" translate="attributesOnly" tl:title="videoAlt_youtube" tl:aria-label="videoAlt_youtube">
    <img src="/media/blog/new-in-os-0-2-0/showcase-video.png" translate="attributesOnly" tl:alt="videoAlt_youtube">
    <img src="https://opensource.liveg.tech/Adapt-UI/icons/play-circle.svg" aui-icon="light" aria-hidden="true">
</a>

## Multiplatform support
![A graphic that lists the various devices that are now supported.](/media/blog/new-in-os-0-2-0/platforms.svg)

This release of LiveG OS is the first to run on the Raspberry Pi. LiveG OS runs particularly well on the Raspberry Pi 4 and the Compute Module 4, but it also runs on the Raspberry Pi 3. The system runs smoothly on the Pi 4 and is more-or-less as fast as it is on conventional x86-64 computers, but you may experience slowness and higher power consumption when running it on older models such as the Pi 3.

In addition to the Raspberry Pi, LiveG OS now also runs on the PinePhone smartphone by PINE64. This makes LiveG OS officially available for mobile devices alongside the current option for running it on the desktop. LiveG OS won't run on the PinePhone Pro just yet — anyone who wishes to volunteer to bring LiveG OS to the PinePhone Pro should check out our [LiveG OS Bootstrap Toolchain repository on GitHub](https://github.com/LiveGTech/OS-Bootstrap) and also [join our Discord community](https://discord.gg/pTYsJME9xH).

You can try out this release of LiveG OS now for the Raspberry Pi and PinePhone — and even x86-64 and ARM64 computers — by [downloading an OS image for your platform from our website](/os/get). It's simple: after downloading the image, use a tool such as [balenaEtcher](https://etcher.balena.io) or the [Raspberry Pi Imager](https://www.raspberrypi.com/software) to flash the image onto an SD card, then boot it on your device and follow the setup instructions presented inside LiveG OS.

## Installable web apps
![A screenshot of Sphere with the 'install app' menu option open. To the left side, a LiveG Prism is shown with an app being added to the home screen.](/media/blog/new-in-os-0-2-0/install-app.png)

Progressive web apps — or PWAs — can now be installed in LiveG OS thanks to the new option to install websites as web apps in our Sphere web browser. Any website can become an app in LiveG OS, and website can take advantage of extra features such as maskable app icons through the use of a [web app manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest).

Web apps open up large opportunities that can allow LiveG OS to compete with today's major operating systems, as PWA technologies enable a large range of existing apps to be installed to LiveG OS, such as Mastodon, Twitter, YouTube — and even our own apps, like [LiveG Docs](https://docs.liveg.tech). The OS-independent compatibility that web apps have make PWA technologies an ideal platform for LiveG OS, and LiveG OS's own system apps — and even its desktop environment, [gShell](https://github.com/LiveGTech/gShell) — are themselves made using web technologies.

## App menu search, power and app sorting options
![A screenshot of the app menu on the desktop version of LiveG OS. The term 'network' is being searched in the search bar, with suggestions for apps being shown below.](/media/blog/new-in-os-0-2-0/app-menu.png)

Apps that are installed now show up in the app menu in LiveG OS. The app menu now also includes a number of useful features that make searching for apps easier. You can now sort apps alphabetically by choosing the **alphabetical view** option, or you can search for apps by using the search bar.

App shortcuts also appear when using the search bar, making it easy to access certain features of apps. For example, you can search for network options in Settings by typing 'network' into the search bar.

Finally, there are options to lock, shut down or restart LiveG OS in the power menu. This removes the need for the LiveG OS Debug Environment to shut down the system, which has now itself been removed in this release.

## Tab-based interface in Sphere
![A screenshot of Sphere's tab-based interface on both desktop and mobile.](/media/blog/new-in-os-0-2-0/sphere-tabs.png)

Browsing the web has become much easier in the Sphere web browser now thanks to the new, tab-based interface in Sphere. The tab-based interface work similarly to what is seen in other modern browsers, allowing users to have multiple webpages open at once without needing to open multiple windows.

The tab-based interface is also available on mobile by pressing the tab list button. We hope to release an API for the tab-based interface in the future for web apps to allow them to take advantage of this paradigm: for example, the file manager app we hope to release soon would benefit from a tab-based interface to make file management across multiple folders much easier to perform.

## Gesture-based app switcher navigation on mobile
![A demonstrative screenshot of the app switcher on the mobile version of LiveG OS. Users can swipe up to view the app list, and swipe horizontally to quickly switch between apps.](/media/blog/new-in-os-0-2-0/gesture-switcher.png)

On mobile, the app switching experience has been improved through the addition of swipe gestures to quickly jump between apps. Swiping up from the LiveG logo at the bottom now reveals the app list — just like what happens when you double-tap the logo. Swiping left and right on the logo will switch between apps listed adjacently to the current-viewed app without needing to show the app list, reducing the time it takes to switch between apps.

The addition of this new gesture-based navigation method brings LiveG OS closer to the experiences seen on other major mobile operating systems.

## Update system
![A screenshot of the system updates page in Settings, showing an example update.](/media/blog/new-in-os-0-2-0/update-system.png)

LiveG OS now has an update system, making it easier for users to download and install new system updates in the future when they are made available. Users can now update the system through the Settings app, where they can also configure the update circuit under **advanced options**, allowing them to take advantage of cutting-edge features not yet present in stable releases.

The update system is designed to not be distracting or disruptive to its users — users can be assured that their system will not restart unless they tell it to, and updates are not forced on users (though users are strongly recommended to update when possible to benefit from security patches). The system is also designed to be robust against unexpected system shutdowns such as power outages with a number of rollback mechanisms implemented to recover the system in these scenarios back to the previous update.

## New options added to Settings
![A screenshot of the keyboard layout configuration options in Settings on desktop. To the right, a LiveG Prism is shown with the virtual keyboard open.](/media/blog/new-in-os-0-2-0/keyboard-layouts.png)

Alongside the new update system, we've also added a few additional options to the Settings app to make LiveG OS more useful.

Users can now configure their Wi-Fi networks and supply authentication options for them, such as Wi-Fi passwords. LiveG OS allows authentication for a range of security standards, including WEP, WPA, WPA2, and the enterprise standards, otherwise known as 802.1x.

There are also new options to configure the keyboard layout for LiveG OS. This is particularly useful as LiveG OS can already be used in the French language, and so we've needed a way for users to switch to the French AZERTY layout and not just British QWERTY. We've also included support for the US QWERTY layout, as well as Chinese pinyin text entry, which uses the Input Method Editor to provide text suggestions.

Keyboard layouts also work on mobile, and we hope to soon have a way of quickly switching between layouts without having to go into Settings.

Another new addition to Settings is our interaction and privacy options. These options make it easier to choose how LiveG OS will interact with our online services, such as when the update system will check for updates. You can choose to enable all the options, which integrates LiveG OS nicely with our online offerings, or if you don't feel you need our online services, then you can switch the options off.

## LiveG OS Setup improvements
![A screenshot of LiveG OS Setup, showing the disk partition options.](/media/blog/new-in-os-0-2-0/oobs.png)

And finally, there have been a few improvements to the out-of-box setup system — or OOBS, as we call it — including another power menu and an accessibility menu for enabling accessibility options such as Switch Navigation while users are setting up their device, in addition to a new setup step for configuring interaction and privacy options so that you can easily turn on or off these options before you use the system.

Additionally, there are now animated graphics included in the OOBS steps that make setting up LiveG OS just a bit more interesting and visually appealing.

---

## Future plans
So that's a run-down of the new features that have been included in LiveG OS — no wonder it's been a while since our last release. However, we recognise that there is still a lot to be done to LiveG OS before it becomes daily-drivable.

Our main focus for developing the next update will be to build some new system apps, such as a calculator; a file manager; apps with cellular features such as SMS texting and phone calling; and a few other useful tools that will bring LiveG OS in-line with other systems functionality-wise.

It's also worth noting some of our 'side projects' that we've been working on for LiveG OS, and we're excited to be integrating them fully into the system soon: these are the [Typeset Engine](https://github.com/LiveGTech/Typeset-Engine) code editor that we hope to integrate into an IDE; [LiveG Search](https://search.liveg.tech) that will soon be getting a new crawling and indexing system; and [Formulaic](https://github.com/LiveGTech/Formulaic), our expression evaluation engine that we hope to implement into a system calculator app.

It's a bit early to say this just now, but we're thinking about also integrating Linux apps into LiveG OS, so you can easily use your favourite Linux applications right in gShell, much like you can do on ChromeOS. I know that once this feature has been implemented, I'd definitely install LiveG OS onto my next laptop and use it for everything! We might not see this for version 0.3.0, but it's certainly on our radar.

---

So, that's a look at some of the new features in the latest Alpha release of LiveG OS. You can [download LiveG OS](/os/get) now, which is available in English and French for a variety of platforms.

You can support us financially by [donating to our Open Collective](https://opencollective.com/liveg), where we use the donations we get to advance our projects. You can also support us by joining our [Discord community](https://discord.gg/pTYsJME9xH) where you can help us with the development of our projects.

Follow us on [Mastodon](https://mastodon.social/@liveg) and [Twitter](https://twitter.com/LiveGTech) to keep in the loop with the latest updates to all our projects, and subscribe to [our YouTube channel](https://youtube.com/@liveg) where you can find videos on various aspects of LiveG, including release announcements and development guides.