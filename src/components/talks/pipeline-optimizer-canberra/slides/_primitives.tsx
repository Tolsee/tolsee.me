import type { ReactNode } from 'react';

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4 list-none mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-xl leading-snug text-white/85">
          <span className="text-white/25 select-none flex-shrink-0 mt-0.5">–</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function MonoCallout({ children }: { children: ReactNode }) {
  return (
    <pre className="font-mono text-sm text-white/70 bg-white/5 border border-white/10 rounded p-4 leading-relaxed whitespace-pre-wrap mt-4">
      {children}
    </pre>
  );
}
