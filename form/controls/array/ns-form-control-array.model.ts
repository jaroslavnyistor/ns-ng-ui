import { FormArray } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { nsNull } from '../../../../utils/helpers/ns-helpers';
import { NsNavigationService } from '../../../../utils/navigation/ns-navigation.service';
import { NsServiceProvider } from '../../../service-provider/ns-service-provider';
import { NsFormControlModel } from '../ns-form-control.model';
import { NsFormControlArrayItemEntity } from './ns-form-control-array-item.entity';
import { NsFormControlArrayItemModel } from './ns-form-control-array-item.model';
import { NsFormControlArrayConfiguration } from './ns-form-control-array.configuration';
import { NsFormControlArrayService } from './ns-form-control-array.service';

export abstract class NsFormControlArrayModel<TEntity,
   TService extends NsFormControlArrayService<TFormArrayItemModel, TArrayItemEntity, TServiceProvider, TAppNavService>,
   TFormArrayItemModel extends NsFormControlArrayItemModel<TArrayItemEntity, TServiceProvider, TAppNavService>,
   TArrayItemEntity extends NsFormControlArrayItemEntity,
   TServiceProvider extends NsServiceProvider<TAppNavService>,
   TAppNavService extends NsNavigationService>
   extends NsFormControlModel<TEntity,
      FormArray,
      NsFormControlArrayConfiguration<TService,
         TFormArrayItemModel,
         TArrayItemEntity,
         TServiceProvider,
         TAppNavService>> {

   private readonly _formModels$: BehaviorSubject<TFormArrayItemModel[]>;
   private readonly _canDeleteItems = true;
   private readonly _service: TService;

   get formModels$(): Observable<TFormArrayItemModel[]> {
      return this._formModels$;
   }

   private get formModels(): TFormArrayItemModel[] {
      return this._formModels$.value;
   }

   get hasNoItems(): boolean {
      return this.formModels.length === 0;
   }

   get canDeleteItems(): boolean {
      return this._canDeleteItems;
   }

   protected get service(): TService {
      return this._service;
   }

   protected constructor(
      config: NsFormControlArrayConfiguration<TService,
         TFormArrayItemModel,
         TArrayItemEntity,
         TServiceProvider,
         TAppNavService>
   ) {
      super(new FormArray([]), config);

      this._formModels$ = new BehaviorSubject<TFormArrayItemModel[]>([]);

      this._canDeleteItems = nsNull(config.canDeleteItems, true);

      this.defaultValue = nsNull(config.defaultValue, []);

      this._service = config.service;
   }

   clearValue() {
   }

   onValuePatch(value: any) {
      super.onValuePatch(value);

      this.mapEntitiesToFormModels(value);
   }

   private mapEntitiesToFormModels(entities: TArrayItemEntity[]): void {
      this.formModels.forEach(formModel => formModel.onDestroy());

      this.formControl.clear();

      const formModels = entities.map(entity => this.createNewFormModel(entity));

      this.updateFormModelsListeners(formModels);
   }

   handleAdd() {
      const formModels = [...this.formModels];

      const lastFormModel = formModels.length === 0 ? null : formModels[formModels.length - 1];
      const entity = lastFormModel == null ? null : lastFormModel.currentEntity;
      const newEntityItem = this._service.createNewEntity(entity);

      const formModel = this.createNewFormModel(newEntityItem);
      formModels.push(formModel);

      this.updateFormModelsListeners(formModels);
   }

   private createNewFormModel(entity: TArrayItemEntity): TFormArrayItemModel {
      const newFormModel = this._service.mapEntityToFormModel();
      newFormModel.onInit();
      newFormModel.setInitialEntity(entity);

      this.formControl.push(newFormModel.formGroup);

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

   private updateFormModelsListeners(formModels: TFormArrayItemModel[]) {
      this._formModels$.next(formModels);
   }

   onDestroy() {
      super.onDestroy();

      this.formModels.forEach(formModel => formModel.onDestroy());
   }
}
