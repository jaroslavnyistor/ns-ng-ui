import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NsClockModule } from 'ns-ng-ui/lib/clock/ns-clock.module';
import { NsDiConfigurator } from 'ns-ng-ui/lib/ns-di.configurator';
import { NsPageModule } from 'ns-ng-ui/lib/page/base/ns-page.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { customersServiceDataProvider } from './modules/data/customers.service';
import { AppNavigationService } from './service-provider/app-navigation.service';
import { AppServiceProvider } from './service-provider/app-service-provider';
import { LocalizationLanguage } from 'ns-js-utils/lib/localization/localization.language';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, NsPageModule, NsClockModule],
  providers: [
    NsDiConfigurator.configure({
      storageKeyPrefix: 'ns-web-fe-playground-ui',
      defaultLanguage: LocalizationLanguage.EN,
      usesLocalization: false,
      appVersion: '1.3.0.0',
      appLogo: 'assets/app_logo.png',
      serviceProvider: {
        service: AppServiceProvider,
        navService: AppNavigationService,
      },
    }),
    customersServiceDataProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
