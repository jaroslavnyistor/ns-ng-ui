import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable, of, throwError } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { nsNull } from 'nikisoft-utils';
import { NsFormControl } from '../ns-form-control';
import { NsFormControlModel } from '../ns-form-control.model';
import { NsFormControlAutocompleteConfiguration } from './ns-form-control-autocomplete.configuration';
import { NsFormControlAutocompleteService } from './ns-form-control-autocomplete.service';

export abstract class NsFormControlAutocompleteModel<
  TEntity,
  TService extends NsFormControlAutocompleteService
> extends NsFormControlModel<TEntity, NsFormControl, NsFormControlAutocompleteConfiguration<TService>> {
  private readonly _service: TService;
  private _data$: Observable<string[]>;
  private _isLoading = false;

  protected get service(): TService {
    return this._service;
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

  get autofocus(): boolean {
    return this._config.autofocus === true;
  }

  protected constructor(config: NsFormControlAutocompleteConfiguration<TService>) {
    super(config);

    this.defaultValue = nsNull(config.defaultValue, []);

    this._service = config.service;

    if (this.hasDependingValues) {
      this.handleDependingOnValuesChanged(this.dependingValues);
    }
  }

  onInit() {
    super.onInit();

    this._data$ = this.valueChanges$.pipe(
      debounceTime(400),
      switchMap((search) => {
        this._isLoading = true;

        return this.isDisabled ? of(this.defaultValue) : this._service.getLoadListObservable(search);
      }),
      map((data) => {
        this._isLoading = false;
        return data;
      }),
      catchError((error) => {
        this.handleError(error);
        return throwError(error);
      }),
    );
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
    this.patchValue('');
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

    this._service.handleDependingOnValuesChanged(results);
  }
}
