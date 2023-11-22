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

    var currentStepIndex = 0;

    var instructionsCard = c.Card({
        styles: {
            "flex-basis": "unset"
        }
    }) ();

    var errorMessage = c.Note({
        mode: "dangerous",
        styles: {
            "margin": "0",
            "margin-top": "0.5rem",
            "flex-grow": "unset",
            "flex-basis": "unset"
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
            "min-height": "20rem",
            "border": "none"
        }
    }) ();

    var updateTimeout = null;

    function update() {
        errorMessage.hide();

        embed.setAttribute("src", embed.getAttribute("src"));
    }

    function loadStep(stepIndex = currentStepIndex + 1, setCode = false) {
        currentStepIndex = stepIndex;

        instructionsCard.setText(props.steps[currentStepIndex].instructions);

        errorMessage.hide();

        if (setCode) {
            editor.inter.setCode(props.steps[currentStepIndex].code);

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

    window.addEventListener("message", function(event) {
        if (event.origin != window.location.origin) {
            return;
        }

        if (event.source != embed.get().contentWindow) {
            return;
        }

        if (event.data.type == "error") {
            console.warn("Error in playground embed:", event.data.error);

            var skipLink = c.Link({
                url: "javascript:void(0);",
                styles: {
                    "color": "var(--dangerousUI)"
                }
            }) (_("playground_error_skipLink"));

            var skipMessage = c.Paragraph({
                styles: {
                    "margin-top": "0.5rem"
                }
            }) (
                c.Text(_("playground_error_skipMessage")),
                skipLink
            );

            skipLink.on("click", function() {
                loadStep(currentStepIndex + 1, true);
            });

            errorMessage.clear().add(
                c.Paragraph({
                    styles: {
                        "margin-bottom": "0.5rem"
                    }
                }) (
                    c.BoldTextFragment() (_("playground_error_title")),
                    c.Text(_("playground_error_description"))
                ),
                c.CodeBlock({
                    styles: {
                        "margin": "0",
                        "white-space": "pre-wrap"
                    }
                }) (c.Text(event.data.error))
            );

            if (currentStepIndex + 1 < props.steps.length) {
                errorMessage.add(skipMessage);
            }

            errorMessage.show();
        }
    });

    errorMessage.hide();

    if (props.steps.length > 0) {
        loadStep(0, true);
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
            attributes: {
                "aui-stack": "vertical"
            },
            styles: {
                "gap": "0"
            }
        }) (
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
            ),
            errorMessage
        )
    );
});