export interface DiffResponseData {
  code: number;
  data: TableData[];
  limit: number;
  offset: number;
  total: number;
}

export interface TableData {
  id: string;
  timestamp: Date;
  diff: TableDiffData[];
}

interface TableDiffData {
  field: string;
  oldValue: string;
  newValue: string;
}

export interface TableRowData {
  date: Date;
  newValue: string;
  oldValue: string;
  id: string;
}
