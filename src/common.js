/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as $g from "https://opensource.liveg.tech/Adapt-UI/src/adaptui.js";

export const IS_DUMMY = await fetch("/_real").then((response) => Promise.resolve(response.status != 200));
export const INCLUDE_PREFIX = IS_DUMMY ? "/_dummy" : "";

export const LOCALE_CODE = localStorage.getItem("liveg_website_lang") || $g.core.parameter("lang") || $g.l10n.getSystemLocaleCode();

const PLATFORMS_FROM_UA = {
    "LiveG OS": "livegOs",
    "CrOS": "chromiumOs",
    "Android": "android",
    "Linux": "linux",
    "Windows NT": "windows",
    "iPad": "iPadOs",
    "iPhone OS": "iOs",
    "Mac": "macOs"
};

export const PLATFORM = PLATFORMS_FROM_UA[Object.keys(PLATFORMS_FROM_UA).find((match) => navigator.userAgent.includes(match))] || "other";