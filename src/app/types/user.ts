export type User = {
  name?: string;
  email: string;
  password: string;
  rePassword?: string;
  phone?: string;
};

export type UserDto = {
  message: string;
  token: string;
  user: {
    email: string;
    name: string;
    role: string;
  };
};

export type OrderInfo = {
  shippingAddress: {
    deatils: string;
    phone: number;
    city: string;
  };
};
