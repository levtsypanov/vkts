import { Context } from 'react';
/**
 * Creates function which calls useContext and throws an error in case, when
 * context value is null
 * @param {string} hookName
 * @param {React.Context<C>} context
 * @returns {() => React.Context<Exclude<C, null>>}
 */
export declare function createUseNullableContext<C>(hookName: string, context: Context<C | null>): () => C;
