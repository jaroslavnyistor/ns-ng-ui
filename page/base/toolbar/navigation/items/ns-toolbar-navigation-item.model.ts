import { NsIcon } from '../../../../../icon/ns-icon.enum';

export interface NsToolbarNavigationItemModel {
   title: string;
   subtitle?: string;
   icon?: NsIcon;
   action: () => void;
}
