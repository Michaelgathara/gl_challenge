import type { NodeTypes } from "@xyflow/react";

import { IdeaInputNode } from "./IdeaInputNode";
import { RefinementNode } from "./RefinementNode";
import { CustomNode } from "./types";

export const initialNodes: CustomNode[] = [
  {
    id: "ideaInput",
    type: "ideaInput",
    position: { x: 0, y: 0 },
    data: {
      label: "",
    },
  },
  {
    id: "refinement",
    type: "refinement",
    position: { x: 300, y: 0 },
    data: {
      idea: "",
      refinedIdea: "",
      isLoading: false,
      error: null,
    },
  },
];



export const nodeTypes = {
  "ideaInput": IdeaInputNode,
  "refinement": RefinementNode,
} satisfies NodeTypes;
