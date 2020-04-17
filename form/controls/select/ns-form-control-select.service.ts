import { Observable } from 'rxjs';
import { nsApiErrorMapper } from '../../../../utils/api/error/ns-api-error.mapper';
import { nsArrayItemAt } from '../../../../utils/helpers/arrays/ns-helpers-arrays';
import { NsSubscriptionService } from '../../../../utils/subscription/ns-subscription.service';
import { NsServiceProvider } from '../../../ns-service-provider';
import { NsFormControlSelectItemEntity } from './ns-form-control-select-item.entity';

export abstract class NsFormControlSelectService<TSelectItem extends NsFormControlSelectItemEntity>
   extends NsSubscriptionService {
   protected readonly _serviceProvider: NsServiceProvider;

   protected constructor(serviceProvider: NsServiceProvider) {
      super();

      this._serviceProvider = serviceProvider;
   }

   abstract getLoadListObservable(): Observable<TSelectItem[]>;

   parseError(error: any): string {
      const errorMessages = this._serviceProvider.serverApiErrorResolver.resolve(
         nsApiErrorMapper,
         this._serviceProvider.langService,
         error
      );

      return nsArrayItemAt(errorMessages, 0);
   }

   abstract getEmptyValue(): TSelectItem;
}
