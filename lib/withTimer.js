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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aFRpbWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dpdGhUaW1lci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBK0I7QUFDL0IsK0RBQStEO0FBSS9ELE1BQU0sTUFBTSxHQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBYS9ELG1CQUNFLGdCQUVnRTtJQUVoRSxNQUFNLE9BQU8sU0FBRyxvQkFBcUIsU0FBUSxLQUFLLENBQUMsU0FBb0M7WUFBdkU7O2dCQUdkLGNBQVMsR0FBYSxFQUFFLENBQUM7Z0JBQ3pCLGVBQVUsR0FBYSxFQUFFLENBQUM7Z0JBQzFCLGdCQUFXLEdBQWEsRUFBRSxDQUFDO2dCQUMzQixVQUFLLEdBQWEsRUFBRSxDQUFDO2dCQXdCckIsa0JBQWEsR0FBRyxDQUFDLE1BQWMsRUFBRSxLQUFlO29CQUM5QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNwQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqQixNQUFNLENBQUM7b0JBQ1QsQ0FBQztvQkFDRCxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDekIsQ0FBQyxDQUFDO2dCQUVGLGtCQUFhLEdBQUcsQ0FBQyxNQUFjO29CQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzNDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzlCLENBQUMsQ0FBQztnQkFFRixnQkFBVyxHQUFHLENBQUMsT0FBaUMsRUFBRSxPQUFlO29CQUMvRCxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxD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