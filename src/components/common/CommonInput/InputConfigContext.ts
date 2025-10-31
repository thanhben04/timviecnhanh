import { createContext, useContext } from 'react';

interface IContext {
    tabIndex?: number;
}

const InputConfigContext = createContext<IContext>({});

export const useInputConfigContext = () => useContext(InputConfigContext);

const InputConfigProvider = InputConfigContext.Provider;

export default InputConfigProvider;
