import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { BehaviorSubject, Observable } from 'rxjs';
import { nsNull } from '../../../../utils/helpers/ns-helpers';
import { NsFormModel } from '../../ns-form.model';
import { NsFormControl } from '../ns-form-control';
import { NsFormControlModel } from '../ns-form-control.model';
import { NsFormControlAutocompleteConfiguration } from './ns-form-control-autocomplete.configuration';
import { NsFormControlAutocompleteService } from './ns-form-control-autocomplete.service';

export class NsFormControlAutocompleteModel<TEntity>
   extends NsFormControlModel<TEntity, NsFormControlAutocompleteModel<TEntity>, NsFormControl> {

   private readonly _data$: BehaviorSubject<string[]>;
   private _service: NsFormControlAutocompleteService;
   private _isLoading = false;
   private _searchTimeoutId = null;
   private _lastSearchValue = '';

   get hasNoItems(): boolean {
      return this._data$.value.length === 0;
   }

   get data$(): Observable<string[]> {
      return this._data$;
   }

   get isLoading(): boolean {
      return this._isLoading;
   }

   get isLoaded(): boolean {
      return !this._isLoading;
   }

   constructor(parent: NsFormModel<TEntity, any, any>,
               config: NsFormControlAutocompleteConfiguration
   ) {
      super(parent, config);

      this._data$ = new BehaviorSubject<string[]>([]);

      this.defaultValue = nsNull(config.defaultValue, []);

      this.withService(config.service);
   }

   withService(service: NsFormControlAutocompleteService): this {
      if (service == null) {
         return this;
      }

      this._service = service;

      if (this.hasDependingValues) {
         this.handleDependingOnValuesChanged(this.dependingValues);
      }

      return this;
   }

   handleInputIsFocused() {
      if (this.hasNoItems && !this.isLoading) {
         this.loadData(this.value);
      }
   }

   performFullTextSearch($event: KeyboardEvent) {
      if ($event.code === 'Tab') {
         return;
      }

      $event.stopPropagation();
      $event.preventDefault();

      const search = ($event.target as HTMLInputElement).value;
      this.clearTypingTimer();

      if (this._lastSearchValue === search) {
         return;
      }

      this._searchTimeoutId = window.setTimeout(
         () => this.loadData(search),
         400
      );
   }

   private clearTypingTimer() {
      if (this._searchTimeoutId != null) {
         clearTimeout(this._searchTimeoutId);
         this._searchTimeoutId = null;
      }
   }

   private loadData(search: string) {
      this.clearTypingTimer();

      this._lastSearchValue = search;
      this._isLoading = true;

      this.subscribeTo(
         this._service.getLoadListObservable(search),
         {
            next: data => this.handleDataLoaded(data),
            error: error => this.handleError(error)
         }
      );
   }

   private handleDataLoaded(data: string[]) {
      this._isLoading = false;
      this._data$.next(data);
   }

   private handleError(error) {
      this._isLoading = false;
      const errorMessage = this._service.parseError(error);
      this.handleErrorMessage(errorMessage);
   }

   canClearValue(): boolean {
      return super.canClearValue() && this.isLoaded;
   }

   clearSelection(autocomplete: MatAutocompleteTrigger) {
      if (this.canClearValue()) {
         this.clearValue();
         window.setTimeout(() => autocomplete.openPanel(), 0);
      }
   }

   clearValue() {
      this.resetValueToDefault();

      if (this.isDisabled) {
         this._data$.next(this.defaultValue);
      } else {
         this.loadData('');
      }
   }

   private resetValueToDefault() {
      if (this._service == null) {
         return;
      }

      this.patchValue(null);
   }

   handleOptionSelected(value: string) {
      this.patchValue(value);
   }

   onDestroy() {
      super.onDestroy();

      this._service.onDestroy();
   }

   protected handleDependingOnValuesChanged(results: any[]) {
      super.handleDependingOnValuesChanged(results);

      if (this._service != null) {
         this._service.handleDependingOnValuesChanged(results);
      }
   }
}
