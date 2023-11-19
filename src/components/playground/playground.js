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
    var editor = typeset.CodeEditor({
        language: "javascript",
        code: `console.log("Hello, world!");`
    }) ();

    var embed = c.ElementNode("iframe", {
        attributes: {
            "src": "/components/playground/embed.html"
        },
        styles: {
            "width": "100%",
            "height": "100%",
            "border": "none"
        }
    }) ();

    var updateTimeout = null;

    function update() {
        embed.setAttribute("src", embed.getAttribute("src"));
    }

    editor.on("input", function() {
        clearTimeout(updateTimeout);

        setTimeout(update, 2_000);
    });

    embed.on("load", function() {
        embed.get().contentWindow.postMessage(editor.inter.getCode(), window.location.origin);
    });

    return c.Container({
        attributes: {
            "aui-stack": "horizontal"
        }
    }) (
        c.Container({
            attributes: {
                "aui-stack": "vertical"
            },
            styles: {
                "min-width": "0",
                "gap": "0",
                "flex-basis": "0"
            }
        }) (
            c.Card({
                styles: {
                    "flex-basis": "unset",
                }
            }) (
                c.Paragraph() ("Challenge text goes here")
            ),
            c.Container (
                editor
            )
        ),
        c.Container({
            styles: {
                "margin-top": "0.5rem",
                "flex-basis": "0",
                "border": "0.25rem solid var(--secondaryBackground)",
                "border-radius": "0.5rem",
                "overflow": "hidden"
            }
        }) (
            embed
        )
    );

    update();
});