import { NsString } from 'nikisoft-utils';
import { NsPageListLayoutItemModel } from '../item/ns-page-list-layout-item.model';

export abstract class NsPageListLayoutDefaultItemModel extends NsPageListLayoutItemModel {
  private _title: string;
  private _subtitle: string;
  private _descriptions: string[] = [];

  protected constructor(id: number) {
    super(id);
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get subtitle(): string {
    return this._subtitle;
  }

  set subtitle(value: string) {
    this._subtitle = value;
  }

  get hasDescriptions(): boolean {
    return this.descriptions.length > 0;
  }

  get descriptions(): string[] {
    return this._descriptions;
  }

  set descriptions(value: string[]) {
    this._descriptions = value.filter((item) => NsString.isNotNullOrEmpty(item));
  }
}
