import { Injectable } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class NsMediaQueryObserver {
   private readonly _mediaChanges: Observable<string[]>;

   get mediaChanges(): Observable<string[]> {
      return this._mediaChanges;
   }

   constructor(private readonly _mediaObserver: MediaObserver) {
      this._mediaChanges = _mediaObserver.asObservable()
      .pipe(
         switchMap(value => NsMediaQueryObserver.handleMediaChange(value))
      )
   }

   private static handleMediaChange(value: MediaChange[]): Observable<string[]> {
      return of(
         value.map(item => item.mqAlias)
      );
   }

   resolve(breakPoints: NsMediaQueryBreakpointChange[], mediaChanges: string[]) {
      for (let idx = 0; idx < breakPoints.length; idx++) {
         const breakPoint = breakPoints[idx];

         const found = mediaChanges.find(mediaChange => mediaChange === breakPoint.breakpoint);

         if (found) {
            breakPoint.action();
            return;
         }
      }

      const last = breakPoints[breakPoints.length - 1];
      last.action();
   }
}

export enum NsMediaQueryBreakpoint {
   Default = '',
   LessThanSmall = 'lt-sm',
   LessThanMedium = 'lt-md',
   LessThanLarge = 'lt-lg',
   LessThanXLarge = 'lt-xl',
}

export interface NsMediaQueryBreakpointChange {
   breakpoint: NsMediaQueryBreakpoint;
   action: () => void;
}
