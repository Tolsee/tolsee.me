'use client';

import { createContext, useContext } from 'react';

interface TalkActsValue {
  act: number;
  totalActs: number;
}

export const TalkActsContext = createContext<TalkActsValue>({ act: 0, totalActs: 1 });

export function useTalkActs(): TalkActsValue {
  return useContext(TalkActsContext);
}
