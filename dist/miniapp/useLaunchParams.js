"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLaunchParams = void 0;
const react_1 = require("react");
const getLaunchParams_1 = require("./getLaunchParams");
function useLaunchParams() {
    return (0, react_1.useMemo)(() => ((0, getLaunchParams_1.getLaunchParams)()), []);
}
exports.useLaunchParams = useLaunchParams;
