/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as $g from "https://opensource.liveg.tech/Adapt-UI/src/adaptui.js";

import * as website from "/script.js";
import * as authors from "/blog/authors.js";

website.waitForLoad().then(function() {
    var author = $g.sel("body").getAttribute("data-articleauthor");

    if (author != "") {
        authors.getAuthorProperty(author, "name").then(function(authorName) {
            $g.sel(".article_author").clear().add(
                $g.create("span").setText(_("blog_byAuthor_start")),
                $g.create("a")
                    .setAttribute("href", `/blog?byAuthor=${author}`)
                    .setText(authorName)
                ,
                $g.create("span").setText(_("blog_byAuthor_end")),
                $g.create("span").setText(" · ")
            );
        });

        authors.renderAuthorInfoArea(author, true).then(function(infoArea) {
            $g.sel(".article_contents").add(
                $g.create("hr"),
                infoArea
            );
        });
    }

    if ($g.sel("body").getAttribute("data-articlepublishedAt") != "") {
        var publishedAt = new Date(Number($g.sel("body").getAttribute("data-articlepublishedAt")));

        $g.sel(".article_publishedAt").setAttribute("datetime", publishedAt.toISOString());

        $g.sel(".article_publishedAt").setText(_format(
            publishedAt,
            {weekday: "long", day: "numeric", month: "long", year: "numeric"}
        ));
    }

    $g.sel(".article_contents a").forEach(function(element) {
        if (!element.hasAttribute("href")) {
            return;
        }

        var linkHost = new URL(element.getAttribute("href"), window.location.href).host;

        if (linkHost == window.location.host) {
            return;
        }

        element.setAttribute("target", "_blank");
    });

    $g.sel("title").setText(_("title_page", {page: $g.sel("title").getText()}));
});