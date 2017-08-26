/// <reference types="react" />
import * as React from 'react';
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
export declare function withTimer<WrappedComponentProps extends {}>(WrappedComponent: React.ComponentClass<WrappedComponentProps & TimerProps> | React.StatelessComponent<WrappedComponentProps & TimerProps>): {
    new (props?: WrappedComponentProps | undefined, context?: any): {
        _timeouts: number[];
        _intervals: number[];
        _immediates: number[];
        _rafs: number[];
        componentWillUnmount(): void;
        _localClearer: (handle: number, array: number[]) => void;
        _clearTimeout: (handle: number) => void;
        _setTimeout: (handler: (...args: any[]) => void, timeout: number) => number;
        _clearInterval: (handle: number) => void;
        _setInterval: (handler: (...args: any[]) => void, timeout: number) => number;
        _clearImmediate: (handle: number) => void;
        _setImmediate: (handler: (...args: any[]) => void) => number;
        _cancelAnimationFrame: (handle: number) => void;
        _requestAnimationFrame: (callback: FrameRequestCallback) => number;
        render(): JSX.Element;
        setState<K extends never>(f: (prevState: {}, props: WrappedComponentProps) => Pick<{}, K>, callback?: (() => any) | undefined): void;
        setState<K extends never>(state: Pick<{}, K>, callback?: (() => any) | undefined): void;
        forceUpdate(callBack?: (() => any) | undefined): void;
        props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<WrappedComponentProps>;
        state: Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    displayName: string;
};
