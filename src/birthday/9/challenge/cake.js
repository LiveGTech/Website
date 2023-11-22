/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as astronaut from "https://opensource.liveg.tech/Adapt-UI/astronaut/astronaut.js";

var c = astronaut.components;

var Rectangle = astronaut.component("Rectangle", function(props, children) {
    props.styles ||= {};
    props.styles["width"] = props.width ? `${props.width}rem` : "0";
    props.styles["height"] = props.height ? `${props.height}rem` : "0";
    props.styles["background-color"] = props.background;

    return c.Container(props) (...children);
});

var Ellipse = astronaut.component("Ellipse", function(props, children) {
    props.styles ||= {};
    props.styles["border-radius"] = "50%";

    return Rectangle(props) (...children);
});

var Cylinder = astronaut.component("Cylinder", function(props, children) {
    props.height ||= (props.width * 0.25);

    props.styles ||= {};
    props.styles["display"] = "flex";
    props.styles["flex-direction"] = "column-reverse";
    props.styles["margin-top"] = `${-props.height / 2}rem`;
    props.styles["margin-bottom"] = `${-props.height / 2}rem`;

    return c.Container(props) (
        Ellipse({
            width: props.width,
            height: props.height,
            background: props.bodyBackground
        }) (),
        Rectangle({
            width: props.width,
            height: props.depth,
            background: props.bodyBackground,
            styles: {
                "margin-top": `${-props.height / 2}rem`,
                "margin-bottom": `${-props.height / 2}rem`
            }
        }) (),
        Ellipse({
            width: props.width,
            height: props.height,
            background: props.background,
            styles: {
                "z-index": "1"
            }
        }) ()
    );
});

export var Area = astronaut.component("Area", function(props, children) {
    props.styles ||= {};
    props.styles["display"] = "flex";
    props.styles["flex-direction"] = "column";
    props.styles["align-items"] = "center";

    children.forEach(function(child, i) {
        child.setStyle("z-index", children.length - i - 1);
    });

    return c.Container(props) (...children);
});

export var Background = astronaut.component("Background", function(props, children) {
    props.showing = true;

    props.styles ||= {};
    props.styles["display"] = "flex";
    props.styles["flex-direction"] = "column";
    props.styles["justify-content"] = "center";
    props.styles["align-items"] = "center";
    props.styles["background-color"] = "var(--primaryUI)";

    return c.Screen(props) (
        Area (
        ...children
        )
    );
});

export var Base = astronaut.component("Base", function(props, children) {
    return Cylinder({width: props.width || 12, height: props.height, depth: props.depth || 0.5, background: "#b2b2b2", bodyBackground: "#cccccc"}) ();
});