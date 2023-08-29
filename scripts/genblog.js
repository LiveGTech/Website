/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const showdown = require("showdown");
const feed = require("feed");
const htmlEntities = require("html-entities");

var articleTemplate = fs.readFileSync(path.join("templates", "article.html"), "utf-8");

var index = {
    articles: []
};

fs.readdirSync("articles").forEach(function(language) {
    var currentFeed = new feed.Feed({
        id: `https://liveg.tech/blog/${language}/atom.xml`,
        title: {
            en: "The LiveG Blog",
            fr: "Le Blog LiveG",
            zh: "力格博客"
        }[language],
        description: {
            en: "Keep up-to-date with the latest news and information from LiveG.",
            fr: "Tenez-vous au courant des dernières nouvelles et informations de LiveG.",
            zh: "及时了解力格的最新新闻和信息。"
        }[language],
        language,
        image: "https://liveg.tech/logo.png",
        favicon: "https://liveg.tech/logo.png",
        copyright: {
            en: "Copyright © LiveG. All Rights Reserved.",
            fr: "Droits d'auteur © LiveG. Tous les droits sont réservés.",
            zh: "版权所有©力格。版权所有。"
        }[language],
        updated: new Date(),
        generator: "https://github.com/LiveGTech/Website"
    });

    fs.readdirSync(path.join("articles", language)).forEach(function(file) {
        var contents = fs.readFileSync(path.join("articles", language, file), "utf-8");
        var converter = new showdown.Converter({metadata: true});
        var pageHtml = articleTemplate;
        var html = converter.makeHtml(contents);
        var metadata = converter.getMetadata();

        if (metadata.publishedAt) {
            metadata.publishedAt = Number(metadata.publishedAt);
        }

        Object.keys(metadata).forEach(function(key) {
            if (typeof(metadata[key]) == "string") {
                metadata[key] = metadata[key].replace(/&amp;/g, "&");
            }

            if (typeof(metadata[key]) == "null") {
                pageHtml = pageHtml.split(`{{ ${key} }}`).join("");

                return;
            }

            pageHtml = pageHtml.split(`{{ ${key} }}`).join(String(metadata[key])
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
            );
        });

        pageHtml = pageHtml.split("{{ contents }}").join(html);
        pageHtml = pageHtml.replace(/\{\{ .* \}\}/g, "");

        var pagePathName = file.replace(/\.md$/, "");

        mkdirp.sync(path.join("src", "blog", language, pagePathName));
        fs.writeFileSync(path.join("src", "blog", language, pagePathName, "index.html"), pageHtml);

        index.articles.push({
            ...metadata,
            language,
            url: `/blog/${language}/${pagePathName}`
        });

        var resolvedUrl = `https://liveg.tech/blog/${language}/${pagePathName}`;

        currentFeed.addItem({
            title: htmlEntities.decode(metadata.title),
            description: htmlEntities.decode(metadata.description),
            content: html,
            id: resolvedUrl,
            link: resolvedUrl,
            author: metadata.author ? [
                {
                    name: metadata.author,
                    link: `https://liveg.tech/blog/?byAuthor=${encodeURIComponent(metadata.author)}`
                }
            ] : undefined,
            date: new Date(metadata.publishedAt)
        })
    });

    fs.writeFileSync(path.join("src", "blog", language, "atom.xml"), currentFeed.atom1());
});

index.articles = index.articles.sort((a, b) => b.publishedAt - a.publishedAt);

fs.writeFileSync(path.join("src", "blog", "index.json"), JSON.stringify(index, null, 4));