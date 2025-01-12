import type { Node, BuiltInNode } from "@xyflow/react";

// Node-specific types for data
export type IdeaInputNodeData = {
  label: string;
  onInput: (idea: string) => void;
};

export type RefinementNodeData = {
  idea: string;
  onRefine: (refinedIdea: string) => void;
};

export type IdeaInputNode = Node<IdeaInputNodeData, "ideaInput">;

export type RefinementNodeType = Node<RefinementNodeData, "refinement">;

export type CustomNode = BuiltInNode | IdeaInputNode | RefinementNodeType;