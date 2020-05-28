import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MediaChange } from '@angular/flex-layout';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NsMediaQueryObserver {
  private readonly _mediaChanges: Observable<string[]>;

  get mediaChanges(): Observable<string[]> {
    return this._mediaChanges;
  }

  constructor(private readonly _mediaObserver: MediaObserver) {
    this._mediaChanges = _mediaObserver
      .asObservable()
      .pipe(switchMap((value) => NsMediaQueryObserver.handleMediaChange(value)));
  }

  private static handleMediaChange(value: MediaChange[]): Observable<string[]> {
    return of(value.map((item) => item.mqAlias));
  }

  resolve(breakPoints: NsMediaQueryBreakpointChanges, mediaChanges: string[]) {
    for (const breakPoint in breakPoints) {
      if (breakPoints.hasOwnProperty(breakPoint)) {
        const found = mediaChanges.find((mediaChange) => mediaChange === breakPoint);

        if (found) {
          const action = breakPoints[breakPoint];
          action();
          return;
        }
      }
    }

    const defaultAction = breakPoints[NsMediaQueryBreakpoint.Default];

    if (defaultAction != null) {
      defaultAction();
    }
  }
}

export enum NsMediaQueryBreakpoint {
  Default = 'default',
  LessThanSmall = 'lt-sm',
  LessThanMedium = 'lt-md',
  LessThanLarge = 'lt-lg',
  LessThanXLarge = 'lt-xl',
  GreaterThanSmall = 'gt-sm',
  GreaterThanMedium = 'gt-md',
  GreaterThanLarge = 'gt-lg',
  GreaterThanXLarge = 'gt-xl',
  XSmall = 'xs',
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  XLarge = 'xl',
}

export type NsMediaQueryBreakpointChanges = {
  [key: string]: () => void;
};

export interface NsNgClassBreakpoints {
  all: string[];
  xl?: string[];
  lg?: string[];
  md?: string[];
  sm?: string[];
  xs?: string[];
}
