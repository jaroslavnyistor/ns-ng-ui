import { Component, OnDestroy, OnInit } from '@angular/core';
import { nsFormatNumber } from '../../utils/helpers/numbers/ns-helpers-numbers';

@Component({
   selector: 'ns-clock',
   template: `{{time}}`,
   styles: []
})
export class NsClockComponent implements OnInit, OnDestroy {
   private readonly _delimiter = ':';

   private _time: string;
   private _timeoutId: number;

   get time(): string {
      return this._time;
   }

   ngOnInit() {
      this._timeoutId = window.setInterval(
         () => this.refreshTime(),
         1000
      );

      this.refreshTime();
   }

   private refreshTime() {
      const now = new Date();

      const hoursString = nsFormatNumber(now.getHours(), 2);
      const minutesString = nsFormatNumber(now.getMinutes(), 2);

      const value = now.getSeconds();
      const isDelimiterVisible = (value % 2) === 0;
      const delimiter = isDelimiterVisible ? this._delimiter : ' ';
      this._time = `${hoursString}${delimiter}${minutesString}`;
   }

   ngOnDestroy(): void {
      clearInterval(this._timeoutId);
   }
}
