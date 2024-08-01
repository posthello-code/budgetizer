export interface Budget {
  id: string;
  data: {
    monthlyIncome: number;
    expenses:
      | [
          {
            id: String;
            value: number;
            label: String;
          }
        ]
      | [];
  };
}

export interface EncryptedBudget {
  id: string;
  data: Uint8Array;
}
