import type { EdgeTypes } from '@xyflow/react';

export const initialEdges = [
  {
    id: 'edge-1',
    source: 'ideaInput',
    target: 'refinement',
  },
];

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
