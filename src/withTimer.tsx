import * as React from 'react';
import * as hoistNonReactStatic from 'hoist-non-react-statics';

declare const global: Window;

const GLOBAL = typeof window === 'undefined' ? global : window;

export type ComponentClass<P> = React.ComponentClass<P>;
export type ComponentType<P> = React.ComponentType<P>;

// Diff / Omit taken from https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-311923766
export type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

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

export function withTimer<WrappedComponentProps extends TimerProps>(
  WrappedComponent: ComponentType<WrappedComponentProps>,
): ComponentClass<Omit<WrappedComponentProps, keyof TimerProps>> {
  const Wrapper = class TimerComponent extends React.Component<Omit<WrappedComponentProps, keyof TimerProps>, {}> {
    static displayName = `TimerComponent(${WrappedComponent.displayName || WrappedComponent.name})`;

    _timeouts: number[] = [];
    _intervals: number[] = [];
    _immediates: number[] = [];
    _rafs: number[] = [];

    componentWillUnmount() {
      this._timeouts.forEach(id => {
        GLOBAL.clearTimeout(id);
      });
      this._timeouts = [];

      this._intervals.forEach(id => {
        GLOBAL.clearInterval(id);
      });
      this._intervals = [];

      this._immediates.forEach(id => {
        GLOBAL.clearImmediate(id);
      });
      this._immediates = [];

      this._rafs.forEach(id => {
        GLOBAL.cancelAnimationFrame(id);
      });
      this._rafs = [];
    }

    _localClearer = (handle: number, array: number[]): void => {
      const index = array.indexOf(handle);
      if (index === -1) {
        return;
      }
      array.splice(index, 1);
    };

    _clearTimeout = (handle: number): void => {
      this._localClearer(handle, this._timeouts);
      GLOBAL.clearTimeout(handle);
    };

    _setTimeout = (handler: (...args: any[]) => void, timeout: number): number => {
      const id = GLOBAL.setTimeout(handler, timeout);
      this._timeouts.push(id);
      return id;
    };

    _clearInterval = (handle: number): void => {
      this._localClearer(handle, this._intervals);
      GLOBAL.clearInterval(handle);
    };

    _setInterval = (handler: (...args: any[]) => void, timeout: number): number => {
      const id = GLOBAL.setInterval(handler, timeout);
      this._intervals.push(id);
      return id;
    };

    _clearImmediate = (handle: number): void => {
      this._localClearer(handle, this._immediates);
      GLOBAL.clearTimeout(handle);
    };

    _setImmediate = (handler: (...args: any[]) => void): number => {
      const id = GLOBAL.setImmediate(handler);
      this._immediates.push(id);
      return id;
    };

    _cancelAnimationFrame = (handle: number): void => {
      this._localClearer(handle, this._rafs);
      GLOBAL.cancelAnimationFrame(handle);
    };

    _requestAnimationFrame = (callback: FrameRequestCallback): number => {
      const id = GLOBAL.requestAnimationFrame(callback);
      this._rafs.push(id);
      return id;
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          clearInterval={this._clearInterval}
          setInterval={this._setInterval}
          clearTimeout={this._clearTimeout}
          setTimeout={this._setTimeout}
          clearImmediate={this._clearImmediate}
          setImmediate={this._setImmediate}
          requestAnimationFrame={this._requestAnimationFrame}
          cancelAnimationFrame={this._cancelAnimationFrame}
        />
      );
    }
  };
  hoistNonReactStatic(Wrapper, WrappedComponent);
  return Wrapper;
}
