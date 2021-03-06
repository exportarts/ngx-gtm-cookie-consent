# ngx-gtm-cookie-consent

[![npm](https://img.shields.io/npm/v/ngx-gtm-cookie-consent.svg)](https://www.npmjs.com/package/ngx-gtm-cookie-consent)
[![Build Status](https://travis-ci.com/exportarts/ngx-gtm-cookie-consent.svg?branch=master)](https://travis-ci.com/exportarts/ngx-gtm-cookie-consent)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=exportarts_ngx-gtm-cookie-consent&metric=alert_status)](https://sonarcloud.io/dashboard?id=exportarts_ngx-gtm-cookie-consent)

An Angular library to comply with the GDPR and the latest european law regarding cookies 🍪

> This project is work-in-progress. Features and Documentation are probably not complete.

## Usage

1. Install dependencies

`npm install --save ngx-gtm-cookie-consent ngx-cookieconsent cookieconsent`

or

`yarn add ngx-gtm-cookie-consent ngx-cookieconsent cookieconsent`

2. Add the following to your `angular.json`:

```json
{
    "assets": [
        {
            "glob": "**/cookie-consent.js",
            "input": "node_modules/ngx-gtm-cookie-consent/static/js",
            "output": "./ngx-gtm-cookie-consent"
        }
    ],
    "styles": [
        "node_modules/cookieconsent/build/cookieconsent.min.css",
        "node_modules/ngx-gtm-cookie-consent/static/css/main.css"
    ],
    "scripts": [
        "node_modules/cookieconsent/build/cookieconsent.min.js"
    ]
}
```

3. Add a script in your `index.html` head section:

```html
<script src="ngx-gtm-cookie-consent/cookie-consent.js"></script>
```

4. Create a `cookieConfig` object (see [ngx-cookieconsent](https://github.com/tinesoft/ngx-cookieconsent/blob/master/src/service/cookieconsent-config.ts))

5. Add imports to your `AppModule`:

```ts
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgcCookieConsentModule.forRoot(cookieConfig),
    CookieModule.forRoot({
      gtmContainerId: 'GTM-XXXYYY', // Your Google Tag Manager container ID
      enable: true, // Control this from your environment files
      cookieConsentPopUpConfig: cookieConfig
    })
  ]
})
export class AppModule { }
```

6. Create a new trigger in Google Tag Manager

![Trigger](./docs/images/gtm-trigger.png)

7. Use the new trigger to fire tags (e.g. for Google Analytics)

![Tag](./docs/images/gtm-tag.png)

## i18n support

You can change the content of the cookie banner after the initial setup, for example to react to a locale
change by the user. The `CookieConsentService` provides the function
[`setCookieConsentConfig()`](./projects/ngx-gtm-cookie-consent/src/lib/services/cookie-consent.service.ts#L59)
which can be used to provide an updated config object.
