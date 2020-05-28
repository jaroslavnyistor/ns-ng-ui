import { CustomerEntity } from '../../data/customer.entity';

export interface FormsArrayInitialValueEntity {
   supervisor: string;
   customers: CustomerEntity[];
}

export function newFormsArrayInitialValueEntity(): FormsArrayInitialValueEntity {
   return {
      supervisor: '',
      customers: []
   };
}
