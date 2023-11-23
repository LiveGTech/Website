/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as $g from "https://opensource.liveg.tech/Adapt-UI/src/adaptui.js";

import * as website from "/script.js";
import * as playground from "/components/playground/playground.js";

const CHALLENGE_CODE_PARTS = `
import * as astronaut from "https://opensource.liveg.tech/Adapt-UI/astronaut/astronaut.js";
import * as cake from "./cake.js";

astronaut.render(
    cake.Background (
        cake.Layer({colour: "blue"}) (),
        cake.Base() ()
    )
);
////
import * as astronaut from "https://opensource.liveg.tech/Adapt-UI/astronaut/astronaut.js";
import * as cake from "./cake.js";

astronaut.render(
    cake.Background (
        cake.Layer({colour: {{ cakeColour }}}) (
            cake.Candle() (),
            cake.Candle() (),
            cake.Candle() ()
        ),
        cake.Base() ()
    )
);
////
import * as astronaut from "https://opensource.liveg.tech/Adapt-UI/astronaut/astronaut.js";
import * as cake from "./cake.js";

astronaut.render(
    cake.Background (
        cake.Layer({colour: {{ cakeColour }}}) (
            astronaut.repeat(5, cake.Candle() ())
        ),
        cake.Base() ()
    )
);
////
import * as astronaut from "https://opensource.liveg.tech/Adapt-UI/astronaut/astronaut.js";
import * as cake from "./cake.js";

astronaut.render(
    cake.Background (
        cake.Layer({colour: {{ cakeColour }}, width: 8}) (
            astronaut.repeat({{ candleCount }}, cake.Candle() ())
        ),
        cake.Layer() (),
        cake.Base() ()
    )
);
////
import * as astronaut from "https://opensource.liveg.tech/Adapt-UI/astronaut/astronaut.js";
import * as cake from "./cake.js";

astronaut.render(
    cake.Background (
        cake.Layer({colour: {{ cakeColour }}, width: 8}) (
            astronaut.repeat({{ candleCount }}, cake.Candle() ())
        ),
        cake.Layer({colour: {{ cakeColour2 }}}) (),
        cake.Base() ()
    )
);
`.split("////").map((part) => part.trim());

website.waitForLoad().then(function() {
    $g.sel(".bdayCodingActivity").clear().add(
        playground.Playground({
            importUrlBase: `${window.location.origin}/birthday/9/challenge`,
            defaultState: {
                cakeColour: `"red"`,
                candleCount: `9`,
                cakeColour2: `"green"`
            },
            steps: [
                {
                    instructions: _("birthday9_codingActivity_1"),
                    code: CHALLENGE_CODE_PARTS[0]
                },
                {
                    instructions: _("birthday9_codingActivity_2"),
                    confirmNext: true,
                    code: CHALLENGE_CODE_PARTS[0]
                },
                {
                    instructions: _("birthday9_codingActivity_3"),
                    useNewCode: true,
                    code: CHALLENGE_CODE_PARTS[1]
                },
                {
                    instructions: _("birthday9_codingActivity_4"),
                    confirmNext: true,
                    code: CHALLENGE_CODE_PARTS[1]
                },
                {
                    instructions: _("birthday9_codingActivity_5"),
                    useNewCode: true,
                    code: CHALLENGE_CODE_PARTS[2],
                    completionMatch: /astronaut\.repeat\((?:[6-9]|1[0-9])\b/
                },
                {
                    instructions: _("birthday9_codingActivity_6"),
                    confirmNext: true,
                    code: CHALLENGE_CODE_PARTS[2]
                },
                {
                    instructions: _("birthday9_codingActivity_7"),
                    useNewCode: true,
                    code: CHALLENGE_CODE_PARTS[3]
                },
                {
                    instructions: _("birthday9_codingActivity_8")
                },
                {
                    instructions: _("birthday9_codingActivity_9")
                },
                {
                    instructions: _("birthday9_codingActivity_10")
                },
                {
                    instructions: _("birthday9_codingActivity_11")
                }
            ],
            errorExplanations: [
                {
                    match: `SyntaxError: Unexpected token ')'`,
                    message: _("birthday9_codingActivity_errorExplanation_missingClosingBracket")
                },
                {
                    match: /^SyntaxError: Unexpected identifier '/,
                    message: _("birthday9_codingActivity_errorExplanation_missingComma")
                },
                {
                    match: "SyntaxError: Unexpected string",
                    message: _("birthday9_codingActivity_errorExplanation_missingColon")
                },
                {
                    match: "SyntaxError: Unexpected number",
                    message: _("birthday9_codingActivity_errorExplanation_missingColon")
                },
                {
                    match: `SyntaxError: missing ) after argument list`,
                    message: _("birthday9_codingActivity_errorExplanation_missingEnclosingBraceBrackets")
                }
            ]
        }) ()
    );
});