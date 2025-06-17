
import type { Snippet } from "svelte";
import type { HTMLTableAttributes, HTMLThAttributes, HTMLAttributes, HTMLTdAttributes } from "svelte/elements";
import type { ClassValue } from "clsx";
import type { DataTableOptions } from "simple-datatables";


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

export interface DataTableProps extends Omit<HTMLTableAttributes, "border"> {
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

export type TableSearchType = {
  striped?: boolean;
  hoverable?: boolean;
  color?: string;
};

export interface TableSearchProps extends HTMLTableAttributes {
  children?: Snippet;
  header?: Snippet;
  footer?: Snippet;
  divClass?: ClassValue;
  inputValue?: string;
  striped?: boolean;
  hoverable?: boolean;
  customColor?: string;
  color?: string;
  innerDivClass?: ClassValue;
  inputClass?: ClassValue;
  searchClass?: ClassValue;
  svgDivClass?: ClassValue;
  svgClass?: ClassValue;
  tableClass?: ClassValue;
  placeholder?: string;
}