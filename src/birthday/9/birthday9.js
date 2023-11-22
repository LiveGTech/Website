/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as $g from "https://opensource.liveg.tech/Adapt-UI/src/adaptui.js";

import * as playground from "/components/playground/playground.js";

const CHALLNGE_CODE_PARTS = `
import * as astronaut from "https://opensource.liveg.tech/Adapt-UI/astronaut/astronaut.js";
import * as cake from "./cake.js";

astronaut.render(
    cake.Background() (
        cake.Cake() (
            cake.Candle() (),
            cake.Candle() (),
            cake.Candle() (),
            cake.Candle() ()
        ),
        cake.Base() ()
    )
);
////
console.log("Hello, world!");
`.split("////").map((part) => part.trim());

$g.waitForLoad().then(function() {
    $g.sel(".bdayCodingActivity").clear().add(
        playground.Playground({
            steps: [
                {
                    instructions: "Hello, world! This is challenge step 1.",
                    code: CHALLNGE_CODE_PARTS[0]
                },
                {
                    instructions: "This is challenge step 2.",
                    code: CHALLNGE_CODE_PARTS[1]
                },
            ],
            importUrlBase: `${window.location.origin}/birthday/9/challenge`
        }) ()
    );
});