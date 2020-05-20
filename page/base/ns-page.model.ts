import { Observable, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { nsIsNotNullOrEmpty } from '../../../utils/helpers/strings/ns-helpers-strings';
import { LocalizedTextIdNikisoft } from '../../../utils/localization/localized-text-id.nikisoft';
import { NsNavigationService } from '../../../utils/navigation/ns-navigation.service';
import { NsIcon } from '../../icon/ns-icon.enum';
import { NsServiceProvider } from '../../service-provider/ns-service-provider';
import { NsServiceProviderComponentModel } from '../../service-provider/ns-service-provider-component.model';
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
            flatMap(isLoggedIn => this.getApplicationNavigationItems$(isLoggedIn)
               .pipe(
                  map(appItems => ({ isLoggedIn, appItems }))
               )
            ),
            flatMap(({ isLoggedIn, appItems }) => this.getDefaultNavigationItems$(isLoggedIn)
               .pipe(
                  map(defaultItems => ([...appItems, ...defaultItems]))
               )
            )
         );
   }

   protected abstract getApplicationNavigationItems$(
      isLoggedIn: boolean
   ): Observable<NsToolbarNavigationItemGroupModel[]>;

   private getDefaultNavigationItems$(isLoggedIn: boolean): Observable<NsToolbarNavigationItemGroupModel[]> {
      let items: NsToolbarNavigationItemModel[] = [
         {
            title: this.langService.translate(LocalizedTextIdNikisoft.GoToHomePage),
            icon: NsIcon.Action_Home,
            action: () => this.navService.toHomePage()
         }
      ];

      if (isLoggedIn) {
         items = [
            ...items,
            {
               title: this.langService.translate(LocalizedTextIdNikisoft.LogOutButton),
               icon: NsIcon.Action_PowerSettingsNew,
               action: () => this.authService.logout()
            }
         ]
      }

      return of([
         { items }
      ] as NsToolbarNavigationItemGroupModel[]);
   }

   onInit() {
      super.onInit();

      this.titleService.setTitle(this.pageTitle);

      this.subscribeTo(
         this.isNavigating$,
         {
            next: isNavigating => {
               if (this.isMenuOpened && isNavigating) {
                  this._isMenuOpened = false
               }
            }
         }
      )
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
      item.action();
   }

   hasTitle(title: string) {
      return nsIsNotNullOrEmpty(title);
   }
}
