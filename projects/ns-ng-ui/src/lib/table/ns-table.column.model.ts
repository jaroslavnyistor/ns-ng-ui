import { BehaviorSubject, Observable } from 'rxjs';

export class NsTableColumnModel {
  private readonly _name: string;
  private readonly _text: string;
  private readonly _footerValue$ = new BehaviorSubject<string>('');
  private _width = 'auto';

  get name(): string {
    return this._name;
  }

  get text(): string {
    return this._text;
  }

  get footerValue$(): Observable<string> {
    return this._footerValue$;
  }

  set footerValue(value: string) {
    this._footerValue$.next(value);
  }

  get width(): string {
    return this._width;
  }

  constructor(name: string, text: string) {
    this._name = name;
    this._text = text;
  }

  applyWidth(value: string): this {
    this._width = value;
    return this;
  }
}
