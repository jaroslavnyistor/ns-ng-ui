import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NsFormControl } from '../ns-form-control';
import { NsFormControlModel } from '../ns-form-control.model';
import { NsFormControlSelectItemEntity } from './ns-form-control-select-item.entity';
import { NsFormControlSelectConfiguration } from './ns-form-control-select.configuration';
import { NsFormControlSelectService } from './ns-form-control-select.service';

export abstract class NsFormControlSelectModel<TEntity,
   TService extends NsFormControlSelectService<TSelectItem>,
   TSelectItem extends NsFormControlSelectItemEntity>
   extends NsFormControlModel<TEntity, NsFormControl, NsFormControlSelectConfiguration<TService, TSelectItem>> {
   private readonly _data$: BehaviorSubject<TSelectItem[]>;
   private readonly _textProperty: string;
   private readonly _service: TService;
   private _isLoading = false;

   protected get service(): TService {
      return this._service;
   }

   get textProperty(): string {
      return this._textProperty;
   }

   get data$(): Observable<TSelectItem[]> {
      return this._data$;
   }

   get isLoading(): boolean {
      return this._isLoading;
   }

   protected constructor(config: NsFormControlSelectConfiguration<TService, TSelectItem>) {
      super(config);

      this._data$ = new BehaviorSubject([]);
      this._textProperty = config.textProperty;

      this._service = config.service;
   }

   clearValue() {
      this.setValue(this._service.getEmptyValue());
   }

   loadData() {
      this._isLoading = true;

      this.subscribeTo(
         this.service.getLoadListObservable()
            .pipe(delay(0)),
         {
            next: data => this.handleDataLoaded(data),
            error: error => this.handleError(error)
         }
      );
   }

   private handleDataLoaded(data: TSelectItem[]) {
      this._isLoading = false;
      this._data$.next(data);
   }

   private handleError(error) {
      this._isLoading = false;
      const errorMessage = this.service.parseError(error);
      this.handleErrorMessage(errorMessage);
   }
}
