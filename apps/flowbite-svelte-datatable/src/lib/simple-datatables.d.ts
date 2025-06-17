declare module 'simple-datatables' {
	export interface DataTableOptions {
		searchable?: boolean;
		sortable?: boolean;
		fixedHeight?: boolean;
		perPage?: number;
		perPageSelect?: number[];
		classes?: Record<string, string>;
		[key: string]: any;
	}

	export class DataTable {
		constructor(table: HTMLTableElement | string, options?: DataTableOptions);
		destroy(): void;
		refresh(): void;
		update(): void;
		search(query: string): void;
		[key: string]: any;
	}
}
