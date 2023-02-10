import React, { PropsWithChildren } from 'react';
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
export declare const createContextComponent: <P extends {}, H = {}>(handlerCreator: (props: P) => H) => {
    Provider: (props: React.PropsWithChildren<P>) => JSX.Element;
    Consumer: React.Consumer<H>;
    Context: React.Context<H>;
    hook: () => H;
};
