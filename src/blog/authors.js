/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

import * as $g from "https://opensource.liveg.tech/Adapt-UI/src/adaptui.js";

import * as common from "/common.js";

var authors = null;

export function getAuthorProperty(author, property = "name") {
    return (authors == null ? fetch("/blog/authors.json").then(function(response) {
        return response.json();
    }) : Promise.resolve({authors})).then(function(data) {
        authors = data.authors;

        var propertyValue = authors[author][property];

        if (typeof(propertyValue) != "object") {
            return Promise.resolve(propertyValue);
        }

        return Promise.resolve(
            propertyValue[common.LOCALE_CODE] ||
            propertyValue[authors[author].fallbackLocale || "en_GB"]
        );
    })
}

export function getAuthorProperties(author, properties) {
    var propertyValues = {};

    return Promise.all(properties.map(function(property) {
        return getAuthorProperty(author, property).then(function(value) {
            propertyValues[property] = value;

            return Promise.resolve();
        });
    })).then(function() {
        return Promise.resolve(propertyValues);
    });
}

export function renderAuthorInfoArea(author) {
    return getAuthorProperties(author, [
        "name",
        "description"
    ]).then(function(properties) {
        return Promise.resolve($g.create("div").add(
            $g.create("h4").setText(_("blog_byAuthor", {author: properties.name})),
            $g.create("p").setText(properties.description)
        ));
    });
}