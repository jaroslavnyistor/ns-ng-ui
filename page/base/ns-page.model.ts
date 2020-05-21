import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LocalizedTextIdNikisoft } from '../../../utils/localization/localized-text-id.nikisoft';
import { NsNavigationService } from '../../../utils/navigation/ns-navigation.service';
import { NsIcon } from '../../icon/ns-icon.enum';
import { NsServiceProvider } from '../../service-provider/ns-service-provider';
import { NsServiceProviderComponentModel } from '../../service-provider/ns-service-provider-component.model';
import { NsToolbarNavigationItemGroupEntity } from './toolbar/navigation/items/ns-toolbar-navigation-item-group.entity';
import { NsToolbarNavigationItemGroupModel } from './toolbar/navigation/items/ns-toolbar-navigation-item-group.model';
import { NsToolbarNavigationItemModel } from './toolbar/navigation/items/ns-toolbar-navigation-item.model';

export abstract class NsPageModel<TServiceProvider extends NsServiceProvider<TAppNavService>,
   TAppNavService extends NsNavigationService>
   extends NsServiceProviderComponentModel<TServiceProvider, TAppNavService> {

   private readonly _navigationItems$: Observable<NsToolbarNavigationItemGroupModel[]>;
   private readonly _pageVisibility$: Observable<object>;
   private _isMenuOpened = false;

   abstract get pageTitle(): string;

   abstract get isNavigationVisible$(): Observable<boolean>;

   get navigationItems$(): Observable<NsToolbarNavigationItemGroupModel[]> {
      return this._navigationItems$;
   }

   get isNavigating$(): Observable<boolean> {
      return this.routerService.isNavigating$;
   }

   get pageVisibility$(): Observable<object> {
      return this._pageVisibility$;
   }

   get isMenuOpened(): boolean {
      return this._isMenuOpened;
   }

   protected constructor(serviceProvider: TServiceProvider) {
      super(serviceProvider);

      this._pageVisibility$ = this.isNavigating$
         .pipe(
            map(isNavigating => isNavigating ? { display: 'none' } : null)
         );

      this._navigationItems$ = this.buildNavigationItems$();
   }

   private buildNavigationItems$(): Observable<NsToolbarNavigationItemGroupModel[]> {
      return this.authService.isLoggedIn$
         .pipe(
            this.processApplicationNavigationItems$(),
            this.processDefaultNavigationItems$(),
            this.mapNavigationItems$()
         );
   }

   private processApplicationNavigationItems$() {
      return switchMap(isLoggedIn => this.getApplicationNavigationItems$()
         .pipe(
            map(appItems => ({ isLoggedIn, appItems }))
         )
      );
   }

   protected abstract getApplicationNavigationItems$(): Observable<NsToolbarNavigationItemGroupEntity[]>;

   private processDefaultNavigationItems$() {
      return switchMap(({ isLoggedIn, appItems }) => this.getDefaultNavigationItems$()
         .pipe(
            map(
               defaultItems => (
                  {
                     isLoggedIn,
                     entities: [...appItems, ...defaultItems]
                  }
               )
            )
         )
      );
   }

   private getDefaultNavigationItems$(): Observable<NsToolbarNavigationItemGroupEntity[]> {
      return of([
         {
            items: [
               {
                  titleId: LocalizedTextIdNikisoft.GoToHomePage,
                  icon: NsIcon.Action_Home,
                  action: () => this.navService.toHomePage()
               },
               {
                  titleId: LocalizedTextIdNikisoft.LogOutButton,
                  icon: NsIcon.Action_PowerSettingsNew,
                  requiresAuth: true,
                  action: () => this.authService.logout()
               }
            ]
         }
      ]);
   }

   private mapNavigationItems$() {
      return map(({ isLoggedIn, entities }) =>
         entities.map(
            entity => new NsToolbarNavigationItemGroupModel(entity, isLoggedIn, this.langService)
         )
      );
   }

   onInit() {
      super.onInit();

      this.titleService.setTitle(this.pageTitle);
      this.handleIsNavigating$();
   }

   private handleIsNavigating$() {
      this.subscribeTo(
         this.isNavigating$,
         {
            next: isNavigating => {
               if (this.isMenuOpened && isNavigating) {
                  this._isMenuOpened = false
               }
            }
         }
      );
   }

   handleMenuOpened() {
      if (this.isMenuOpened === false) {
         this.toggleMenuOpened();
      }
   }

   handleMenuClosed() {
      if (this.isMenuOpened === true) {
         this.toggleMenuOpened();
      }
   }

   toggleMenuOpened() {
      this._isMenuOpened = !this._isMenuOpened
   }

   handleItemClicked(item: NsToolbarNavigationItemModel) {
      this.toggleMenuOpened();

      item.handleItemClicked(this.navService);
   }
}
