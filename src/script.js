/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as $g from "https://livegtech.github.io/Adapt-UI/src/adaptui.js";

$g.waitForLoad().then(function() {
    return $g.templates.apply();
}).then(function() {
    return $g.l10n.selectLocaleFromResources({
        "en_GB": "/locales/en_GB.json",
        "fr_FR": "/locales/fr_FR.json"
    }, "en_GB", {}, $g.core.parameter("lang") || $g.l10n.getSystemLocaleCode());
}).then(function(locale) {
    window._ = function() {
        return locale.translate(...arguments);
    };

    $g.l10n.translateApp(locale);
}).then(function() {
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

        window.location.href = `${window.location.href.split("?")[0]}?lang=${encodeURIComponent(locale)}`;
    });
});