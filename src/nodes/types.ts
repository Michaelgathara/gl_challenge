
import type { Node } from "@xyflow/react";

export type IdeaInputNodeData = {
  label: string;
};

export type RefinementNodeData = {
  idea: string;
  refinedIdea: string;
  isLoading: boolean;
  error: string | null;
};

export type IdeaInputNode = Node<IdeaInputNodeData, "ideaInput">;

export type RefinementNodeType = Node<RefinementNodeData, "refinement">;

export type CustomNode = IdeaInputNode | RefinementNodeType;
