/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as $g from "https://opensource.liveg.tech/Adapt-UI/src/adaptui.js";

$g.waitForLoad().then(function() {
    return $g.templates.apply();
}).then(function() {
    return $g.l10n.selectLocaleFromResources({
        "en_GB": "/locales/en_GB.json",
        "fr_FR": "/locales/fr_FR.json",
        "zh_CN": "/locales/zh_CN.json"
    }, "en_GB", {
        "fr_FR": "en_GB",
        "zh_CN": "en_GB"
    }, localStorage.getItem("liveg_website_lang") || $g.core.parameter("lang") || $g.l10n.getSystemLocaleCode());
}).then(function(locale) {
    window._ = function() {
        return locale.translate(...arguments);
    };

    $g.l10n.translateApp(locale);

    $g.sel("body").removeAttribute("hidden");

    if ($g.sel("title").hasAttribute("data-page")) {
        $g.sel("title").setText(_("title_page", {page: _($g.sel("title").getAttribute("data-page"))}));
    }

    $g.sel(".nav_openMenu").on("click", function() {
        $g.sel("aside").asideOpen();
    });

    $g.sel(".l10n_openMenu").on("click", function() {
        $g.sel(".l10n_menu").setStyle("display", "block");
        $g.sel(".l10n_menu").menuOpen();
    });

    $g.sel(".l10n_menu button").on("click", function(event) {
        var locale = event.target.getAttribute("data-locale");

        localStorage.setItem("liveg_website_lang", locale);

        window.location.href = `${window.location.href.split("?")[0]}?lang=${encodeURIComponent(locale)}`;
    });

    // Show LiveG Birthday celebrations
    if (new Date().getDate() == 30 && new Date().getMonth() == 10 && new Date().getFullYear() == 2022) {
        $g.sel(".birthday").show();
    }
});