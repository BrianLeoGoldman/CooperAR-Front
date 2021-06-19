export interface MoneyRequest {
  id?: number;
  requester: string;
  moneyRequested: number;
  creationDate: string;
  state: string;
  accountStatus: string;
  depositReceipt: string;
}
