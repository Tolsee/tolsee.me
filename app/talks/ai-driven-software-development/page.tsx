'use client';

import { TalkDeck } from '@/components/talks/ai-driven-software-development/deck';
import { slides } from '@/components/talks/ai-driven-software-development/slides';

export default function PreparingEngineeringForAIPage() {
  return <TalkDeck slides={slides} />;
}
