import { ReactNode } from 'react';

export interface SentryContextProps {
  onStartReplay: () => Promise<void>;
  onStopReplay: () => Promise<void>;
  onRegisterSentry: () => Promise<void>;
  onDestroy: () => Promise<void>;
  onIdentify: (args: { username: string; email?: string }) => void;
}

export interface SentryContextProviderProps {
  children: ReactNode;
}
