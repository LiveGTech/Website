/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as $g from "https://opensource.liveg.tech/Adapt-UI/src/adaptui.js";

import * as playground from "/components/playground/playground.js";

$g.waitForLoad().then(function() {
    $g.sel(".bdayCodingActivity").clear().add(
        playground.Playground() ()
    );
});