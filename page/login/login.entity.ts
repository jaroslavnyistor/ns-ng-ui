export interface LoginEntity {
   userName: string;
   password: string;
}

export function newLoginEntity(): LoginEntity {
   return {
      userName: '',
      password: ''
   };
}
