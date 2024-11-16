/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as $g from "https://opensource.liveg.tech/Adapt-UI/src/adaptui.js";

import * as website from "/script.js";

website.waitForLoad().then(function() {
    window.addEventListener("scroll", function(event) {
        var angle = 20 - (window.scrollY / (window.innerHeight / 15));

        if (angle < 5) {
            angle = 5;
        }

        $g.sel(".birthday10_frame").setStyle("transform", `perspective(50rem) rotateX(${angle}deg)`);

        var coverRect = $g.sel(".birthday10_cover").get().getBoundingClientRect();
        var navRect = $g.sel("nav").get().getBoundingClientRect();

        console.log(window.scrollY, coverRect.top + coverRect.height);

        if (coverRect.top + coverRect.height < navRect.height) {
            $g.sel("nav").removeClass("black");
        } else {
            $g.sel("nav").addClass("black");
        }
    });

    fetch("/media/birthday/10/10-keyframable.svg").then(function(response) {
        return response.text();
    }).then(function(html) {
        $g.sel(".birthday10_keyframable").setHTML(html);
    });
});