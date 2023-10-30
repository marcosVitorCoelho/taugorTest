export interface Data {
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  sex: string;
  department: string;
  salary: number;
  email?: string;
  address?: string;
  del?: React.ReactNode;
  edit?: React.ReactNode
}

export interface Column {
  id: 'name' | 'sex' | 'phone' | 'role' | 'department' | 'salary' | 'del' | 'edit' | 'firstName' | 'lastName';
  label: string;
  minWidth?: number;
  format?: (value: number) => string;
}


export interface TableInfo {
  rows: Data[],
  columns: Column[]
}