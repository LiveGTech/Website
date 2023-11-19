/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as astronaut from "https://opensource.liveg.tech/Adapt-UI/astronaut/astronaut.js";

var c = astronaut.components;

export var Playground = astronaut.component("Playground", function() {
    // TODO: Implement playground
    return c.Container() (
        c.Paragraph() ("Playground goes here")
    );
});