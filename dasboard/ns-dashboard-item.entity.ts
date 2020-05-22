export interface NsDashboardItemEntity {
   nameId?: any;
   name?: string;
   action: () => void;
   requiresAuth?: boolean;
   includeIf?: () => boolean;
}
