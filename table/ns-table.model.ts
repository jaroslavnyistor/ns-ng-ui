import { BehaviorSubject, Observable } from 'rxjs';
import { nsIsNotNullOrEmpty } from '../../utils/helpers/strings/ns-helpers-strings';
import { NsTableColumnModel } from './ns-table.column.model';

export class NsTableModel<TEntity> {
   private readonly _columns$ = new BehaviorSubject<NsTableColumnModel[]>([]);
   private readonly _displayedColumns$ = new BehaviorSubject<string[]>([]);
   private readonly _dataSource$ = new BehaviorSubject<any[]>([]);
   private readonly _title$ = new BehaviorSubject<string>('');
   private readonly _hasTitle$ = new BehaviorSubject<boolean>(false);
   private readonly _useFooter$ = new BehaviorSubject<boolean>(false);

   get columns$(): Observable<NsTableColumnModel[]> {
      return this._columns$;
   }

   private get columns(): NsTableColumnModel[] {
      return this._columns$.value;
   }

   get displayedColumns$(): Observable<string[]> {
      return this._displayedColumns$;
   }

   get dataSource$(): Observable<TEntity[]> {
      return this._dataSource$;
   }

   set dataSource(value: TEntity[]) {
      this._dataSource$.next(value);
   }

   get title$(): Observable<string> {
      return this._title$;
   }

   get hasTitle$(): Observable<boolean> {
      return this._hasTitle$;
   }

   set title(value: string) {
      this._title$.next(value);
      this._hasTitle$.next(nsIsNotNullOrEmpty(value));
   }

   get useFooter$(): Observable<boolean> {
      return this._useFooter$;
   }

   set footerValue(value: any) {
      if (value != null) {
         this.columns.forEach(column => column.footerValue = value[column.name]);
      }
   }

   constructor(columns: NsTableColumnModel[]) {
      this._columns$.next(columns);

      this._displayedColumns$.next(
         columns.map(value => value.name)
      );
   }

   useFooter(): this {
      this._useFooter$.next(true);

      return this;
   }
}
