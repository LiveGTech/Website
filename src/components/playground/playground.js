/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as astronaut from "https://opensource.liveg.tech/Adapt-UI/astronaut/astronaut.js";
import * as typeset from "https://opensource.liveg.tech/Typeset-Engine/src/typeset.js";

var c = astronaut.components;

typeset.init();

export var Playground = astronaut.component("Playground", function() {
    return c.Container({
        attributes: {
            "aui-stack": "horizontal"
        }
    }) (
        c.Container({
            attributes: {
                "aui-stack": "vertical"
            }
        }) (
            c.Card({
                styles: {
                    "flex-basis": "unset",
                    "margin-bottom": "0"
                }
            }) (
                c.Paragraph() ("Challenge text goes here")
            ),
            c.Container (
                typeset.CodeEditor({
                    language: "javascript",
                    code: `console.log("Hello, world!");`
                }) ()
            )
        ),
        c.Card({
            styles: {
                "margin-bottom": "0"
            }
        }) ()
    );
});