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

export var Playground = astronaut.component("Playground", function(props, children) {
    props.steps ||= [];
    props.importUrlBase ||= window.location.origin;

    var instructionsCard = c.Card({
        styles: {
            "flex-basis": "unset",
        }
    }) ();

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

    function loadStep(step, setCode = false) {
        instructionsCard.setText(step.instructions);

        if (setCode) {
            editor.inter.setCode(step.code);

            update();
        }
    }

    editor.on("input", function() {
        if (updateTimeout != null) {
            clearTimeout(updateTimeout);
        }

        updateTimeout = setTimeout(update, 2_000);
    });

    embed.on("load", function() {
        var code = editor.inter.getCode();

        code = code.replace(/\s+from\s+"\.\//g, ` from "${props.importUrlBase}/`);
        code = code.replace(/\s+from\s+'\.\//g, ` from '${props.importUrlBase}/`);

        embed.get().contentWindow.postMessage(code, window.location.origin);
    });

    if (props.steps.length > 0) {
        loadStep(props.steps[0], true);
    }

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
            instructionsCard,
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
});