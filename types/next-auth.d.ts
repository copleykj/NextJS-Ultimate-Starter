import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  export interface User {
    id: string;
    email?: string;
  }
  export interface Session {
    user: User;
  }

}

declare module 'next-auth/jwt' {
  export interface JWT {
    email: string;
    id: string;
  }
}
