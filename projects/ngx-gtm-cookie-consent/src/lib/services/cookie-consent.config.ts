import { InjectionToken } from '@angular/core';
import { NgcCookieConsentConfig } from 'ngx-cookieconsent';

export interface CookieConsentServiceConfig {
    /**
     * Controls whether or not the GTM script will be executed.
     * 
     * If `false`, the cookie is still set when the user interacts
     * with the consent popup.
     */
    enable?: boolean;
    /**
     * Override the name of the cookie which tracks the user's
     * consent status.
     */
    cookieName?: string;
    /**
     * Override the cookie's max age in seconds.
     */
    cookieMaxAge?: number;
    /**
     * Override the name of the GTM page view event.
     * 
     * The event is pushed to the dataLayer each time a `NavigationEnd`
     * router event occurs. You can react to this event in GTM to, for example,
     * send data to Google Analytics
     */
    gtmPageViewEventName?: string;
    /**
     * Your Google Tag Manager (GTM) container ID.
     * Typically looks like `GTM-12AB34C`.
     * 
     * Tracking will be disabled if this value is not provided
     */
    gtmContainerId?: string;
    /**
     * Override the GTM dataLayer name.
     */
    gtmDataLayerName?: string;
    cookieConsentPopUpConfig: NgcCookieConsentConfig;
}

export const COOKIE_CONSENT_SERVICE_CONFIG = new InjectionToken<CookieConsentServiceConfig>('CookieConsentServiceConfig');
