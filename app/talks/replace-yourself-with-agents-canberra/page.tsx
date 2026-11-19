'use client';

import { Deck } from '@/components/talks/pipeline-optimizer-canberra/deck';
import { Slide } from '@/components/talks/pipeline-optimizer-canberra/slide';
import { slides } from '@/components/talks/pipeline-optimizer-canberra/slides-data';

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
