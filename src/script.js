/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as $g from "https://opensource.liveg.tech/Adapt-UI/src/adaptui.js";

import * as common from "/common.js";

var loaded = false;
var loadCallbacks = [];

export function waitForLoad() {
    return new Promise(function(resolve, reject) {
        if (loaded) {
            resolve();

            return;
        }

        loadCallbacks.push(resolve);
    });
}

$g.waitForLoad().then(function() {
    return $g.templates.apply();
}).then(function() {
    return $g.l10n.selectLocaleFromResources({
        "en_GB": "/locales/en_GB.json?v=5",
        "fr_FR": "/locales/fr_FR.json?v=5",
        "zh_CN": "/locales/zh_CN.json?v=5"
    }, "en_GB", {
        "fr_FR": "en_GB",
        "zh_CN": "en_GB"
    }, common.LOCALE_CODE);
}).then(function(locale) {
    window._ = function() {
        return locale.translate(...arguments);
    };

    window._format = function() {
        return locale.format(...arguments);
    };

    window._sort = function(items) {
        return items.sort(locale.createCollator().compare);
    };

    $g.l10n.translateApp(locale);

    $g.sel("body").removeAttribute("hidden");

    if ($g.sel("title").items().length > 0) {
        if ($g.sel("title").hasAttribute("data-page")) {
            $g.sel("title").setText(_("title_page", {page: _($g.sel("title").getAttribute("data-page"))}));
        } else if ($g.sel("title").hasAttribute("data-enclose")) {
            $g.sel("title").setText(_("title_page", {page: $g.sel("title").getText()}));
        } else if ($g.sel("title").is("[translate]")) {
            $g.sel("title").setText(_($g.sel("title").getAttribute("aui-l10nstring")));
        }
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

    window.addEventListener("scroll", function() {
        $g.sel(".fadeInOnScroll").forEach(function(element) {
            var rect = element.get().getBoundingClientRect();

            if (rect.top < window.innerHeight * (9 / 10)) {
                element.fadeIn();

                element.removeClass("fadeInOnScroll");
            }
        });
    });

    // Show LiveG Birthday celebrations
    if (new Date().getDate() == 30 && new Date().getMonth() == 10 && new Date().getFullYear() == 2024) { // Checked against local time zone
        $g.sel(".birthday").show();
    } else if (Date.now() < new Date("2024-11-30T00:00:00.000-12:00").getTime()) { // By this time, UTC-12 will also have started celebrating the birthday
        $g.sel(".birthdaySoon").show();
    }

    loaded = true;

    loadCallbacks.forEach((callback) => callback());
});