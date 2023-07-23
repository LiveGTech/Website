---
title: Project Prism&colon; on the road to building an open smartphone
description:
    That's right ⁠— we're on an ambitious plan to build an open smartphone that puts Progressive Web Apps (PWAs) at the core of our ecosystem.
author: james
publishedAt: 1649241344000
---

That's right ⁠— we're on an ambitious plan to build an open smartphone that puts Progressive Web Apps (PWAs) at the core of our ecosystem. Check out our video for an in-depth review of our project so far:

<a href="https://youtu.be/pmOR2J9fDZM" target="_blank" class="videoLink" translate="attributesOnly" tl:title="videoAlt_youtube" tl:aria-label="videoAlt_youtube">
    <img src="/media/blog/prism-building-open-smartphone/prism-showcase-video.jpg" translate="attributesOnly" tl:alt="videoAlt_youtube">
    <img src="https://opensource.liveg.tech/Adapt-UI/icons/play-circle.svg" aui-icon="light" aria-hidden="true">
</a>

## How are you making this?
Currently, the Prism is based on the PinePhone, with a few modifications to the hardware (the back shell is one of the main customisations to the phone, allowing you to see inside), in addition to the software (using our own Linux-based mobile operating system).

We 3D-printed the back case, which admittedly took quite a few attempts; but the end result is awesome!

<div>
    <aui-card class="article_socialEmbed">
        <h3>@jthecoder on Twitter</h3>
        <p>
            New #PinePhone shell finished! It only took 4 attempts...<br>
            <br>
            Really pleased with the result, though!
        </p>
        <div class="article_socialEmbed_media">
            <img src="/media/blog/prism-building-open-smartphone/prism-tweet-1.jpg" alt="A view of the new back shell on a PinePhone, featuring a translucent, light plastic that lets you see the circuitry inside, and the blue-and-yellow LiveG logo.">
            <img src="/media/blog/prism-building-open-smartphone/prism-tweet-2.jpg" alt="A view of the same shell, at an angle to show the USB-C charging port.">
            <img src="/media/blog/prism-building-open-smartphone/prism-tweet-3.jpg" alt="A side view of the PinePhone shell, showing the yellow power button and blue volume buttons.">
            <img src="/media/blog/prism-building-open-smartphone/prism-tweet-4.jpg" alt="A top-down view of the back shell of the PinePhone.">
        </div>
        <p>13 February 2022 · <a href="https://twitter.com/jthecoder/status/1492914671569063949" target="_blank" aui-mode="cardLink">View on Twitter</a></p>
    </aui-card>
</div>

The main interface uses our own user environment, called [gShell](https://github.com/LiveGTech/gShell). It uses [Adapt UI](https://github.com/LiveGTech/Adapt-UI) ([web demo](https://livegtech.github.io/Adapt-UI/demos/all/)), which is the user interface design language and framework which we developed in-house over the course of a few months.

gShell itself is essentially just a really complex single-page website, all running locally inside an Electron process. This not only simplifies development and allows us to quickly prototype designs, but it also provides good support for animations and all of the polish that you'd expect on the modern smartphones of today.

I took a few photos and posted them on Twitter to show you what gShell looks like in real life:

<div>
    <aui-card class="article_socialEmbed">
        <h3>@jthecoder on Twitter</h3>
        <p>
            #LiveGOS runs really well on it! Nice and responsive, even for a non-Pro PinePhone<br>
            <br>
            (<a href="https://github.com/LiveGTech/gShell" target="_blank">https://github.com/LiveGTech/gShell</a>)
        </p>
        <div class="article_socialEmbed_media">
            <img src="/media/blog/prism-building-open-smartphone/gshell-tweet-1.jpg" alt="LiveG OS's gShell running on the PinePhone, showing the app switcher with the Adapt UI demo app open." class="article_socialEmbed_spanRows">
            <img src="/media/blog/prism-building-open-smartphone/gshell-tweet-2.jpg" alt="A top-down view of gShell on the PinePhone showing the Adapt UI demo app.">
            <img src="/media/blog/prism-building-open-smartphone/gshell-tweet-3.jpg" alt="A side angle view of the PinePhone, showing gShell's lock screen.">
        </div>
        <p>13 February 2022 · <a href="https://twitter.com/jthecoder/status/1492916198442422276 " target="_blank" aui-mode="cardLink">View on Twitter</a></p>
    </aui-card>
</div>

Of course, being Electron, it is possible to run gShell in its simulator mode on a desktop. This makes prototyping iterations of gShell and its associated apps much easier, and as a result, much faster; simply because it's more convenient to launch gShell on a development machine than it is to update the actual Prism itself to perform a very short test.

![A screenshot of the gShell simulator in a desktop environment](/media/blog/prism-building-open-smartphone/gshell-simulator.png)

## Accessibility
As with the physical world, accessibility is also extremely important in the digital world, too. Ensuring that both software and hardware is usable by everyone is a key aspect of developing successful products, and failing to do so can cause users to be excluded from being able to effectively operate your platform.

It's no wonder that we have baked accessibility support right into the Prism from the very start of our project: we've been ensuring that our product will be accessible for future assistive technologies that we will later build into gShell. However, it's not just ensuring compatibility that's important: we've also added some accessibility features into the phone from early on in order to ensure that the whole user interface is usable in its current state.

We've built in an often-overlooked assistive technology that often gets neglected in upcoming operating systems: Switch Navigation. It essentially allows the user to control their whole device using just at least one button, known as a switch. A demonstration of it is available at [15:09](https://youtu.be/pmOR2J9fDZM?t=909) in our video.

Here's a photo of what one of the features of Switch Navigation looks like:

![Switch Navigation in use on the Prism](/media/blog/prism-building-open-smartphone/prism-switch-nav-a11y.png)

The implementation of Switch Navigation in gShell has been inspired by quadriplegic YouTuber [Christopher Hills](https://www.youtube.com/user/icdhills), who makes extensive use of iOS's [Switch Control](https://support.apple.com/en-gb/HT201370) feature daily. Switch Control in iOS provides very similar functionality to our Switch Navigation. Christopher's videos have been monumental at raising awareness of this versatile assistive technology, which has enabled him to pilot drones, edit and produce production-quality videos, and more. His videos have given us a great insight into the daily uses of Switch Control, which we hope to integrate into Switch Navigation.

## Localisation
Localisation is also an important part of platform development, since it allows users who speak languages other than English to use our products, and truly make our products globally usable. Our main methods of localisation are through the Adapt UI framework, which provides the localisation infrastructure needed to translate our apps and make them available in different locales.

Adapt UI also ensures that apps and systems are laid out according to the rules of selected languages — in Arabic, for example, text is written from right to left, and so we need to factor this into our layout when Arabic is selected:

![Switch Navigation in use on the Prism](/media/blog/prism-building-open-smartphone/aui-l10n-arabic.png)

Feel free to [play around with our localisation demo](https://livegtech.github.io/Adapt-UI/demos/l10n/) and see how the layout changes depending on the language chosen!

## Conclusion
This is a brief overview of Project Prism so far. I go much more in-depth in the video at the start of this post, so be sure to check it out!

If you'd like, come and visit our [GitHub organisation](https://github.com/LiveGTech) to see our various ongoing projects with regards to the Prism. Why not star a few of our repos you find interesting — or, if you're keen — contribute to our projects? Your contributions are welcome; even if they are simple bug reports or documentation enhancements!

That's about it — thanks for reading about LiveG Project Prism!

---

_This article was originally posted on the [DEV Community](https://dev.to/liveg/project-prism-on-the-road-to-building-an-open-smartphone-50lg)._