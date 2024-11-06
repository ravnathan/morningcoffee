export interface UserLogin {
  username: string;
  password: string;
}

export interface CashierData {
  fullname: string;
  password: string;
  avatar?: File;
}

export interface CashierList {
  cashiersData: Array<{
    id: string;
    username: string;
    fullname: string;
    password: string;
    role: string;
    avatar: string;
  }>;
}

export interface CashierFetch {
    username: string
    fullname: string
    role: string
    avatar: string
}

export interface shiftInterface {
  shift: string
  value: number
}

export interface CashierStatus {
  user: {
    username: string
    fullname: string
    role: string
    avatar: string
  }
}