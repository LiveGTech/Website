/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

window.alert = function() {};
window.prompt = function() {};
window.confirm = function() {};

window.addEventListener("message", function(event) {
    if (![
        "https://liveg.tech",
        "http://localhost:8000"
    ].includes(event.origin)) {
        return
    }

    import("data:text/javascript;charset=utf-8," + encodeURI(event.data));
});