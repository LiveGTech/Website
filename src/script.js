/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as $g from "https://livegtech.github.io/Adapt-UI/src/adaptui.js";

$g.waitForLoad().then(function() {
    $g.sel(".nav_openMenu").on("click", function() {
        $g.sel("aside").asideOpen();
    });
});