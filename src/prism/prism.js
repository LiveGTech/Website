/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as $g from "https://opensource.liveg.tech/Adapt-UI/src/adaptui.js";

$g.waitForLoad().then(function() {
    $g.sel(".prismDayNight_toggle input").on("change", function() {
        if ($g.sel(".prismDayNight_toggle input").getValue()) {
            $g.sel(".prismDayNight").addClass("night");
        } else {
            $g.sel(".prismDayNight").removeClass("night");
        }
    });
});