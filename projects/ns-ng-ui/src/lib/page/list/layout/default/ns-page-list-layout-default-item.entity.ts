import { NsPageListLayoutItemEntity } from '../item/ns-page-list-layout-item.entity';

export interface NsPageListLayoutDefaultItemEntity extends NsPageListLayoutItemEntity {
   title: string;
   subtitle: string;
   hasDescriptions: boolean;
   descriptions: string[];
}
