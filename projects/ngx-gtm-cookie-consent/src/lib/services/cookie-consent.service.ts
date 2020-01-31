import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgcCookieConsentConfig, NgcCookieConsentService } from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';
import { CookieConsentServiceConfig, COOKIE_CONSENT_SERVICE_CONFIG } from './cookie-consent.config';

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService implements OnDestroy {

  private cookieConsentStatusChangeSubscription: Subscription;
  private routerEventSubscription: Subscription;

  private readonly defaultConfig: CookieConsentServiceConfig = {
    enable: false,
    cookieName: 'ngx-gtm-cookie-consent',
    gtmPageViewEventName: 'angular-page-view',
    gtmDataLayerName: 'dataLayer',
    cookieConsentPopUpConfig: undefined
  };

  // A namespace in the global window object used by the library
  private readonly namespace: any;

  constructor(
    @Inject(PLATFORM_ID)
    private readonly platformId: Object,
    @Inject(COOKIE_CONSENT_SERVICE_CONFIG)
    private readonly config: CookieConsentServiceConfig,
    private readonly consentService: NgcCookieConsentService,
    private readonly router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.namespace = (window as any)['ngxGtmCookieConsent'];
      this.initOptions();
      this.initCookieConsent();
      this.initPageViewTracking();
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.config.enable) {
      this.cookieConsentStatusChangeSubscription.unsubscribe();
      this.routerEventSubscription.unsubscribe();
    }
  }

  /**
   * Sets the configuration of the underlying `ngx-cookieconsent`
   * instance and re-initializes the service.
   *
   * For example, this can be used to change the text content of
   * the cookie banner when the user switches the locale.
   *
   * @param conf config options for `ngx-cookieconsent`
   */
  setCookieConsentConfig(conf: NgcCookieConsentConfig) {
    this.config.cookieConsentPopUpConfig = conf;
    this.initConsentService();
    this.initCookieConsent();
    this.initPageViewTracking();
  }

  private initPageViewTracking() {
    if (!this.config.enable) {
      return;
    }

    this.routerEventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.pushPageViewEvent()
      }
    });
  }

  private pushPageViewEvent() {
    const dataLayer = window[this.namespace.tracking.dataLayerName] as any;
    if (typeof dataLayer !== 'undefined') {
      dataLayer.push({
        event: this.config.gtmPageViewEventName || this.defaultConfig.gtmPageViewEventName,
        url: this.router.url
      });
    }
  }

  private initOptions() {
    this.config.cookieName = this.config.cookieName || this.defaultConfig.cookieName;
    this.config.enable = this.config.enable || this.defaultConfig.enable;
    this.config.gtmDataLayerName = this.config.gtmDataLayerName || this.defaultConfig.gtmDataLayerName;
    this.config.cookieMaxAge = 60 * 60 * 24 * 365; // 1 year

    this.namespace.cookieConsent.cookieName = this.config.cookieName;
    this.namespace.tracking.gtmContainerId = this.config.gtmContainerId;
    this.namespace.tracking.enabled = this.config.enable;
    this.namespace.tracking.dataLayerName = this.config.gtmDataLayerName;
    (window[this.namespace.tracking.dataLayerName] as any) = [];

    this.initConsentService();
  }

  /**
   * Sets the config for the underlying `ngx-cookieconsent` and
   * re-initializes the instance.
   */
  private initConsentService() {
    this.config.cookieConsentPopUpConfig.cookie.name = this.config.cookieName;
    this.consentService.destroy();
    this.consentService.init(this.config.cookieConsentPopUpConfig);
  }

  private initCookieConsent() {
    // Dispatch an event when the cookie consent status changes
    this.cookieConsentStatusChangeSubscription = this.consentService.statusChange$.subscribe(event => {
      document.cookie = `${this.consentService.getConfig().cookie.name}=${event.status};max-age=${this.config.cookieMaxAge}`
      
      const dataLayer = window[this.namespace.tracking.dataLayerName] as any;
      if (typeof dataLayer !== 'undefined' && dataLayer.length === 0) {
        this.pushPageViewEvent();
      }

      this.dispatchPageViewEvent();
    });

    // Also dispatch one event in the beginning to take into account
    // returning visitors with cookie already set
    this.dispatchPageViewEvent();
  }

  private dispatchPageViewEvent() {
    return window.dispatchEvent(new CustomEvent(this.namespace.cookieConsent.eventName));
  }

}
