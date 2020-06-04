export interface FormsDateMinMaxEntity {
  minDate: string;
  maxDate: string;
  date: string;
}

export function newFormsDateMinMaxEntity(): FormsDateMinMaxEntity {
  return {
    minDate: null,
    maxDate: null,
    date: null,
  };
}
