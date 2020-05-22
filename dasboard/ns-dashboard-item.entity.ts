export interface NsDashboardItemEntity {
   nameId?: string;
   route: string;
   requiresAuth?: boolean;
   includeIf?: () => boolean;
}
