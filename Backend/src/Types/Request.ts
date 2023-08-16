declare namespace Express {
  export interface Request {
    user: {
      id: string;
      name: string;
      token: string;
      email: string;
      isadmin: boolean;
    };
  }
}
