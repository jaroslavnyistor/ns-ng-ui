import { Observable } from 'rxjs';
import { nsApiErrorMapper } from '../../../../utils/api/error/ns-api-error.mapper';
import { nsArrayItemAt } from '../../../../utils/helpers/arrays/ns-helpers-arrays';
import { NsNavigationService } from '../../../../utils/navigation/ns-navigation.service';
import { NsSubscriptionService } from '../../../../utils/subscription/ns-subscription.service';
import { NsServiceProvider } from '../../../service-provider/ns-service-provider';
import { NsFormControlMultiSelectItemEntity } from './ns-form-control-multi-select-item.entity';

export abstract class NsFormControlMultiSelectService<TMultiSelectItem extends NsFormControlMultiSelectItemEntity>
   extends NsSubscriptionService {
   private readonly _serviceProvider: NsServiceProvider<NsNavigationService>;

   protected constructor(serviceProvider: NsServiceProvider<NsNavigationService>) {
      super();
      this._serviceProvider = serviceProvider;
   }

   abstract getLoadListObservable(search: string): Observable<TMultiSelectItem[]>;

   parseError(error: any): string {
      const errorMessages = this._serviceProvider.apiErrorResolverService.resolve(
         nsApiErrorMapper,
         error
      );

      return nsArrayItemAt(errorMessages, 0);
   }

   handleDependingOnValuesChanged(results: any[]) {

   }
}
