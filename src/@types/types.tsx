export interface Task {
  id?: string;
  name: string;
  quantity: number;
  value: number;
}

export interface Budget {
  id: string;
  client: {
    name: string;
    address: string;
  };
  status: 'PENDING' | 'APPROVED' | 'REFUSED' | 'COMPLETE';
  tasks: Task[];
  totalValue: number;
}

export interface Client {
  name: string;
  address: string;
  id: string;
}

export interface BudgetPdfCreate {
  referenceValue: number;
  created_at: Date;
  client: {
    name: string;
  };
  tasks: {
    name: string;
    quantity: number;
    value: number;
  }[];
  products?: {
    name: string;
    quantity: number;
    value: number;
  }[];
  due_date: Date;
  execution_period: number;
  observation: string;
}
