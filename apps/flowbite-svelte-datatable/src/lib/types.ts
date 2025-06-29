import type { Snippet } from 'svelte';
import type { HTMLTableAttributes, HTMLThAttributes, HTMLAttributes, HTMLTdAttributes } from 'svelte/elements';
import type { ClassValue } from 'clsx';
import type { DataTable, DataTableOptions } from 'simple-datatables';

// Event callback types for Svelte 5
export interface DataTableEventCallbacks {
  onInitStart?: () => void;
  onInitComplete?: (dataTable: DataTable) => void;
  onInitError?: (error: Error) => void;
  onRefresh?: (dataTable: DataTable) => void;
  onUpdate?: (dataTable: DataTable) => void;
  onPage?: (page: number, dataTable: DataTable) => void;
  onSort?: (column: number, direction: string, dataTable: DataTable) => void;
  onSearch?: (query: string, matched: any[], dataTable: DataTable) => void;
  onSelectRow?: (rowIndex: number, event: Event, dataTable: DataTable) => void;
  onSelectAll?: (dataTable: DataTable) => void;
  onDeselectRow?: (rowIndex: number, dataTable: DataTable) => void;
  onDeselectAll?: (dataTable: DataTable) => void;
  isLoading?: boolean;
  dataTableInstance?: DataTable | null;
}

// prettier-ignore
export type HeadItemType = string | number | {
  text: string;
  [key: string]: string | number | boolean;
};

export interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  children?: Snippet;
  headerSlot?: Snippet;
  defaultRow?: boolean;
  headItems?: HeadItemType[];
}

export type TableItemType = Record<string, string | number | boolean>;

export interface DataTableProps extends Omit<HTMLTableAttributes, 'border'>, DataTableEventCallbacks {
  children?: Snippet;
  footerSlot?: Snippet;
  captionSlot?: Snippet;
  divClass?: ClassValue;
  items?: TableItemType[];
  dataTableOptions?: DataTableOptions;
  multiSelect?: boolean;
  selectable?: boolean;
}

export interface TableBodyRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children?: Snippet;
}

export interface TableBodyCellProps extends HTMLTdAttributes {
  children?: Snippet;
  colspan?: number;
  onclick?: () => void;
}

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  children?: Snippet;
  bodyItems?: BodyRow[];
}

export interface TableHeadCellProps<T = any> extends HTMLThAttributes {
  children?: Snippet;
}

export interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  children?: Snippet;
  headerSlot?: Snippet;
  defaultRow?: boolean;
  headItems?: HeadItemType[];
}

export interface DataTableProps extends Omit<HTMLTableAttributes, 'border'> {
  children?: Snippet;
  footerSlot?: Snippet;
  captionSlot?: Snippet;
  divClass?: ClassValue;
  items?: TableItemType[];
  dataTableOptions?: DataTableOptions;
  multiSelect?: boolean;
  selectable?: boolean;
}

export interface TableBodyRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children?: Snippet;
}

export interface TableBodyCellProps extends HTMLTdAttributes {
  children?: Snippet;
  colspan?: number;
  onclick?: () => void;
}

export type CellValue = string | number | boolean | null | undefined;

export type BodyRow = CellValue[] | Record<string, CellValue>;

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  children?: Snippet;
  bodyItems?: BodyRow[];
}

export interface TableHeadCellProps<T = any> extends HTMLThAttributes {
  children?: Snippet;
}
