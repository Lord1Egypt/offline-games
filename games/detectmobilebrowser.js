/**
 * detectmobilebrowser.js - Minimal stub
 * Original by sebarmeli - https://github.com/serbangilvitu/detectmobilebrowser
 */
(function(undefined) {
    if (typeof window !== 'undefined' && !window.mobilecheck) {
        var nav = navigator.userAgent || navigator.vendor || window.opera || '';
        window.mobilecheck = function() {
            return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(nav);
        };
        if (typeof jQuery !== 'undefined') {
            jQuery.browser = jQuery.browser || {};
            jQuery.browser.mobile = window.mobilecheck();
        }
    }
})();
