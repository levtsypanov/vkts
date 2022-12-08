/* eslint-disable @typescript-eslint/ban-types */
import React, { PropsWithChildren, useContext } from 'react';

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
export const createContextComponent = function <P extends {}, H = {}>(handlerCreator: (props: P) => H) {
  // @ts-ignore
  const Context = React.createContext<H>(undefined);

  const Provider = (props: PropsWithChildren<P>) => (
    // @ts-ignore
    <Context.Provider value={handlerCreator(props)}>{props.children}</Context.Provider>
  );

  return {
    Provider: Provider,
    Consumer: Context.Consumer,
    Context,
    // eslint-disable-next-line react-hooks/rules-of-hooks
    hook: () => useContext(Context),
  };
};
