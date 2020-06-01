import { Injectable } from '@angular/core';
import { NsNavigationService, nsStringJoin } from 'ns-js-utils';
import { NsServiceProvider } from 'ns-ng-ui';
import { NsFormControlAutocompleteService } from 'ns-ng-ui';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CustomerEntity } from '../data/customer.entity';
import { CustomersService } from '../data/customers.service';

@Injectable()
export class FormsAutocompleteDataService extends NsFormControlAutocompleteService {
  constructor(
    serviceProvider: NsServiceProvider<NsNavigationService>,
    private readonly _customersService: CustomersService,
  ) {
    super(serviceProvider);
  }

  getLoadListObservable(search: string): Observable<string[]> {
    return this._customersService.load().pipe(switchMap((customers) => this.mapCustomers(customers, search)));
  }

  private mapCustomers(customers: CustomerEntity[], search: string): Observable<string[]> {
    const result = customers
      .filter((customer) => customer.firstName.indexOf(search) >= 0 || customer.lastName.indexOf(search) >= 0)
      .map((customer) => nsStringJoin(' ', [customer.lastName, customer.firstName]));

    return of(result);
  }
}
