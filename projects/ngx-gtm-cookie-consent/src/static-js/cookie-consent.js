function getCookie(name) {
    return !name ? '' : decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}

function setupGTM() {
    (function (w, d, s, l, i) {
        w[l] = w[l] || []; w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'
        }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
        'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
    })(window, document, 'script', window.ngxGtmCookieConsent.tracking.dataLayerName, window.ngxGtmCookieConsent.tracking.gtmContainerId);
}

function main() {
    // Only execute the script if run in a browser context (Angular Universal support)
    if (typeof window !== 'undefined') {
        window.ngxGtmCookieConsent = window.ngxGtmCookieConsent || {};
        window.ngxGtmCookieConsent.tracking = window.ngxGtmCookieConsent.tracking || {};

        window.ngxGtmCookieConsent.cookieConsent = {
            eventName: 'expo-cookieconsent-change',
            listener: () => {
                if (!window.ngxGtmCookieConsent.tracking.gtmContainerId) {
                    console.warn('GTM tracking is disabled. Set window.ngxGtmCookieConsent.tracking.gtmContainerId to activate it.');
                    return;
                }
                if (!window.ngxGtmCookieConsent.tracking.enabled) {
                    console.warn('GTM tracking is disabled. Set window.ngxGtmCookieConsent.tracking.enabled to activate it.');
                    return;
                }

                const cookie = getCookie(window.ngxGtmCookieConsent.cookieConsent.cookieName);
                if (cookie === 'allow') {
                    // Make sure dataLayer is present
                    window[window.ngxGtmCookieConsent.tracking.dataLayerName] = window[window.ngxGtmCookieConsent.tracking.dataLayerName] || [];

                    setupGTM();

                    // Listener is not needed anymore
                    window.removeEventListener(window.ngxGtmCookieConsent.cookieConsent.eventName, window.ngxGtmCookieConsent.cookieConsent.listener);
                }
            }
        }

        // Listen for changes in the user's cookieconsent status
        window.addEventListener(window.ngxGtmCookieConsent.cookieConsent.eventName, window.ngxGtmCookieConsent.cookieConsent.listener);
    }
}

main();
