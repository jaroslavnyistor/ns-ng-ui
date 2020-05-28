export interface CustomerEntity {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  age: number;
  website: string;
  isVip: boolean;
}

export function newCustomer(): CustomerEntity {
  return {
    id: 0,
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    email: '',
    age: 0,
    website: '',
    isVip: false,
  };
}
