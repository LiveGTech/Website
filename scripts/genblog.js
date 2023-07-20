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

var articleTemplate = fs.readFileSync(path.join("templates", "article.html"), "utf-8");

var index = {
    articles: []
};

fs.readdirSync("articles").forEach(function(language) {
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
            pageHtml = pageHtml.split(`{{ ${key} }}`).join(metadata[key]);
        });

        pageHtml = pageHtml.split("{{ contents }}").join(html);
        pageHtml = pageHtml.replace(/\{\{ .* \}\}/g, "");

        var pagePathName = file.replace(/\.md$/, "");

        mkdirp.sync(path.join("src", "blog", language, pagePathName));
        fs.writeFileSync(path.join("src", "blog", language, pagePathName, "index.html"), pageHtml);

        index.articles.push({
            ...metadata,
            language,
            path: `/blog/${language}/${pagePathName}`
        });
    });
});

fs.writeFileSync(path.join("src", "blog", "index.json"), JSON.stringify(index, null, 4));