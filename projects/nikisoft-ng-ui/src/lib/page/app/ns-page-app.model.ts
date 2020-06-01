import { LocalizedTextIdNikisoft, NsNavigationService } from 'nikisoft-utils';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { NsIcon } from '../../icon/ns-icon.enum';
import { NsServiceProvider } from '../../service-provider/ns-service-provider';
import { NsServiceProviderComponentModel } from '../../service-provider/ns-service-provider-component.model';
import { NsPageAppToolbarNavItemGroupEntity } from './toolbar/nav/items/ns-page-app-toolbar-nav-item-group.entity';
import { NsPageAppToolbarNavItemGroupModel } from './toolbar/nav/items/ns-page-app-toolbar-nav-item-group.model';
import { NsPageAppToolbarNavItemModel } from './toolbar/nav/items/ns-page-app-toolbar-nav-item.model';

export abstract class NsPageAppModel<
  TServiceProvider extends NsServiceProvider<TAppNavService>,
  TAppNavService extends NsNavigationService
> extends NsServiceProviderComponentModel<TServiceProvider, TAppNavService> {
  private readonly _pageVisibility$: Observable<object>;
  private _navigationItems: NsPageAppToolbarNavItemGroupEntity[];
  private _navigationItems$: Observable<NsPageAppToolbarNavItemGroupModel[]>;
  private _isMenuOpened = false;

  abstract get pageTitle(): string;

  abstract get isNavigationVisible$(): Observable<boolean>;

  get navigationItems$(): Observable<NsPageAppToolbarNavItemGroupModel[]> {
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

    this._pageVisibility$ = this.isNavigating$.pipe(map((isNavigating) => (isNavigating ? { display: 'none' } : null)));
  }

  onInit() {
    super.onInit();

    this.titleService.setTitle(this.pageTitle);
    this.handleIsNavigating$();

    this._navigationItems = [
      ...this.getFirstDefaultNavigationItems(),
      ...this.getApplicationNavigationItems(),
      ...this.getLastNavigationItems(),
    ];

    this._navigationItems$ = this.buildNavigationItems$();
  }

  private handleIsNavigating$() {
    this.subscribeTo(this.isNavigating$, {
      next: (isNavigating) => {
        if (this.isMenuOpened && isNavigating) {
          this._isMenuOpened = false;
        }
      },
    });
  }

  private getFirstDefaultNavigationItems(): NsPageAppToolbarNavItemGroupEntity[] {
    return [
      {
        items: [
          {
            titleId: LocalizedTextIdNikisoft.GoToHomePage,
            icon: NsIcon.Action_Home,
            action: () => this.navService.toHomePage(),
          },
        ],
      },
    ];
  }

  protected abstract getApplicationNavigationItems(): NsPageAppToolbarNavItemGroupEntity[];

  private getLastNavigationItems(): NsPageAppToolbarNavItemGroupEntity[] {
    return [
      {
        items: [
          {
            titleId: LocalizedTextIdNikisoft.LogOutButton,
            icon: NsIcon.Action_PowerSettingsNew,
            requiresAuth: true,
            action: () => this.authService.logout(),
          },
        ],
      },
    ];
  }

  private buildNavigationItems$(): Observable<NsPageAppToolbarNavItemGroupModel[]> {
    return this.authService.isLoggedIn$.pipe(
      switchMap((isLoggedIn) =>
        of(
          this._navigationItems.map(
            (entity) => new NsPageAppToolbarNavItemGroupModel(entity, isLoggedIn, this.langService),
          ),
        ),
      ),
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
    this._isMenuOpened = !this._isMenuOpened;
  }

  handleItemClicked(item: NsPageAppToolbarNavItemModel) {
    this.toggleMenuOpened();

    item.handleItemClicked();
  }
}
