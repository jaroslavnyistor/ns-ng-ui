export interface NsDashboardItemEntity {
   titleId?: any;
   title?: string;
   action: () => void;
   requiresAuth?: boolean;
   includeIf?: () => boolean;
}
