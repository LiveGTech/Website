/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

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