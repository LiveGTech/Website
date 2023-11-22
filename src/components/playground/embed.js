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
    if (event.origin != window.location.origin) {
        return;
    }

    import("data:text/javascript;charset=utf-8," + encodeURI(event.data)).catch(function(error) {
        window.parent.postMessage({
            type: "error",
            error
        }, window.location.origin);
    });
});