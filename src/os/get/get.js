/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as $g from "https://opensource.liveg.tech/Adapt-UI/src/adaptui.js";
import * as sizeUnits from "https://opensource.liveg.tech/Adapt-UI/src/sizeunits.js";

import * as website from "/script.js";
import * as common from "/common.js";

var releaseData = null;
var selectedReleaseIndex = null;
var selectedReleasePlatform = null;

function getLocalisedValue(object, key) {
    return object[key][common.LOCALE_CODE] || object[key][object.fallbackLocale || "en_GB"];
}

function updatePlatformDetails() {
    selectedReleasePlatform = $g.sel("#osGet_downloadPlatform").getValue();

    var release = releaseData.releases[selectedReleaseIndex];
    var platform = release.platforms[selectedReleasePlatform];

    var estimatedSizeParagraph = $g.create("p").hide();

    $g.sel("#osGet_downloadPlatformDetails").clear().add(
        $g.create("p").setText(
            platform.description ?
            getLocalisedValue(platform, "description") :
            getLocalisedValue(releaseData.platforms[selectedReleasePlatform], "description")
        ),
        estimatedSizeParagraph
    );

    fetch(platform.url).then(function(response) {
        estimatedSizeParagraph.setText(_("osGet_downloadSize", {size: sizeUnits.getString(response.headers.get("Content-Length"), _)}));
        estimatedSizeParagraph.show();
    });
}

website.waitForLoad().then(function() {
    return fetch(`${common.INCLUDE_PREFIX}/os/releases/index.json`);
}).then(function(response) {
    return response.json();
}).then(function(data) {
    releaseData = data;

    $g.sel("#osGet_downloadPlatform").on("change", function() {
        updatePlatformDetails();
    });

    $g.sel("#osGet_downloadButton").on("click", function() {
        $g.sel("#osGet_downloadDialog").dialogOpen();
    });

    $g.sel("#osGet_downloadConfirmButton").on("click", function() {
        var release = releaseData.releases[selectedReleaseIndex];
        var platform = release.platforms[selectedReleasePlatform];

        $g.sel("#osGet_downloadLink").setAttribute("href", platform.url);

        $g.sel("#osGet_downloadLink").get().click();
    });

    selectedReleaseIndex = releaseData.releases.length - 1;

    var release = releaseData.releases[selectedReleaseIndex];

    $g.sel("#osGet_downloadPlatform").clear().add(
        ...Object.keys(release.platforms).map((platform) => $g.create("option")
            .setAttribute("value", platform)
            .setText(getLocalisedValue(releaseData.platforms[platform], "name"))
        )
    );

    updatePlatformDetails();
});