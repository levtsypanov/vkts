"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRequest = exports.requestConfig = void 0;
const react_1 = require("react");
exports.requestConfig = {};
function apiRequest(apiMethod, requestData = {}) {
    const [data, setData] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const buildUrl = () => {
        const queryParams = [];
        // Добавление параметра access_token
        if (exports.requestConfig.access_token) {
            queryParams.push(`access_token=${exports.requestConfig.access_token}`);
        }
        // Добавление параметра langId
        if (exports.requestConfig.langId) {
            queryParams.push(`langId=${exports.requestConfig.langId}`);
        }
        // Добавление дополнительных параметров из requestData
        Object.entries(requestData).forEach(([key, value]) => {
            queryParams.push(`${key}=${encodeURIComponent(value)}`);
        });
        const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
        return `${exports.requestConfig.apiUrl}/method/${apiMethod}${queryString}`;
    };
    async function fetchUrl() {
        const url = buildUrl();
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }
    (0, react_1.useEffect)(() => {
        fetchUrl();
        console.clear();
    }, []);
    return [data, loading];
}
exports.apiRequest = apiRequest;
;
