import { Injectable } from '@angular/core';
import { NsNavigationService, NsString } from 'nikisoft-utils';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NsFormControlAutocompleteService } from '../../../../../nikisoft-ng-ui/src/lib/form/controls/autocomplete/ns-form-control-autocomplete.service';
import { NsServiceProvider } from '../../../../../nikisoft-ng-ui/src/lib/service-provider/ns-service-provider';
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
      .map((customer) => NsString.join(' ', [customer.lastName, customer.firstName]));

    return of(result);
  }
}
