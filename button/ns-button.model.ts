import { NsButtonType } from './ns-button-type';

export abstract class NsButtonModel {
   private _text: string;
   private _isVisible: boolean;
   private _isDisabled: boolean;
   private _type: NsButtonType = NsButtonType.None;

   protected constructor(text: string, isVisible = true) {
      this._text = text;
      this._isVisible = isVisible;
   }

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

   set type(value: NsButtonType) {
      this._type = value;
   }
}
