'use client';

import { Deck } from '@/components/talks/pipeline-optimizer/deck';
import { Slide } from '@/components/talks/pipeline-optimizer/slide';
import { slides } from '@/components/talks/pipeline-optimizer/slides-data';

export default function PipelineOptimizerTalkPage() {
  return (
    <Deck>
      {slides.map((slide) => (
        <Slide key={slide.id} title={slide.title} notes={slide.notes}>
          {slide.content}
        </Slide>
      ))}
    </Deck>
  );
}
