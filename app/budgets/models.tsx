export interface Budget {
  id?: string;
  data: {
    monthlyIncome: number;
    expenses: ExpenseArray;
  };
}

export interface EncryptedBudget {
  id: string;
  data: Uint8Array;
}

export interface Expense {
  id: string;
  value: number;
  label: string;
}

export interface ExpenseArray extends Array<Expense> {}
