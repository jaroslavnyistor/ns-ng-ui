import { OnChanges, SimpleChanges } from '@angular/core';
import { NsFormControlAutocompleteItemEntity } from './ns-form-control-autocomplete-item.entity';
import { NsFormControlAutocompleteModel } from './ns-form-control-autocomplete.model';
import { NsFormControlAutocompleteService } from './ns-form-control-autocomplete.service';

export abstract class NsFormControlAutocompleteBaseComponent<TService extends NsFormControlAutocompleteService<TAutocompleteItem>,
   TAutocompleteItem extends NsFormControlAutocompleteItemEntity>
   implements OnChanges {
   private readonly _service: TService;

   abstract model: NsFormControlAutocompleteModel<any, TAutocompleteItem>;

   protected constructor(service: TService) {
      this._service = service;
   }

   ngOnChanges(changes: SimpleChanges): void {
      if (changes.model) {
         this.model.withService(this._service);
      }
   }
}
