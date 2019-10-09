function getCookie(name) {
    return !name ? '' : decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}

function setupGTM() {
    (function (w, d, s, l, i) {
        // @ts-ignore (TODO: Fix TS errors)
        w[l] = w[l] || []; w[l].push({
            'gtm.start': new Date().getTime(), event: 'gtm.js'
        // @ts-ignore (TODO: Fix TS errors)
        }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
    // @ts-ignore (TODO: Fix TS errors)
    })(window, document, 'script', window.ngxGtmCookieConsent.tracking.dataLayerName, window.ngxGtmCookieConsent.tracking.gtmContainerId);
}

function main() {
    // Only execute the script if run in a browser context (Angular Universal support)
    if (typeof window !== 'undefined') {
        // @ts-ignore (TODO: Fix TS errors)
        window.ngxGtmCookieConsent = window.ngxGtmCookieConsent || {};
        // @ts-ignore (TODO: Fix TS errors)
        window.ngxGtmCookieConsent.tracking = window.ngxGtmCookieConsent.tracking || {};

        // @ts-ignore (TODO: Fix TS errors)
        window.ngxGtmCookieConsent.cookieConsent = {
            eventName: 'expo-cookieconsent-change',
            listener: () => {
                // @ts-ignore (TODO: Fix TS errors)
                if (!window.ngxGtmCookieConsent.tracking.gtmContainerId) {
                    console.warn('GTM tracking is disabled. Set window.ngxGtmCookieConsent.tracking.gtmContainerId to activate it.');
                    return;
                }
                // @ts-ignore (TODO: Fix TS errors)
                if (!window.ngxGtmCookieConsent.tracking.enabled) {
                    console.warn('GTM tracking is disabled. Set window.ngxGtmCookieConsent.tracking.enabled to activate it.');
                    return;
                }

                // @ts-ignore (TODO: Fix TS errors)
                const cookie = getCookie(window.ngxGtmCookieConsent.cookieConsent.cookieName);
                if (cookie === 'allow') {
                    // Make sure dataLayer is present
                    // @ts-ignore (TODO: Fix TS errors)
                    window[window.ngxGtmCookieConsent.tracking.dataLayerName] = window[window.ngxGtmCookieConsent.tracking.dataLayerName] || [];

                    setupGTM();

                    // Listener is not needed anymore
                    // @ts-ignore (TODO: Fix TS errors)
                    window.removeEventListener(window.ngxGtmCookieConsent.cookieConsent.eventName, window.ngxGtmCookieConsent.cookieConsent.listener);
                }
            }
        }

        // Listen for changes in the user's cookieconsent status
        // @ts-ignore (TODO: Fix TS errors)
        window.addEventListener(window.ngxGtmCookieConsent.cookieConsent.eventName, window.ngxGtmCookieConsent.cookieConsent.listener);
    }
}

export const _null = null;

main();
