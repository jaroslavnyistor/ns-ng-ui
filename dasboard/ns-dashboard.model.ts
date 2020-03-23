import { BehaviorSubject, Observable } from 'rxjs';
import { NsComponentModel } from '../component/ns-component.model';
import { NsDashboardItemEntity } from './ns-dashboard-item.entity';
import { NsDashboardItemModel } from './ns-dashboard-item.model';

export abstract class NsDashboardModel extends NsComponentModel {
   private readonly _items$ = new BehaviorSubject<NsDashboardItemModel[]>([]);

   get items$(): Observable<NsDashboardItemModel[]> {
      return this._items$;
   }

   set items(value: NsDashboardItemEntity[]) {
      this._items$.next(
         value.map(entity => new NsDashboardItemModel(entity))
      );
   }
}
