# nikisoft-ng-ui
Library consisting of useful modules, components and services for easy development of Angular application

## 1. npm

### Project folder structure

Please add the library as git submodule under **src\app\nikisoft**.

Folder structure should be as follows:

```text
src
    app
        localized-text-ids  - ids of localized texts
        modules             - all modules in application - split by business logic
        nikisoft            - libraries
        permissions         - contains enum ApplicationPermission with IDs for access to permission
        service-provider    - service provider and navigation classes of the application
```

### Requires following libraries
- @angular/material: `ng add @angular/material`, please select Sass as default stylesheets

- @angular/flex-layout: `npm i @angular/flex-layout`

- @angular/material-moment-adapter: `npm i @angular/material-moment-adapter`

- lodash: `npm i lodash`

- moment: `npm i moment`

- ngx-material-timepicker: `npm i ngx-material-timepicker`

- NPM install command:
    - `ng add @angular/material `
    - `npm i @angular/flex-layout @angular/material-moment-adapter lodash moment ngx-material-timepicker`

### Optional library dependencies
- webpack-bundle-analyzer: `npm i --save-dev webpack-bundle-analyzer`

### Setup npm scripts:
- **Default build scripts**

    `"start": "ng serve --port={custom_port}",`        
    
- **Webpack bundle analyzer**

    `"build:stats": "ng build --stats-json",`    
    `"analyze-es2015": "webpack-bundle-analyzer dist/stats-es2015.json",`    
    `"analyze-es5": "webpack-bundle-analyzer dist/stats-es5.json"`
    
### Local IIS
#### Angular.json
- Create copy of section project->name-of-project->architect->build and name it **build-deploy-local-iis**
```json
{
    "projects": {
      "name-of-project": {
        "architect": {
          "build": { }
        }
      }
    }
}
```
#### NPM script
- Added the following line to the package.json file
    ```json
    "build-deploy-local-iis": "ng run {name-of-project}:build-deploy-local-iis:production --baseHref=/{name-of-site}/ --outputPath={full-path-to-site}"
    ```
  and replace
   - {name-of-project} -> the actual name of the project
   - {name-of-site} -> name of site under root in IIS
   - {full-path-to-site} -> full path to site
   
#### web.config
- Create **web.config** file under src folder with the content
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>

<system.webServer>
  <rewrite>
    <rules>
      <rule name="Angular Routes" stopProcessing="true">
        <match url=".*" />
        <conditions logicalGrouping="MatchAll">
          <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
          <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
        </conditions>
        <action type="Rewrite" url="/{name-of-site}/" />
      </rule>
    </rules>
  </rewrite>
</system.webServer>

</configuration>
```
 and replace {name-of-site} -> the value from above
 
- Add *"src/web.config"* to assets property under build-deploy-local-iis property in angular.json


### Proxy configuration
- Create proxy.config.json file in same directory as package.json and put the below content:

    ```json
        {
          "/api": {
            "target": "http://localhost:5000",
            "secure": false,
            "logLevel": "debug"
          }
        }
    ```

- Add the proxy.config.json into angular.json file to
    ```json
    {
      "projects": {
        "name_of_project": {
          "architect": {
            "serve": {
              "options": {
                "proxyConfig": "proxy.config.json"
              }
            }
          }
        } 
      }
    }
    ```

### Remove default component prefix
- Personally I prefer to set **"prefix": "app"** to _"prefix": ""_ in angular.json

## 2. HTML

### index.html
- Put below content on the end of **head** tag

    ```html
      <style>
        html, body {
          width: 100%;
          height: 100%;
          background-color: #e5e5e5;
        }
        .initial-loader {
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
        }
      </style>
    ```
### app_logo.png
- Find icon suitable for your application and places it in folder **assets** and name it **app_logo.png**

### Favicon
- Generator of favicon: https://www.favicon-generator.org/

- Extract the zip file under **src/assets/favicon**

- Add these lines to **assets** in angular.json

    ```json
      "src/favicon.ico",
      "src/assets/favicon"
    ```

- Copy **favicon.ico** to src folder

- Copy after _<meta name="viewport"_ into **index.html**
    ```html  
      <link rel="icon"
            type="image/x-icon"
            href="favicon.ico">
      <link rel="apple-touch-icon"
            sizes="57x57"
            href="assets/favicon/apple-icon-57x57.png">
      <link rel="apple-touch-icon"
            sizes="60x60"
            href="assets/favicon/apple-icon-60x60.png">
      <link rel="apple-touch-icon"
            sizes="72x72"
            href="assets/favicon/apple-icon-72x72.png">
      <link rel="apple-touch-icon"
            sizes="76x76"
            href="assets/favicon/apple-icon-76x76.png">
      <link rel="apple-touch-icon"
            sizes="114x114"
            href="assets/favicon/apple-icon-114x114.png">
      <link rel="apple-touch-icon"
            sizes="120x120"
            href="assets/favicon/apple-icon-120x120.png">
      <link rel="apple-touch-icon"
            sizes="144x144"
            href="assets/favicon/apple-icon-144x144.png">
      <link rel="apple-touch-icon"
            sizes="152x152"
            href="assets/favicon/apple-icon-152x152.png">
      <link rel="apple-touch-icon"
            sizes="180x180"
            href="assets/favicon/apple-icon-180x180.png">
      <link rel="icon"
            type="image/png"
            sizes="192x192"
            href="assets/favicon/android-icon-192x192.png">
      <link rel="icon"
            type="image/png"
            sizes="32x32"
            href="assets/favicon/favicon-32x32.png">
      <link rel="icon"
            type="image/png"
            sizes="96x96"
            href="assets/favicon/favicon-96x96.png">
      <link rel="icon"
            type="image/png"
            sizes="16x16"
            href="assets/favicon/favicon-16x16.png">
      <link rel="manifest"
            href="assets/favicon/manifest.json">
      <meta name="msapplication-TileColor"
            content="#ffffff">
      <meta name="msapplication-TileImage"
            content="ms-icon-144x144.png">
      <meta name="theme-color"
            content="#ffffff">
    ```

### Fonts
- Add the below line to **index.html** before end of head tag.

    ```html
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap"
            rel="stylesheet">
    ```

### Icons
- Add the below line to **index.html** before end of head tag.

    ```html
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet">
    ```

### Styles

- Remove from styles section under **build** in angular.json the custom theme and leave only src\styles.sass

- Past the below content into file **styles.sass**

    ```sass
    @import "app/nikisoft/ui/styles/nikisoft"
    
    @include ns-theme($mat-blue-grey, $mat-amber)
    
    $page-background-color: #e5e5e5
    @include ns-page-background-color($page-background-color)
    ```
- Custom theme colors
    - Custom colors can be created here http://mcg.mbitson.com
    - Color tool https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=546E7A&secondary.color=4E342E&secondary.text.color=ffffff

### ajax-loader.gif
- Replace content of the **body** tag with following content

    ```html
    <app-root>
      <div class="initial-loader">
        <img src="assets/ajax-loader.gif">
      </div>
    </app-root>
    ```

- **ajax-loader.gif** can be downloaded from http://www.ajaxload.info/. It will display loading animation during initial start of application. It is necessary due to loading of localized texts.

- Replace content of title tag with text 'Loading...'

## 3. Application

### Setup dependency injection and services

- Create file **app-navigation.service.ts** with class AppNavigationService in folder **src\app\service-provider** and past following

    ```typescript
    import { NsNavigationService } from '../nikisoft/utils/navigation/ns-navigation.service';
    import { NsRouterService } from '../nikisoft/utils/navigation/ns-router.service';
    import { NsStorageService } from '../nikisoft/utils/storage/ns-storage.service';
    
    @Injectable({
       providedIn: 'root'
    })
    export class AppNavigationService extends NsNavigationService {
       constructor(routerService: NsRouterService, storageService: NsStorageService) {
          super(routerService, storageService);
       }
    }
    ```

    For each module you can add methods to navigate inside module, e.g.

    ```typescript
      toCarPartsList() {
        this.navigate(carPartsRouteList);
      }
    
      toCarPartEdit(id: number) {
        this.navigate(`${carPartsRouteEdit}/${id}`);
      }
    
      finishCarPartEdit(model: CarPartsEditModel, result?: any) {
        this.finishEditing(model, result);
        this.toCarPartsList();
      }
    ```

- Create **app-service-provider.ts** with class AppServiceProvider in same folder and paste following code

    ```typescript
    import { Title } from '@angular/platform-browser';
    import { NsDialogService } from '../nikisoft/ui/dialog/ns-dialog.service';
    import { NsMediaQueryObserver } from '../nikisoft/ui/ns-media-query-observer';
    import { NsPageNoPermissionService } from '../nikisoft/ui/page/no-permission/ns-page-no-permission.service';
    import { NsPageNotFoundService } from '../nikisoft/ui/page/not-found/ns-page-not-found.service';
    import { NsServiceProvider } from '../nikisoft/ui/service-provider/ns-service-provider';
    import { NsApiErrorResolverService } from '../nikisoft/utils/api/error/ns-api-error-resolver.service';
    import { NsAuthenticateService } from '../nikisoft/utils/authentication/ns-authenticate.service';
    import { LocalizationLanguagesService } from '../nikisoft/utils/localization/localization-languages.service';
    import { NsRouterService } from '../nikisoft/utils/navigation/ns-router.service';
    import { NsStorageService } from '../nikisoft/utils/storage/ns-storage.service';
    import { AppNavigationService } from './app-navigation.service';
    
    @Injectable({
       providedIn: 'root'
    })
    export class AppServiceProvider extends NsServiceProvider<AppNavigationService> {
       constructor(
          langService: LocalizationLanguagesService,
          navService: AppNavigationService,
          apiErrorResolverService: NsApiErrorResolverService,
          authService: NsAuthenticateService,
          dialogService: NsDialogService,
          storageService: NsStorageService,
          noPermissionService: NsPageNoPermissionService,
          notFoundService: NsPageNotFoundService,
          mediaQueryObserver: NsMediaQueryObserver,
          routerService: NsRouterService,
          titleService: Title
       ) {
          super(
             langService,
             navService,
             apiErrorResolverService,
             authService,
             dialogService,
             storageService,
             noPermissionService,
             notFoundService,
             mediaQueryObserver,
             routerService,
             titleService
          );
       }
    }
    ```

- Open **app.module.ts** file and setup global DI providers. In **providers** array add following code
    ```typescript
      NsDiConfigurator.configure({
         storageKeyPrefix: '' // Prefix used when saving values to local storage,
         defaultLanguage: LocalizationLanguage.EN, // Setups standard language
         usesLocalization: true, // It's optional, standard value is true
         authentication: { // Setups authentication, can be left-out
            service: NsFirebaseAuthService,
            notFoundPageRequiresAuth: true,
            navigateToLoginOnTokenExpiration: true
         },
         appVersion: '1.2.0.0',
         appLogo: 'assets/app_logo.png',
         serviceProvider: {
            service: AppServiceProvider,
            navService: AppNavigationService
         }
      }),
    ```  

### Localization of text
Currently supported languages are English and Slovak. To have localized text in application follow instructions below:

- Create files **localized-text-lang-en.json** and **localized-text-lang-sk.json** in folder src\assets\localization and put there all text.

    Example of localized-text-lang-en.json

    ```json
    {
      "Title": "{Application name in English}"
    }
    ```
        
    Example of localized-text-lang-sk.json
        
    ```json
    {
      "Title": "{Application name in Slovak}"
    }
    ```

- Create **localized-text-id.app.ts** in folder src\app\localized-text-ids and put the following code:

    ```typescript
    export enum LocalizedTextIdApp {
      Title = 'Title'
    }
    ```
    
    The name and value should be same. Enum can be used to get text from json file based on selected language.

- A pipe **translate** is provided to translate the value of enum to localized text.
    ```html
    'Title' | translate
    ```

### app.component
- Model 
    - Create **app.model.ts** and let the class AppModel extends **NsPageModel** class
    ```typescript
    import { Injectable } from '@angular/core';
    import { Observable, of } from 'rxjs';
    import { NsPageModel } from './nikisoft/ui/page/base/ns-page.model';
    import { NsToolbarNavigationItemGroupModel } from './nikisoft/ui/page/base/toolbar/navigation/items/ns-toolbar-navigation-item-group.model';
    import { AppNavigationService } from './service-provider/app-navigation.service';
    import { AppServiceProvider } from './service-provider/app-service-provider';

    @Injectable()
    export class AppModel extends NsPageModel<AppServiceProvider, AppNavigationService> {
       private readonly _isNavigationVisible$ = of(true);
    
       get isNavigationVisible$(): Observable<boolean> {
          return this._isNavigationVisible$;
       }
    
       get pageTitle(): string {
          return '';
       }
    
       constructor(serviceProvider: AppServiceProvider) {
          super(serviceProvider);
       }
    
       protected getApplicationNavigationItems$(isLoggedIn: boolean): Observable<NsToolbarNavigationItemGroupModel[]> {
          return of([]);
       }
    }
    ```
    
- Service 
    - Create **app.service.ts** and let the class AppService extends **NsPageService** class
    
    ```typescript
    import { Injectable } from '@angular/core';
    import { AppModel } from './app.model';
    import { NsPageService } from './nikisoft/ui/page/base/ns-page.service';
    import { AppNavigationService } from './service-provider/app-navigation.service';
    import { AppServiceProvider } from './service-provider/app-service-provider';
    
    @Injectable()
    export class AppService extends NsPageService<AppModel, AppServiceProvider, AppNavigationService> {
       constructor(model: AppModel, serviceProvider: AppServiceProvider) {
          super(model, serviceProvider);
       }
    }
    ```
   
- Component 
    - Typescript - Paste below content into **app.component.ts**

    ```typescript
    import { Component } from '@angular/core';
    import { AppModel } from './app.model';
    import { AppService } from './app.service';
    import { NsPageDiConfigurator } from './nikisoft/ui/page/base/ns-page.di-configurator';
    
    @Component({
       selector: 'app-root',
       templateUrl: './app.component.html',
       styleUrls: ['./app.component.sass'],
       providers: [
          NsPageDiConfigurator.provideService(AppService, AppModel),
       ]
    })
    export class AppComponent {
    
    }
    ```

    - HTML - Paste below content into **app.component.html**

    ```html
    <ns-page>
    
      <ns-clock *nsPageToolbarHeaderItem>
      </ns-clock>
    
      <ns-user-log-in-information *nsPageToolbarHeaderItem>
      </ns-user-log-in-information>
    
      <router-outlet></router-outlet>
    </ns-page>
    ```
  
  - **ns-clock** - Display clock - _optional_
  - **ns-user-log-in-informationr** - Display user information after he/she has logged in
   
- Routing - Paste below content into **app-routing.module.ts**

    ```typescript
    import { NgModule } from '@angular/core';
    import { Routes, RouterModule } from '@angular/router';
    import { loginRoutes } from './nikisoft/ui/page/login/login.routes';
    import { routeNoPermissionRoutes } from './nikisoft/ui/page/no-permission/ns-page-no-permission.routes';
    import { buildDefaultRoute, notFoundRoutes } from './nikisoft/ui/page/not-found/ns-page-not-found.routes';
    
    
    const routes: Routes = [
       buildDefaultRoute(),
      ...loginRoutes,
      ...routeNoPermissionRoutes,
      ...notFoundRoutes
    ];
    
    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule]
    })
    export class AppRoutingModule { }
    ```

## tslint.json

```json
{
  "extends": "tslint:recommended",
  "rules": {
    "variable-name": {
      "options": [
        "allow-leading-underscore"
      ]
    },
    "array-type": false,
    "arrow-parens": false,
    "deprecation": {
      "severity": "warning"
    },
    "component-class-suffix": true,
    "contextual-lifecycle": true,
    "directive-class-suffix": true,
    "import-blacklist": [
      true,
      "rxjs/Rx"
    ],
    "interface-name": false,
    "max-classes-per-file": false,
    "max-line-length": [
      true,
      200
    ],
    "member-access": false,
    "member-ordering": [
      true,
      {
        "order": [
          "static-field",
          "instance-field",
          "static-method",
          "instance-method"
        ]
      }
    ],
    "no-consecutive-blank-lines": false,
    "no-console": [
      true,
      "debug",
      "info",
      "time",
      "timeEnd",
      "trace"
    ],
    "no-empty": false,
    "no-inferrable-types": [
      true,
      "ignore-params"
    ],
    "no-non-null-assertion": true,
    "no-redundant-jsdoc": true,
    "no-switch-case-fall-through": true,
    "no-use-before-declare": true,
    "no-var-requires": false,
    "object-literal-key-quotes": [
      true,
      "as-needed"
    ],
    "object-literal-sort-keys": false,
    "ordered-imports": false,
    "quotemark": [
      true,
      "single"
    ],
    "trailing-comma": false,
    "no-conflicting-lifecycle": true,
    "no-host-metadata-property": true,
    "no-input-rename": true,
    "no-inputs-metadata-property": true,
    "no-output-native": true,
    "no-output-on-prefix": true,
    "no-output-rename": true,
    "no-outputs-metadata-property": true,
    "template-banana-in-box": true,
    "template-no-negated-async": true,
    "use-lifecycle-interface": true,
    "use-pipe-transform-interface": true
  },
  "rulesDirectory": [
    "codelyzer"
  ]
}
```
