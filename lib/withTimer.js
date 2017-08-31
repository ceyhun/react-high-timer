"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const hoistNonReactStatic = require("hoist-non-react-statics");
const GLOBAL = typeof window === 'undefined' ? global : window;
function withTimer(WrappedComponent) {
    const Wrapper = (_a = class TimerComponent extends React.Component {
            constructor() {
                super(...arguments);
                this._timeouts = [];
                this._intervals = [];
                this._immediates = [];
                this._rafs = [];
                this._localClearer = (handle, array) => {
                    const index = array.indexOf(handle);
                    if (index === -1) {
                        return;
                    }
                    array.splice(index, 1);
                };
                this._clearTimeout = (handle) => {
                    this._localClearer(handle, this._timeouts);
                    GLOBAL.clearTimeout(handle);
                };
                this._setTimeout = (handler, timeout) => {
                    const id = GLOBAL.setTimeout(handler, timeout);
                    this._timeouts.push(id);
                    return id;
                };
                this._clearInterval = (handle) => {
                    this._localClearer(handle, this._intervals);
                    GLOBAL.clearInterval(handle);
                };
                this._setInterval = (handler, timeout) => {
                    const id = GLOBAL.setInterval(handler, timeout);
                    this._intervals.push(id);
                    return id;
                };
                this._clearImmediate = (handle) => {
                    this._localClearer(handle, this._immediates);
                    GLOBAL.clearTimeout(handle);
                };
                this._setImmediate = (handler) => {
                    const id = GLOBAL.setImmediate(handler);
                    this._immediates.push(id);
                    return id;
                };
                this._cancelAnimationFrame = (handle) => {
                    this._localClearer(handle, this._rafs);
                    GLOBAL.cancelAnimationFrame(handle);
                };
                this._requestAnimationFrame = (callback) => {
                    const id = GLOBAL.requestAnimationFrame(callback);
                    this._rafs.push(id);
                    return id;
                };
            }
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
            render() {
                return (React.createElement(WrappedComponent, Object.assign({}, this.props, { clearInterval: this._clearInterval, setInterval: this._setInterval, clearTimeout: this._clearTimeout, setTimeout: this._setTimeout, clearImmediate: this._clearImmediate, setImmediate: this._setImmediate, requestAnimationFrame: this._requestAnimationFrame, cancelAnimationFrame: this._cancelAnimationFrame })));
            }
        },
        _a.displayName = `TimerComponent(${WrappedComponent.displayName || WrappedComponent.name})`,
        _a);
    hoistNonReactStatic(Wrapper, WrappedComponent);
    return Wrapper;
    var _a;
}
exports.withTimer = withTimer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aFRpbWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dpdGhUaW1lci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBK0I7QUFDL0IsK0RBQStEO0FBSS9ELE1BQU0sTUFBTSxHQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBb0IvRCxtQkFDRSxnQkFBc0Q7SUFFdEQsTUFBTSxPQUFPLFNBQUcsb0JBQXFCLFNBQVEsS0FBSyxDQUFDLFNBQTREO1lBQS9GOztnQkFHZCxjQUFTLEdBQWEsRUFBRSxDQUFDO2dCQUN6QixlQUFVLEdBQWEsRUFBRSxDQUFDO2dCQUMxQixnQkFBVyxHQUFhLEVBQUUsQ0FBQztnQkFDM0IsVUFBSyxHQUFhLEVBQUUsQ0FBQztnQkF3QnJCLGtCQUFhLEdBQUcsQ0FBQyxNQUFjLEVBQUUsS0FBZTtvQkFDOUMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDcEMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakIsTUFBTSxDQUFDO29CQUNULENBQUM7b0JBQ0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLENBQUMsQ0FBQztnQkFFRixrQkFBYSxHQUFHLENBQUMsTUFBYztvQkFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUMzQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM5QixDQUFDLENBQUM7Z0JBRUYsZ0JBQVcsR0FBRyxDQUFDLE9BQWlDLEVBQUUsT0FBZTtvQkFDL0QsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQy9DLElBQUks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