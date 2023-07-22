/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as $g from "https://opensource.liveg.tech/Adapt-UI/src/adaptui.js";

import * as website from "/script.js";

website.waitForLoad().then(function() {
    $g.sel(".article_publishedAt").setText(_format(
        new Date(Number($g.sel("body").getAttribute("data-articlepublishedAt"))),
        {weekday: "long", day: "numeric", month: "long", year: "numeric"}
    ));

    $g.sel(".article_contents a").forEach(function(element) {
        if (!element.hasAttribute("href")) {
            return;
        }

        var linkHost = new URL(element.getAttribute("href"), window.location.href).host;

        if (linkHost == window.location.host) {
            return;
        }

        element.setAttribute("target", "_blank");
    });
});