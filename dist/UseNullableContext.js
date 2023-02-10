"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUseNullableContext = void 0;
const react_1 = require("react");
/**
 * Creates function which calls useContext and throws an error in case, when
 * context value is null
 * @param {string} hookName
 * @param {React.Context<C>} context
 * @returns {() => React.Context<Exclude<C, null>>}
 */
function createUseNullableContext(hookName, context) {
    return () => {
        const value = (0, react_1.useContext)(context);
        if (!value) {
            throw new Error(`Hook ${hookName} was called outside of context provider context`);
        }
        return value;
    };
}
exports.createUseNullableContext = createUseNullableContext;
