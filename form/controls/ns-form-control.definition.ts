import { Observable, PartialObserver } from 'rxjs';

export interface NsFormControlDefinition {
   key: string;

   hasValue: boolean;

   onInit();

   onDestroy();

   getValueChanges$(): Observable<any>;

   subscribeToValueChanges(observer: PartialObserver<any>): this;

   onInitialEntitySet(value: any): void;
}
