import type { NodeTypes } from "@xyflow/react";

import { IdeaInputNode } from "./IdeaInputNode";
import { RefinementNode } from "./RefinementNode";
import { CustomNode } from "./types";
import { ArchNode } from "./ArchitectureNode";

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
  {
    id: "arch",
    type: "arch",
    position: { x: 1800, y: 0 },
    data: {
      arch: "",
      isLoading: false,
      error: null,
    },
  },
];



export const nodeTypes = {
  "ideaInput": IdeaInputNode,
  "refinement": RefinementNode,
  "arch": ArchNode,
} satisfies NodeTypes;
