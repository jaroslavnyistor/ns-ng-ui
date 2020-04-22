import { BehaviorSubject, Observable } from 'rxjs';
import { nsNull } from '../../../../utils/helpers/ns-helpers';
import { NsServiceProvider } from '../../../ns-service-provider';
import { NsFormModel } from '../../ns-form.model';
import { NsFormArray } from '../ns-form-array';
import { NsFormControlModel } from '../ns-form-control.model';
import { NsFormControlArrayItemEntity } from './ns-form-control-array-item.entity';
import { NsFormControlArrayItemModel } from './ns-form-control-array-item.model';
import { NsFormControlArrayConfiguration } from './ns-form-control-array.configuration';
import { NsFormControlArrayService } from './ns-form-control-array.service';

export class NsFormControlArrayModel<TEntity,
   TArrayItem extends NsFormControlArrayItemModel<TArrayItemEntity, TServiceProvider>,
   TArrayItemEntity extends NsFormControlArrayItemEntity,
   TServiceProvider extends NsServiceProvider>
   extends NsFormControlModel<TEntity,
      NsFormControlArrayModel<TEntity, TArrayItem, TArrayItemEntity, TServiceProvider>,
      NsFormArray> {

   private readonly _formModels$: BehaviorSubject<TArrayItem[]>;
   private readonly _canDeleteItems = true;
   private _service: NsFormControlArrayService<TArrayItem, TArrayItemEntity, TServiceProvider>;

   get formModels$(): Observable<TArrayItem[]> {
      return this._formModels$;
   }

   private get formModels(): TArrayItem[] {
      return this._formModels$.value;
   }

   get hasNoItems(): boolean {
      return this.formModels.length === 0;
   }

   get canDeleteItems(): boolean {
      return this._canDeleteItems;
   }

   constructor(parent: NsFormModel<TEntity, any>,
               config: NsFormControlArrayConfiguration
   ) {
      super(parent, config);

      this._formModels$ = new BehaviorSubject<TArrayItem[]>([]);

      this._canDeleteItems = nsNull(config.canDeleteItems, true);

      this.defaultValue = nsNull(config.defaultValue, []);

      this.withService(config.service);
   }

   clearValue() {
      this.mapEntitiesToFormModels(this.defaultValue);
   }

   withService(value: NsFormControlArrayService<TArrayItem, TArrayItemEntity, TServiceProvider>): this {
      if (value == null) {
         return this;
      }

      this._service = value;

      this.mapEntitiesToFormModels(this._initialValue);

      return this;
   }

   onInitialEntitySet(value: any): void {
      super.onInitialEntitySet(value);

      this.mapEntitiesToFormModels(value);
   }

   private mapEntitiesToFormModels(entities: TArrayItemEntity[]): void {
      if (this._service == null) {
         return;
      }

      this.formModels.forEach(formModel => formModel.onDestroy());

      this.formControl.clear();

      const formModels = entities.map(entity => this.createNewFormModel(entity));

      this.updateFormModelsListeners(formModels);
   }

   handleAdd() {
      const formModels = [...this.formModels];

      const lastFormModel = formModels.length === 0 ? null : formModels[formModels.length - 1];
      const entity = lastFormModel == null ? null : lastFormModel.clonedCurrentEntity;
      const newEntityItem = this._service.createNewEntity(entity);

      const formModel = this.createNewFormModel(newEntityItem);
      formModels.push(formModel);

      this.updateFormModelsListeners(formModels);
   }

   private createNewFormModel(entity: TArrayItemEntity): TArrayItem {
      const newFormModel = this._service.mapEntityToFormModel(entity);
      this.formControl.push(newFormModel.formGroup);

      newFormModel.onInit();
      newFormModel.onInitialEntitySet();

      return newFormModel;
   }

   handleDelete(index: number) {
      const formModels = [...this.formModels];
      const formModel = formModels[index];
      formModel.onDestroy();

      this.formControl.removeAt(index);
      formModels.splice(index, 1);

      this.updateFormModelsListeners(formModels);
   }

   private updateFormModelsListeners(formModels: TArrayItem[]) {
      this._formModels$.next(formModels);
   }

   onDestroy() {
      super.onDestroy();

      this.formModels.forEach(formModel => formModel.onDestroy());
   }
}
