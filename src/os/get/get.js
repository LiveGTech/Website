/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as $g from "https://opensource.liveg.tech/Adapt-UI/src/adaptui.js";
import * as sizeUnits from "https://opensource.liveg.tech/Adapt-UI/src/sizeunits.js";

import * as common from "/common.js";
import * as website from "/script.js";

const LANGUAGE_NAMES = {
    "en_GB": "English (United Kingdom)",
    "fr_FR": "Français (France)",
    "zh_CN": "简体中文（中国）"
};

var releaseData = null;
var selectedReleaseIndex = null;
var selectedReleasePlatform = null;

function getLocalisedValue(object, key) {
    object[key] ||= {};

    return object[key][common.LOCALE_CODE] || object[key][object.fallbackLocale || "en_GB"];
}

function getLocalisedMarkdown(object, key) {
    return new showdown.Converter().makeHtml(getLocalisedValue(object, key) || "");
}

function updatePlatformDetails() {
    selectedReleasePlatform = $g.sel("#osGet_downloadPlatform").getValue();

    var release = releaseData.releases[selectedReleaseIndex];
    var platform = release.platforms[selectedReleasePlatform];

    var estimatedSizeParagraph = $g.create("p").hide();

    $g.sel("#osGet_downloadPlatformDetails").clear().add(
        $g.create("p").setHTML(
            platform.description ?
            getLocalisedMarkdown(platform, "description") :
            getLocalisedMarkdown(releaseData.platforms[selectedReleasePlatform], "description")
        ),
        estimatedSizeParagraph
    );

    fetch(platform.url).then(function(response) {
        estimatedSizeParagraph.setText(_("osGet_downloadSize", {size: sizeUnits.getString(response.headers.get("Content-Length"), _)}));
        estimatedSizeParagraph.show();
    });
}

function showRelease(releaseIndex = selectedReleaseIndex) {
    selectedReleaseIndex = releaseIndex;

    var release = releaseData.releases[selectedReleaseIndex];
    var supportedLanguageNames = _sort(release.supportedLanguages.map((language) => LANGUAGE_NAMES[language]));

    $g.sel("#osGet_downloadPlatform").clear().add(
        ...Object.keys(release.platforms).map((platform) => $g.create("option")
            .setAttribute("value", platform)
            .setText(getLocalisedValue(releaseData.platforms[platform], "name"))
        )
    );

    $g.sel(".osGet_releaseTitle").setText(getLocalisedValue(release, "title"));
    $g.sel(".osGet_version").setHTML(_("osGet_version", {version: release.version}));

    $g.sel(".osGet_description").setHTML(getLocalisedMarkdown(release, "description"));
    $g.sel(".osGet_releaseNotes").setHTML(getLocalisedMarkdown(release, "notes"));
    $g.sel(".osGet_systemRequirements").setHTML(getLocalisedMarkdown(release, "systemRequirements"));

    $g.sel(".osGet_supportedLanguages").clear().add(
        ...supportedLanguageNames.map((language) => $g.create("li").setText(language))
    );

    updatePlatformDetails();
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
        var fileExtension = platform.url.split(".").slice(-1);
        var filename = `${getLocalisedValue(release, "title")} ${release.version} (${selectedReleasePlatform}).${fileExtension}`;

        $g.sel("#osGet_downloadLink").setAttribute("href", platform.url);
        $g.sel("#osGet_downloadLink").setAttribute("download", filename);

        $g.sel("#osGet_downloadLink").get().click();

        fetch(
            "https://liveg.tech/api/telemetrics/event/os_downloadIm" +
            `?platform=${encodeURIComponent(selectedReleasePlatform)}` +
            `&version=${encodeURIComponent(release.version)}` +
            `&vernum=${encodeURIComponent(release.vernum)}` +
            `&hostOs=${encodeURIComponent(common.PLATFORM)}` +
            `&hostLocale=${encodeURIComponent(common.LOCALE_CODE)}`,
            {method: "POST"}
        ).then(function() {
            console.log("`os_downloadIm` event sent to LiveG Telemetrics");
        });
    });

    selectedReleaseIndex = releaseData.releases.length - 1;

    showRelease();
});