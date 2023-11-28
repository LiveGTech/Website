/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as astronaut from "https://opensource.liveg.tech/Adapt-UI/astronaut/astronaut.js";
import * as website from "/script.js";

var c = astronaut.components;

const COLOUR_NAMES = {
    "blue": "#558bf6",
    "blue-face": "#3373f1",
    "yellow": "#ffff99",
    "yellow-face": "#ffff00",
    "cyan": "#33c9ff",
    "cyan-face": "#00b0f0",
    "red": "#e06c6c",
    "red-face": "#d84747",
    "green": "#6cdf6c",
    "green-face": "#28bd28"
};

await website.waitForLoad();

var layerCount = 0;
var topLayerWidthIncreased = false;
var bottomLayerWidth = null;

var Rectangle = astronaut.component("Rectangle", function(props, children) {
    props.styles ||= {};
    props.styles["width"] ||= props.width ? `${props.width}rem` : "0";
    props.styles["height"] ||= props.height ? `${props.height}rem` : "0";
    props.styles["background-color"] ||= COLOUR_NAMES[props.colour] || props.colour;

    return c.Container(props) (...children);
});

var Ellipse = astronaut.component("Ellipse", function(props, children) {
    props.styles ||= {};
    props.styles["border-radius"] ||= "50%";

    return Rectangle(props) (...children);
});

var Cylinder = astronaut.component("Cylinder", function(props, children) {
    props.faceColour ||= COLOUR_NAMES[props.colour] ? COLOUR_NAMES[`${props.colour}-face`] : props.colour;
    props.faceHeight ||= (props.width * 0.25);

    props.styles ||= {};
    props.styles["display"] ||= "flex";
    props.styles["flex-direction"] ||= "column-reverse";
    props.styles["margin-top"] ||= `${-props.faceHeight / 2}rem`;
    props.styles["margin-bottom"] ||= `${-props.faceHeight / 2}rem`;

    return c.Container(props) (
        Ellipse({
            width: props.width,
            height: props.faceHeight,
            colour: props.colour
        }) (),
        Rectangle({
            width: props.width,
            height: props.height,
            colour: props.colour,
            styles: {
                "margin-top": `${-props.faceHeight / 2}rem`,
                "margin-bottom": `${-props.faceHeight / 2}rem`
            }
        }) (),
        Ellipse({
            width: props.width,
            height: props.faceHeight,
            colour: props.faceColour,
            styles: {
                "position": "relative",
                "z-index": "1"
            }
        }) (...children)
    );
});

export var Area = astronaut.component("Area", function(props, children) {
    props.styles ||= {};
    props.styles["display"] ||= "flex";
    props.styles["flex-direction"] ||= "column";
    props.styles["align-items"] ||= "center";

    children.forEach(function(child, i) {
        child.setStyle("z-index", children.length - i - 1);
    });

    return c.Container(props) (...children);
});

export var Background = astronaut.component("Background", function(props, children) {
    props.showing = true;

    props.styles ||= {};
    props.styles["display"] ||= "flex";
    props.styles["flex-direction"] ||= "column";
    props.styles["justify-content"] ||= "center";
    props.styles["align-items"] ||= "center";
    props.styles["background-color"] ||= COLOUR_NAMES[props.colour] || props.colour || "hsl(var(--primaryHue), calc(var(--primarySaturation) - 10%), calc(var(--primaryLightness) + 15%))";

    return c.Screen(props) (
        Area (
        ...children
        )
    );
});

export var Base = astronaut.component("Base", function(props, children) {
    props.width ||= 12;
    props.height ||= 0.5;

    if (props.width > 20 || props.height > 2) {
        throw new TypeError(_("birthday9_codingActivity_baseSizeError"));
    }

    if (layerCount == 2 && topLayerWidthIncreased && bottomLayerWidth > 10 && props.width > bottomLayerWidth) {
        _visitStep(10);
    }

    return Cylinder({
        width: props.width,
        height: props.height,
        faceHeight: props.faceHeight || undefined,
        colour: "#cccccc",
        faceColour: "#b2b2b2"
    }) (...children);
});

export var Layer = astronaut.component("Layer", function(props, children) {
    if (props.width > 18 || props.height > 8) {
        throw new TypeError(_("birthday9_codingActivity_layerSizeError"));
    }

    if (children.length > 20) {
        throw new TypeError(_("birthday9_codingActivity_candleCountError"));
    }

    if (props.color) {
        throw new ReferenceError(_("birthday9_codingActivity_colourSpellingError"));
    }

    layerCount++;
    bottomLayerWidth = props.width;

    if (children.length > 1) {
        children.forEach(function(child, i) {
            const INDEX_ANGLE = 2 * Math.PI * (i / children.length);
            const OFFSET_ANGLE = (1 / 8) * Math.PI;

            child.setStyle("left", `${50 + (Math.cos(INDEX_ANGLE + OFFSET_ANGLE) * 30)}%`);
            child.setStyle("bottom", `${50 + (Math.sin(INDEX_ANGLE + OFFSET_ANGLE) * 30)}%`);
        });

        _storeState({
            candleCount: JSON.stringify(children.length)
        });
    }

    if (children.length == 5) {
        _visitStep(3);
    }

    if (layerCount == 1 && props.colour && props.colour != "blue") {
        _visitStep(1, {
            cakeColour: JSON.stringify(props.colour)
        });
    }

    if (layerCount == 2 && props.colour) {
        _visitStep(7, {
            cakeColour2: JSON.stringify(props.colour)
        });
    }

    if (layerCount == 2 && props.height == 3) {
        _visitStep(8);
    }

    console.log(layerCount, props.width);

    if (layerCount == 1 && props.width > 9) {
        console.log("top", props.width);
        topLayerWidthIncreased = true;
    }

    if (layerCount == 2 && props.width > 10 && topLayerWidthIncreased) {
        console.log("bottom", props.width);
        _visitStep(9);
    }

    return Cylinder({
        width: props.width || 10,
        height: props.height || 4,
        faceHeight: props.faceHeight || undefined,
        colour: props.colour || "blue"
    }) (...children);
});

export var Candle = astronaut.component("Candle", function(props, children) {
    return Cylinder({
        width: props.width || 1,
        height: props.height || 4,
        faceHeight: props.faceHeight || undefined,
        colour: props.colour || "yellow",
        styles: {
            "position": "absolute",
            "bottom": "50%",
            "left": "50%",
            "transform": "translateX(-50%)"
        }
    }) (
        c.Image({
            source: "/media/birthday/flame.svg",
            alt: "",
            styles: {
                "position": "absolute",
                "bottom": "40%",
                "left": "50%",
                "width": "1rem",
                "transform": "translateX(-50%)",
                "cursor": "no-drop"
            },
            attributes: {
                "title": _("birthday9_codingActivity_doNotTouch")
            }
        }) ()
    );
});