declare namespace Express {
  export interface Request {
    user: {
      _id: string;
      name: string;
      token: string;
      email: string;
      isAdmin: boolean;
    };
  }
}
