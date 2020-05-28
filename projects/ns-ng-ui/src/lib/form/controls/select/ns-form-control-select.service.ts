import { nsApiErrorMapper, nsArrayItemAt, NsNavigationService, NsSubscriptionService } from 'ns-js-utils';
import { Observable } from 'rxjs';
import { NsServiceProvider } from '../../../service-provider/ns-service-provider';
import { NsFormControlSelectItemEntity } from './ns-form-control-select-item.entity';

export abstract class NsFormControlSelectService<
  TSelectItem extends NsFormControlSelectItemEntity
> extends NsSubscriptionService {
  protected readonly _serviceProvider: NsServiceProvider<NsNavigationService>;

  protected constructor(serviceProvider: NsServiceProvider<NsNavigationService>) {
    super();

    this._serviceProvider = serviceProvider;
  }

  abstract getLoadListObservable(): Observable<TSelectItem[]>;

  parseError(error: any): string {
    const errorMessages = this._serviceProvider.apiErrorResolverService.resolve(nsApiErrorMapper, error);

    return nsArrayItemAt(errorMessages, 0);
  }

  abstract getEmptyValue(): TSelectItem;
}
