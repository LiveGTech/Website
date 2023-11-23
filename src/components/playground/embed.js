/*
    LiveG Website

    Copyright (C) LiveG. All Rights Reserved.

    https://liveg.tech
    Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.
*/

window.alert = function() {};
window.prompt = function() {};
window.confirm = function() {};

window._storeState = function(heldState = {}) {
    window.parent.postMessage({
        type: "storeState",
        heldState
    }, window.location.origin);
};

window._visitStep = function(stepIndex, heldState = {}) {
    window.parent.postMessage({
        type: "visitStep",
        stepIndex,
        heldState
    }, window.location.origin);
};

window.addEventListener("message", function(event) {
    if (event.origin != window.location.origin) {
        return;
    }

    if (event.data.type == "load") {
        import(URL.createObjectURL(
            new Blob([event.data.code], {type: "text/javascript"})
        )).then(function() {
            window.parent.postMessage({type: "success"});
        }).catch(function(error) {
            window.parent.postMessage({
                type: "error",
                error
            }, window.location.origin);
        });
    }
});