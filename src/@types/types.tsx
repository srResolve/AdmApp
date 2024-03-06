export interface Task {
  id?: string;
  name: string;
  quantity: number;
  value: number;
  action?: 'CREATE' | 'UPDATE' | 'DELETE';
}

export interface Budget {
  id: string;
  client: {
    name: string;
    address: string;
  };
  status: 'PENDING' | 'APPROVED' | 'REFUSED' | 'COMPLETE';
  tasks: Task[];
  products: Task[];
  totalValue: number;
  observation: string | undefined;
  due_date: Date;
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
