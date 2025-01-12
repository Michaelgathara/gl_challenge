import type { Node, BuiltInNode } from "@xyflow/react";

// Node-specific types for data
export type IdeaInputNodeData = {
  label: string;
  onInput: (idea: string) => void;
};

export type RefinementNodeData = {
  idea: string;
  refinedIdea: string;
  onRefine: (refinedIdea: string) => void;
  isLoading: boolean;
  error: string | null;
};

export type IdeaInputNode = Node<IdeaInputNodeData, "ideaInput">;

export type RefinementNodeType = Node<RefinementNodeData, "refinement">;

export type CustomNode = BuiltInNode | IdeaInputNode | RefinementNodeType;