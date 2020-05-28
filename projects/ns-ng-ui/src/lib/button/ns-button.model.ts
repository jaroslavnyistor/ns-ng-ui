import { ThemePalette } from '@angular/material/core';
import { NsButtonMaterialType } from './ns-button-material-type';
import { NsButtonType } from './ns-button-type.enum';

export abstract class NsButtonModel {
  private _text: string;
  private _isVisible: boolean;
  private _isDisabled: boolean;
  private _type: NsButtonType = NsButtonType.Button;
  private _materialType: NsButtonMaterialType = NsButtonMaterialType.None;

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get isVisible(): boolean {
    return this._isVisible;
  }

  set isVisible(value: boolean) {
    this._isVisible = value;
  }

  get isDisabled(): boolean {
    return this._isDisabled;
  }

  set isDisabled(value: boolean) {
    this._isDisabled = value;
  }

  get typeText(): string {
    return this._type;
  }

  get materialTypeText(): ThemePalette {
    return this._materialType as ThemePalette;
  }

  get type(): NsButtonType {
    return this._type;
  }

  set type(value: NsButtonType) {
    this._type = value;
  }

  get materialType(): NsButtonMaterialType {
    return this._materialType;
  }

  set materialType(value: NsButtonMaterialType) {
    this._materialType = value;
  }

  protected constructor(text: string, isVisible = true) {
    this._text = text;
    this._isVisible = isVisible;
  }
}
