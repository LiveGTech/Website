/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

export const IS_DUMMY = await fetch("/_real").then((response) => Promise.resolve(response.status != 200));
export const INCLUDE_PREFIX = IS_DUMMY ? "/_dummy" : "";

export const LOCALE_CODE = localStorage.getItem("liveg_website_lang") || $g.core.parameter("lang") || $g.l10n.getSystemLocaleCode();