export interface FormsAutocompleteBasicEntity {
  id: number;
  customerName: string;
}

export function newFormsAutocompleteBasicEntity(): FormsAutocompleteBasicEntity {
  return { id: 0, customerName: '' };
}
