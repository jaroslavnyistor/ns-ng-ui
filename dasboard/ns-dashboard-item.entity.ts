export interface NsDashboardItemEntity {
   nameId?: string;
   action: () => void;
   requiresAuth?: boolean;
   includeIf?: () => boolean;
}
