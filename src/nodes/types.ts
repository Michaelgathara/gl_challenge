import type { Node, BuiltInNode } from "@xyflow/react";

export type FunctionNode = Node<
  {
    label: string;
    func?: (input: any) => any;
    functionName: string;
  },
  "function-node"
>;
export type AppNode = BuiltInNode | FunctionNode;

export type IdeaInputNode = Node<
  {
    label: string;
    onInput: (idea: string) => void;
  },
  'ideaInput'
>;

export type RefinementNodeType = Node<
  {
    idea: string;
    onRefine: (refinedIdea: string) => void;
  },
  "refinement"
>;