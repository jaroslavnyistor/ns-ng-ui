import { NsIcon } from '../../../../../icon/ns-icon.enum';

export interface NsToolbarNavigationItemEntity {
   titleId: any;
   subtitleId?: any;
   icon?: NsIcon;
   action: () => void;
   requiresAuth?: boolean;
   includeIf?: () => boolean;
}
