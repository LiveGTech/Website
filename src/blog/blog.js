/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as $g from "https://opensource.liveg.tech/Adapt-UI/src/adaptui.js";
import * as markup from "https://opensource.liveg.tech/Adapt-UI/src/markup.js";
import Fuse from "/lib/fuse.esm.js";

import * as common from "/common.js";
import * as website from "/script.js";
import * as authors from "/blog/authors.js";

var articleSearcher = null;

function renderArticles(articles) {
    if (articles.length > 0) {
        $g.sel(".blog_articles").clear();

        var promiseChain = Promise.resolve();

        articles.forEach(function(article) {
            promiseChain = promiseChain.then(function() {
                if (article.author == null) {
                    return Promise.resolve();
                }
                
                return authors.getAuthorProperty(article.author, "name");
            }).then(function(authorName) {
                var descriptionParagraph = $g.create("p");

                if (article.author != null) {
                    descriptionParagraph.add(
                        $g.create("span").setText(_("blog_byAuthor", {author: authorName})),
                        $g.create("span").setText(" · ")
                    );
                }

                if (article.publishedAt != null) {
                    descriptionParagraph.add(
                        $g.create("span").setText(_format(
                            new Date(article.publishedAt),
                            {weekday: "long", day: "numeric", month: "long", year: "numeric"}
                        )),
                        $g.create("span").setText(" · ")
                    );
                }

                descriptionParagraph.add(
                    $g.create("span").setText(article.description)
                );

                $g.sel(".blog_articles").add(
                    $g.create("aui-card")
                        .setAttribute("aui-linked", true)
                        .add(
                            $g.create("h2").add(
                                $g.create("a")
                                    .setAttribute("href", article.url)
                                    .setHTML(article.title)
                            ),
                            descriptionParagraph
                        )
                );

                return Promise.resolve();
            });
        });

        return promiseChain.then(function() {
            markup.apply();
            
            return Promise.resolve();
        });
    }

    $g.sel(".blog_articles").clear().add(
        $g.create("aui-message").add(
            $g.create("img")
                .setAttribute("src", "https://opensource.liveg.tech/Adapt-UI/icons/search.svg")
                .setAttribute("aui-icon", "dark")
                .setAttribute("aria-hidden", true)
            ,
            $g.create("h1").setText(_("blog_noResults_title")),
            $g.create("p").setText(_("blog_noResults_description"))

        )
    );

    return Promise.resolve();
}

function filterArticles(articles) {
    var language = common.LOCALE_CODE.split("_")[0];
    var currentLanguageArticles = articles.filter((article) => article.language == language);

    articles = (
        currentLanguageArticles.length > 0 ?
        currentLanguageArticles :
        articles.filter((article) => article.language == "en")
    );

    var filterByAuthor = $g.core.parameter("byAuthor");

    if (filterByAuthor != null) {
        articles = articles.filter((article) => article.author == filterByAuthor);

        authors.renderAuthorInfoArea(filterByAuthor).then(function(infoArea) {
            $g.sel(".blog_authorInfoAreaContainer").clear().add(infoArea);
        });
    }

    return articles;
}

function searchForArticles(query = $g.sel("#blog_search").getValue()) {
    var results = articleSearcher.search(query);

    return filterArticles(results.map((result) => result.item));
}

website.waitForLoad().then(function() {
    fetch("/blog/index.json").then(function(response) {
        return response.json();
    }).then(function(index) {
        articleSearcher = new Fuse(index.articles, {
            keys: ["title", "description"]
        });

        $g.sel("#blog_search").on("input", function() {
            if ($g.sel("#blog_search").getValue().trim() == "") {
                renderArticles(filterArticles(index.articles));

                return;
            }

            renderArticles(searchForArticles());
        });

        renderArticles(filterArticles(index.articles));
    });
});