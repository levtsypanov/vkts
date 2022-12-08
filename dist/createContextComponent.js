"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContextComponent = void 0;
/* eslint-disable @typescript-eslint/ban-types */
const react_1 = __importStar(require("react"));
/**
 * Функция для создания компонента-контекста
 *
 * @example Создание компонента
 *   const Container = createContextComponent((props: { initialKek: string }) => {
 *     const [kek, setKek] = useState(props.initialKek);
 *
 *     return {
 *       kek,
 *       setKek,
 *     };
 *   });
 *
 * @example Оборачивание провайдером на верхнем уровне
 *   <Container.Provider initialKek="kek">
 *     <Pup />
 *   </Container>
 *
 * @example Использование
 *   const { kek, setKek } = useContext(Container.Context)
 */
const createContextComponent = function (handlerCreator) {
    // @ts-ignore
    const Context = react_1.default.createContext(undefined);
    const Provider = (props) => (
    // @ts-ignore
    <Context.Provider value={handlerCreator(props)}>{props.children}</Context.Provider>);
    return {
        Provider: Provider,
        Consumer: Context.Consumer,
        Context,
        // eslint-disable-next-line react-hooks/rules-of-hooks
        hook: () => (0, react_1.useContext)(Context),
    };
};
exports.createContextComponent = createContextComponent;
