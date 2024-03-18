export interface TableHeader {
    key: string;
    isTitle?: boolean;
    isNested?: boolean;
    label: string;
    sortable: boolean;
    actions?: {
        view: boolean;
        viewIsLink?: boolean;
        edit: boolean;
        editIsLink?: boolean;
        delete: boolean;
        checkDelete?: boolean;
        toggle: boolean;
    };
    sortOrder?: 'asc' | 'desc';
    isDate?: boolean
}
