# NikiSoft-Web-UI
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
        navigation          - navigation inside application
        nikisoft            - libraries
        permissions         - contains enum ApplicationPermission with IDs for access to permission
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
    `"build-local-iis": "ng build --prod --baseHref=/{relative_url}/",`
    
- **Webpack bundle analyzer**

    `"build:stats": "ng build --stats-json",`    
    `"analyze-es2015": "webpack-bundle-analyzer dist/stats-es2015.json",`    
    `"analyze-es5": "webpack-bundle-analyzer dist/stats-es5.json"`
    
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

### Favicon
- Generator of favicon: https://www.favicon-generator.org/

- Extract the zip file under **src/assets/favicon**

- Add these lines to **assets** in angular.json

    ```json
      "src/favicon.ico",
      "src/assets",
      "src/assets/favicon",
      "src/manifest.json"
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

## 3. Application

### Setup dependency injection and services

- Create file **app-navigation.service.ts** in folder src\app\navigation and past following

    ```typescript
    import { Injectable } from '@angular/core';
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

- Create **app-service-provider.ts** in **app** folder and paste following code

    ```typescript
    import { Injectable } from '@angular/core';
    import { AppNavigationService } from './navigation/app-navigation.service';
    import { NsDialogService } from './nikisoft/ui/dialog/ns-dialog.service';
    import { NsServiceProvider } from './nikisoft/ui/ns-service-provider';
    import { NsPageNoPermissionService } from './nikisoft/ui/page/no-permission/ns-page-no-permission.service';
    import { NsPageNotFoundService } from './nikisoft/ui/page/not-found/ns-page-not-found.service';
    import { NsApiErrorResolverService } from './nikisoft/utils/api/error/ns-api-error-resolver.service';
    import { NsAuthenticateService } from './nikisoft/utils/authentication/ns-authenticate.service';
    import { LocalizationLanguagesService } from './nikisoft/utils/localization/localization-languages.service';
    import { NsStorageService } from './nikisoft/utils/storage/ns-storage.service';
    
    @Injectable({
       providedIn: 'root'
    })
    export class AppServiceProvider extends NsServiceProvider {
       private readonly _appNavigationService: AppNavigationService;
    
       get appNavigationService(): AppNavigationService {
          return this._appNavigationService;
       }
    
       constructor(
          langService: LocalizationLanguagesService,
          navService: AppNavigationService,
          serverApiErrorResolver: NsApiErrorResolverService,
          authService: NsAuthenticateService,
          dialogService: NsDialogService,
          storageService: NsStorageService,
          noPermissionService: NsPageNoPermissionService,
          notFoundService: NsPageNotFoundService
       ) {
          super(
             langService,
             navService,
             serverApiErrorResolver,
             authService,
             dialogService,
             storageService,
             noPermissionService,
             notFoundService
          );
    
          this._appNavigationService = navService;
       }
    }
    ```

- Open app.module.ts file and setup global DI providers
    ```typescript
    NsStorageService.setStorageKeyPrefix(''),
    NsStorageService.setStorageKeyPrefix('ns-calculator'),
    LocalizationLanguagesService.setAppInitializer(),
    LocalizationLanguagesService.setDefaultLanguage(LocalizationLanguage.SK),
    NsPageNotFoundAuthService.disablePageNotFoundRequiresAuth(),
    {
       provide: DI_NS_APP_LOGO, useValue: 'assets/app_logo.png'
    },
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

### Styles

- Remove from styles section under **build** in angular.json the custom theme and leave only src\styles.sass

- Past the below content into file **styles.sass**

    ```sass
    @import "app/nikisoft/ui/styles/nikisoft"
    
    @include ns-theme($mat-blue-grey, $mat-amber)
    
    $page-background-color: #e5e5e5
    @include ns-page-background-color($page-background-color)
    ```

### app.component
- Model - Create **app.model.ts** and paste below code

    ```typescript
    import { Injectable } from '@angular/core';
    import { Observable, of } from 'rxjs';
    import { flatMap } from 'rxjs/operators';
    import { AppServiceProvider } from './app-service-provider';
    import { NsComponentModel } from './nikisoft/ui/component/ns-component.model';
    import { NsToolbarNavigationItemGroupModel } from './nikisoft/ui/page/base/toolbar/navigation/items/ns-toolbar-navigation-item-group.model';
    
    @Injectable()
    export class AppModel extends NsComponentModel {
       private readonly _navigationItems$: Observable<NsToolbarNavigationItemGroupModel[]>;
    
       get navigationItems$(): Observable<NsToolbarNavigationItemGroupModel[]> {
          return this._navigationItems$;
       }
    
       constructor(private _serviceProvider: AppServiceProvider) {
          super();
    
          this._navigationItems$ = this._serviceProvider.authService.authenticationEvent$
          .pipe(
             flatMap(credentials => of(this.createNavigationItems()))
          );
       }
    
       private createNavigationItems(): NsToolbarNavigationItemGroupModel[] {
          return [
          ];
       }
    }
    ```

- Service - Create **app.service.ts** and paste below code

    ```typescript
    import { Injectable } from '@angular/core';
    import { AppModel } from './app.model';
    import { NsComponentService } from './nikisoft/ui/component/ns-component.service';
    
    @Injectable()
    export class AppService extends NsComponentService<AppModel> {
       constructor(model: AppModel) {
          super(model);
       }
    }
    ```
   
- Component - Typescript - Paste below content into **app.component.ts**

    ```typescript
    import { Component } from '@angular/core';
    import { Title } from '@angular/platform-browser';
    import { AppModel } from './app.model';
    import { AppService } from './app.service';
    import { LocalizedTextIdApp } from './localized-text-ids/localized-text-id.app';
    import { NsComponentBase } from './nikisoft/ui/component/ns-component.base';
    import { LocalizationLanguagesService } from './nikisoft/utils/localization/localization-languages.service';
    
    @Component({
       selector: 'app-root',
       templateUrl: './app.component.html',
       styleUrls: [],
       providers: [
          AppService,
          AppModel
       ]
    })
    export class AppComponent extends NsComponentBase<AppService, AppModel> {
       constructor(
          service: AppService,
          titleService: Title,
          langService: LocalizationLanguagesService
       ) {
          super(service);
    
          titleService.setTitle(
             langService.text(LocalizedTextIdApp.Title)
          );
       }
    }
    ```

- Component - HTML - Paste below content into **app.component.html**

    ```html
    <ns-page [pageTitle]="'Title' | translate"
             [isNavigationVisible]="true"
             [navigationItems$]="model.navigationItems$">
    
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
    import { notFoundRoutes } from './nikisoft/ui/page/not-found/ns-page-not-found.routes';
    
    
    const routes: Routes = [
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
