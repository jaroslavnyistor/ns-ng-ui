import { Observable, OperatorFunction, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NsSubscriptionService } from '../../utils/subscription/ns-subscription.service';
import { NsComponentModel } from './ns-component.model';

export abstract class NsComponentService<TModel extends NsComponentModel> extends NsSubscriptionService {
   private readonly _model: TModel;
   private _isInitialized = false;
   private _isDestroyed = false;

   get isInitialized(): boolean {
      return this._isInitialized;
   }

   get isDestroyed(): boolean {
      return this._isDestroyed;
   }

   protected constructor(model: TModel) {
      super();

      this._model = model;
   }

   get model(): TModel {
      return this._model;
   }

   onInit(): void {
      super.onInit();

      this.model.onInit();

      this._isInitialized = true;
   }

   onDestroy(): void {
      super.onDestroy();

      this.model.onDestroy();

      this._isDestroyed = true;
   }

   protected withLoading(source: Observable<any>): Observable<any> {
      this.model.startLoading();

      return source
         .pipe(this.loadingFinished());
   }

   protected pipeLoading(source: Observable<any>, ...operators: OperatorFunction<any, any>[]) {
      let result = source
         .pipe(this.loadingStarted());

      operators.forEach(operator => {
         result = result.pipe(operator);
      });

      return result.pipe(this.loadingFinished());
   }

   protected loadingStarted(): OperatorFunction<any, any> {
      return source => source
         .pipe(
            tap(() => this.model.startLoading())
         );
   }

   protected loadingFinished(): OperatorFunction<any, any> {
      return source => source
         .pipe(
            map(value => {
               this.model.loadingFinished();
               return value;
            }),
            catchError(error => {
               this.model.loadingFailed();
               return throwError(error);
            })
         );
   }
}
