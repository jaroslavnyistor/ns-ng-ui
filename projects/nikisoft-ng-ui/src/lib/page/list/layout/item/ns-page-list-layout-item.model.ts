import { NsPageListLayoutItemEntity } from './ns-page-list-layout-item.entity';

export abstract class NsPageListLayoutItemModel implements NsPageListLayoutItemEntity {
  private _id: number;
  private _isSelected: boolean;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get isSelected(): boolean {
    return this._isSelected;
  }

  set isSelected(value: boolean) {
    this._isSelected = value;
  }

  protected constructor(id: number) {
    this._id = id;
  }
}
