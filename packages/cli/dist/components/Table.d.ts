declare const Header: {
    ({ children }: any): any;
    propTypes: {
        children: any;
    };
};
declare const Cell: {
    ({ children }: any): any;
    propTypes: {
        children: any;
        focused: any;
    };
    defaultProps: {
        focused: boolean;
    };
};
declare const Skeleton: {
    ({ children }: any): any;
    propTypes: {
        children: any;
    };
};
declare const Table: {
    ({ data, padding, header, cell, skeleton }: any): any;
    propTypes: {
        data: any;
        padding: any;
        header: any;
        cell: any;
        skeleton: any;
    };
    defaultProps: {
        data: any[];
        padding: number;
        header: {
            ({ children }: any): any;
            propTypes: {
                children: any;
            };
        };
        cell: {
            ({ children }: any): any;
            propTypes: {
                children: any;
                focused: any;
            };
            defaultProps: {
                focused: boolean;
            };
        };
        skeleton: {
            ({ children }: any): any;
            propTypes: {
                children: any;
            };
        };
    };
};
export { Table, Header, Cell, Skeleton };
