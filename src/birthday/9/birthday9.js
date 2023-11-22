/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as $g from "https://opensource.liveg.tech/Adapt-UI/src/adaptui.js";

import * as playground from "/components/playground/playground.js";

const CHALLENGE_INSTRUCTION_PARTS = `
Edit the code to choose a new colour for the cake. You can choose from \`"cyan"\`, \`"yellow"\`, \`"red"\` or \`"green"\`.
////
Well done! Ready to continue?
////
This is the last challenge step.
`.split("////").map((part) => part.trim());

const CHALLNGE_CODE_PARTS = `
import * as astronaut from "https://opensource.liveg.tech/Adapt-UI/astronaut/astronaut.js";
import * as cake from "./cake.js";

astronaut.render(
    cake.Background (
        cake.Cake({colour: "blue"}) (),
        cake.Base() ()
    )
);
////
import * as astronaut from "https://opensource.liveg.tech/Adapt-UI/astronaut/astronaut.js";
import * as cake from "./cake.js";

astronaut.render(
    cake.Background (
        cake.Cake({colour: {{ cakeColour }}}) (
            cake.Candle() (),
            cake.Candle() (),
            cake.Candle() ()
        ),
        cake.Base() ()
    )
);
`.split("////").map((part) => part.trim());

$g.waitForLoad().then(function() {
    $g.sel(".bdayCodingActivity").clear().add(
        playground.Playground({
            steps: [
                {
                    instructions: CHALLENGE_INSTRUCTION_PARTS[0],
                    code: CHALLNGE_CODE_PARTS[0]
                },
                {
                    instructions: CHALLENGE_INSTRUCTION_PARTS[1],
                    confirmNext: true,
                    code: CHALLNGE_CODE_PARTS[0]
                },
                {
                    instructions: CHALLENGE_INSTRUCTION_PARTS[2],
                    useNewCode: true,
                    code: CHALLNGE_CODE_PARTS[1]
                },
            ],
            importUrlBase: `${window.location.origin}/birthday/9/challenge`
        }) ()
    );
});