type Status = 'pending';

export type Transaction = {
  amount: string;
  refrence: string;
  buyer?: any;
  freight: string;
  origin: string;
  status: Status;
  submitted: Date;
  seller?: any;
  address: string;
};
