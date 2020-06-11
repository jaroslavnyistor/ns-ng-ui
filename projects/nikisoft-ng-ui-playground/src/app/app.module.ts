import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalizationLanguage } from 'nikisoft-utils';
import { NsClockModule } from '../../../nikisoft-ng-ui/src/lib/clock/ns-clock.module';
import { NsDiConfigurator } from '../../../nikisoft-ng-ui/src/lib/ns-di.configurator';
import { NsPageAppModule } from '../../../nikisoft-ng-ui/src/lib/page/app/ns-page-app.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { customersServiceDataProvider } from './modules/data/customers.service';
import { AppNavigationService } from './service-provider/app-navigation.service';
import { AppServiceProvider } from './service-provider/app-service-provider';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, NsClockModule, NsPageAppModule, HttpClientModule],
  providers: [
    NsDiConfigurator.configure({
      storageKeyPrefix: 'ns-web-fe-playground-ui',
      defaultLanguage: LocalizationLanguage.EN,
      usesLocalization: false,
      appVersion: '1.4.0.0',
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
