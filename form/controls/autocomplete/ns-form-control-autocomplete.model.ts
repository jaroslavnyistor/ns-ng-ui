import { FormControl, ValidationErrors } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { nsNull } from '../../../../utils/helpers/ns-helpers';
import { NsFormModel } from '../../ns-form.model';
import { NsFormControlValidators } from '../../validators/ns-form-control.validators';
import { NsFormControlRequiredValidator } from '../../validators/provided/ns-form-control-required.validator';
import { NsFormControl } from '../ns-form-control';
import { NsFormControlModel } from '../ns-form-control.model';
import { NsFormGroup } from '../ns-form-group';
import { NsFormControlAutocompleteItemEntity } from './ns-form-control-autocomplete-item.entity';
import { NsFormControlAutocompleteConfiguration } from './ns-form-control-autocomplete.configuration';
import { noSelectionId } from './ns-form-control-autocomplete.constants';
import { NsFormControlAutocompleteService } from './ns-form-control-autocomplete.service';
import { NsFormControlAutocompleteRequiredValidator } from './validators/ns-form-control-autocomplete-required.validator';

export class NsFormControlAutocompleteModel<TEntity, TAutocompleteItem extends NsFormControlAutocompleteItemEntity>
   extends NsFormControlModel<TEntity, NsFormControlAutocompleteModel<TEntity, TAutocompleteItem>, NsFormGroup> {

   private readonly _data$: BehaviorSubject<TAutocompleteItem[]>;
   private readonly _textValidators: NsFormControlValidators;
   private readonly _textProperty: string;
   private readonly _textFormControl: NsFormControl;
   private _service: NsFormControlAutocompleteService<TAutocompleteItem>;
   private _isLoading = false;
   private _searchTimeoutId = null;
   private _lastSearchValue = '';

   get id(): number {
      return this.value.id;
   }

   get textProperty(): string {
      return this._textProperty;
   }

   get textFormControl(): FormControl {
      return this._textFormControl;
   }

   get hasNoItems(): boolean {
      return this._data$.value.length === 0;
   }

   get data$(): Observable<TAutocompleteItem[]> {
      return this._data$;
   }

   get isLoadingInPanelVisible(): boolean {
      return this.isLoading || this.hasValue;
   }

   get isLoading(): boolean {
      return this._isLoading;
   }

   get isLoaded(): boolean {
      return !this._isLoading;
   }

   constructor(parent: NsFormModel<TEntity, any>,
               config: NsFormControlAutocompleteConfiguration
   ) {
      super(parent, config);

      this._data$ = new BehaviorSubject<TAutocompleteItem[]>([]);
      this._textValidators = new NsFormControlValidators(this.langService);

      this._textProperty = config.textProperty;

      this._textFormControl = this.formControl.controls[this._textProperty] as NsFormControl;

      this.defaultValue = nsNull(config.defaultValue, []);

      this.setupValidators();
   }

   protected resolveHasValue(newValue: any) {
      return newValue.id !== noSelectionId;
   }

   private setupValidators() {
      if (this.isRequired) {
         this.addValidator(new NsFormControlAutocompleteRequiredValidator(this._textFormControl));
         this._textValidators.add(new NsFormControlRequiredValidator());
      }

      this._textFormControl.setValidators(this._textValidators.build());
   }

   withService(service: NsFormControlAutocompleteService<TAutocompleteItem>): this {
      this._service = service;

      if (this.hasDependingValues) {
         this.handleDependingOnValuesChanged(this.dependingValues);
      }

      return this;
   }

   handleInputIsFocused() {
      if (this.hasNoItems && !this.isLoading) {
         this.loadData('');
      }
   }

   performFullTextSearch($event: KeyboardEvent) {
      $event.stopPropagation();
      $event.preventDefault();

      const search = ($event.target as HTMLInputElement).value;

      this.clearTypingTimer();

      if (this._lastSearchValue === search || this.hasValue) {
         return;
      }

      this._searchTimeoutId = setTimeout(
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

      this._service.getLoadListObservable(search)
      .subscribe({
         next: data => this.handleDataLoaded(data),
         error: error => this.handleError(error)
      });
   }

   private handleDataLoaded(data: TAutocompleteItem[]) {
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
         setTimeout(() => autocomplete.openPanel(), 0);
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

      const emptyValue = {
         id: noSelectionId,
         [this._textProperty]: ''
      };

      this.patchValue(emptyValue);
   }

   handleOptionSelected(value: TAutocompleteItem) {
      this.patchValue(value);
   }

   onDestroy() {
      super.onDestroy();

      this._service.onDestroy();
   }

   protected getFormControlErrors(): ValidationErrors {
      return super.getFormControlErrors() || this.textFormControl.errors;
   }

   protected handleDependingOnValuesChanged(results: any[]) {
      super.handleDependingOnValuesChanged(results);

      if (this._service != null) {
         this._service.handleDependingOnValuesChanged(results);
      }
   }
}
