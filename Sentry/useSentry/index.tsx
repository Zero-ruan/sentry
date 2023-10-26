import { useContext, createContext } from 'react';
import useInteractions from './useInteractions';

import type { SentryContextProviderProps, SentryContextProps } from './types';

const SentryContext = createContext<SentryContextProps>({
  onStartReplay: async () => {},
  onStopReplay: async () => {},
  onRegisterSentry: async () => {},
  onDestroy: async () => {},
  onIdentify: () => {}
});

export const SentryContextProvider = (props: SentryContextProviderProps) => {
  const { children } = props;

  const { onStartReplay, onStopReplay, onRegisterSentry, onDestroy, onIdentify } =
    useInteractions();

  return (
    <SentryContext.Provider
      value={{ onStartReplay, onStopReplay, onRegisterSentry, onDestroy, onIdentify }}
    >
      {children}
    </SentryContext.Provider>
  );
};

export const useSentry = () => useContext(SentryContext);
