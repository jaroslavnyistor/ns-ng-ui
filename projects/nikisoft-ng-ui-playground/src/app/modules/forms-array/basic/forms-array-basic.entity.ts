import { CustomerEntity } from '../../data/customer.entity';

export interface FormsArrayBasicEntity {
  canDeleteCustomers: boolean;
  customers: CustomerEntity[];
}

export function newFormsArrayBasicEntity(): FormsArrayBasicEntity {
  return {
    canDeleteCustomers: true,
    customers: [],
  };
}
