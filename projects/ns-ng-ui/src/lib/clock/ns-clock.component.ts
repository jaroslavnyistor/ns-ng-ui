import { Component } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { nsFormatNumber } from 'ns-js-utils';

@Component({
   selector: 'ns-clock',
   template: `{{time$ | async}}`,
   styles: []
})
export class NsClockComponent {
   private readonly _delimiter = ':';
   private readonly _time$: Observable<string>;

   get time$(): Observable<string> {
      return this._time$;
   }

   constructor() {
      this._time$ = timer(0, 1000)
         .pipe(
            map(() => this.mapTime())
         );
   }

   private mapTime(): string {
      const now = new Date();

      const hoursString = nsFormatNumber(now.getHours(), 2);
      const minutesString = nsFormatNumber(now.getMinutes(), 2);

      const value = now.getSeconds();
      const isDelimiterVisible = (value % 2) === 0;
      const delimiter = isDelimiterVisible ? this._delimiter : ' ';
      return `${hoursString}${delimiter}${minutesString}`;
   }
}
