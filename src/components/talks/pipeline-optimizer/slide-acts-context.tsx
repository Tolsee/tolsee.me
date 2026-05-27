'use client';

import { createContext, useContext } from 'react';

export interface SlideActsValue {
  /** Current act, 0-indexed. */
  act: number;
  /** Total acts on the active slide (1 if no animation). */
  totalActs: number;
}

export const SlideActsContext = createContext<SlideActsValue>({ act: 0, totalActs: 1 });

export function useSlideActs(): SlideActsValue {
  return useContext(SlideActsContext);
}
