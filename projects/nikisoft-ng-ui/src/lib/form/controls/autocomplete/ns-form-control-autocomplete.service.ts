import { nsApiErrorMapper, NsArray, NsNavigationService, NsSubscriptionService } from 'nikisoft-utils';
import { Observable } from 'rxjs';
import { NsServiceProvider } from '../../../service-provider/ns-service-provider';

export abstract class NsFormControlAutocompleteService extends NsSubscriptionService {
  private readonly _serviceProvider: NsServiceProvider<NsNavigationService>;

  protected constructor(serviceProvider: NsServiceProvider<NsNavigationService>) {
    super();
    this._serviceProvider = serviceProvider;
  }

  abstract getLoadListObservable(search: string): Observable<string[]>;

  parseError(error: any): string {
    const errorMessages = this._serviceProvider.apiErrorResolverService.resolve(nsApiErrorMapper, error);

    return NsArray.itemAt(errorMessages, 0);
  }

  handleDependingOnValuesChanged(results: any[]) {}
}
