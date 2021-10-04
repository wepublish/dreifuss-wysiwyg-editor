import PropTypes from 'prop-types';
export declare const BasicExample: {
    (): JSX.Element;
    propTypes: {
        /**
         * BasicExample contents
         */
        label: PropTypes.Validator<string>;
        /**
         * Optional click handler
         */
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
    };
    defaultProps: {
        onClick: any;
        displayName: string;
    };
};
//# sourceMappingURL=BasicExample.d.ts.map