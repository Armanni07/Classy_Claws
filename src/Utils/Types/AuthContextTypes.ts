export type ContextPropType = {
  children: React.ReactNode;
};

export type CurrentUser = {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  region?: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = {
  id?: number;
  Firstname: string;
  Lastname: string;
  Email: string;
  Password: string;
  ConfirmPassword?: string;
  Phone_No: number;
  Location: string;
  Designation: string;
  Photo?: File | string;
  Employer?: string;
};

export type AuthContextType = {
  admin: (inputs: { email: string; password: string }) => Promise<void>;
  login: (inputs: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  UserLogout: () => void;
  loggedIn: boolean | null;
  currentUser: CurrentUser | null;
};

export type UsersType = {
  id?: number;
  Firstname: string;
  Lastname: string;
  Email: string;
  Password?: string;
  Phone_No: number;
  Location: string;
  Photo?: string;
  Purchases?: [
    {
      Name: string;
      Description: string;
      Price?: number;
      Quantity: number;
    }
  ];
  Status?: string;
};

export type UsersInputType = {
  Firstname: string;
  Lastname: string;
  Email: string;
  Password: string;
  Phone_No: number;
  Location: string;
  Photo?: {
    file?: File;
    ImageUrl: string;
  };
};
