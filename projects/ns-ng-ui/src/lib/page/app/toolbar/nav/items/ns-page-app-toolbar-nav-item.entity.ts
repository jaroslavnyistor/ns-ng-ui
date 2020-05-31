import { NsIcon } from '../../../../../icon/ns-icon.enum';

export interface NsPageAppToolbarNavItemEntity {
  titleId?: any;
  title?: string;
  subtitleId?: any;
  icon?: NsIcon;
  action: () => void;
  requiresAuth?: boolean;
  includeIf?: () => boolean;
}
