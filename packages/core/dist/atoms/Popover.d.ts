import React from 'react';
import './popover.css';
export interface PopoverProps {
    readonly children: any;
    readonly icon: any;
}
export interface PopoverState {
    isVisible: boolean;
}
export declare class Popover extends React.Component<PopoverProps, PopoverState> {
    node: any;
    constructor(props: any);
    handleClick(): void;
    handleOutsideClick(e: any): void;
    render(): JSX.Element;
}
export default Popover;
//# sourceMappingURL=Popover.d.ts.map