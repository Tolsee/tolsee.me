import type { ReactNode } from 'react';

export interface SlideData {
  id: number;
  title?: string;
  content: ReactNode;
  notes?: string;
  /** Number of animation steps before → / Space moves to the next slide. Defaults to 1. */
  acts?: number;
}
