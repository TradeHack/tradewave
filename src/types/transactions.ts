export enum Status {
  pending = 'pending',
  delivered = 'delivered',
  inTransit = 'in transit',
  declined = 'declined',
  live = 'live',
}

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
