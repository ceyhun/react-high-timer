/// <reference types="react" />
import * as React from 'react';
export declare type ComponentClass<P> = React.ComponentClass<P>;
export declare type ComponentType<P> = React.ComponentType<P>;
export declare type Diff<T extends string, U extends string> = ({
    [P in T]: P;
} & {
    [P in U]: never;
} & {
    [x: string]: never;
})[T];
export declare type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
export interface TimerProps {
    clearTimeout: (handle: number) => void;
    setTimeout: (handler: (...args: any[]) => void, timeout: number) => number;
    clearInterval: (handle: number) => void;
    setInterval: (handler: (...args: any[]) => void, timeout: number) => number;
    clearImmediate: (handle: number) => void;
    setImmediate: (handler: (...args: any[]) => void) => number;
    cancelAnimationFrame: (handle: number) => void;
    requestAnimationFrame: (callback: FrameRequestCallback) => number;
}
export declare function withTimer<WrappedComponentProps extends TimerProps>(WrappedComponent: ComponentType<WrappedComponentProps>): ComponentClass<Omit<WrappedComponentProps, keyof TimerProps>>;
