import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CookieConsentServiceConfig, COOKIE_CONSENT_SERVICE_CONFIG } from './services/cookie-consent.config';
import { CookieConsentService } from './services/cookie-consent.service';

@NgModule({
  imports: [
    CommonModule
  ]
})
export class CookieModule {

  constructor(
    @Optional() @SkipSelf()
    parentModule: CookieModule
  ) {
    if (parentModule) {
      throw new Error('CookieModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: CookieConsentServiceConfig): ModuleWithProviders {
    return {
      ngModule: CookieModule,
      providers: [
        {
          provide: COOKIE_CONSENT_SERVICE_CONFIG,
          useValue: config
        },
        CookieConsentService
      ]
    };
  }

}
