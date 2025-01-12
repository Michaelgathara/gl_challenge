import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";
import { RunButton } from "./components/RunButton";
import { RunReportPanel } from "./components/RunReportPanel";
import { Logo } from "./components/Logo";
import { IdeaInputNodeData, RefinementNodeData } from "./nodes/types";

import debounce  from "lodash/debounce";

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [idea, setIdea] = useState("");
  const [refinedIdea, setRefinedIdea] = useState("");

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  const updateNodeData = useCallback(
    (nodeId: string, newData: Partial<IdeaInputNodeData> | Partial<RefinementNodeData>) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            if (node.type === "ideaInput") {
              const data = node.data as IdeaInputNodeData;
              return {
                ...node,
                data: {
                  ...data,
                  ...(newData as Partial<IdeaInputNodeData>),
                },
              };
            } else if (node.type === "refinement") {
              const data = node.data as RefinementNodeData;
              return {
                ...node,
                data: {
                  ...data,
                  ...(newData as Partial<RefinementNodeData>),
                },
              };
            }
          }
          return node;
        })
      );
    },
    [setNodes]
  );
  
  const debouncedUpdateNodeData = useMemo(
    () => debounce(updateNodeData, 500), 
    [updateNodeData]
  );

  const handleIdeaInput = useCallback(
    (newIdea: string) => {
      setIdea(newIdea);
      debouncedUpdateNodeData("refinement", { idea: newIdea });
    },
    [debouncedUpdateNodeData]
  );

  const handleRefinementOutput = (newRefinedIdea: string) => {
    setRefinedIdea(newRefinedIdea);
  }

  useEffect(() => {
    return () => {
      debouncedUpdateNodeData.cancel();
    };
  }, [debouncedUpdateNodeData]);

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background />
      <Logo />
      <RunButton onRun={() => setIsPanelOpen(true)} />
      <RunReportPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </ReactFlow>
  );
}
