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
import { refineIdea } from "./services/openai";

import debounce  from "lodash/debounce";
import { IdeaInputNode } from "./nodes/IdeaInputNode";

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
    () => debounce(updateNodeData, 1000), 
    [updateNodeData]
  );

  const handleRefine = useCallback(
    async (nodeId: string, idea: string) => {
      await updateNodeData(nodeId, { isLoading: true, error: null });
  
      try {
        console.log("Refining idea: ", idea);
        const { refinedIdea } = await refineIdea(idea);
        await updateNodeData(nodeId, { refinedIdea, isLoading: false });
      } catch (error: any) {
        await updateNodeData(nodeId, { error: error.message, isLoading: false });
      }
    },
    [updateNodeData]
  );  

  useEffect(() => {
    const ideaNode = nodes.find((node) => node.type === "ideaInput");
    const refinementNode = nodes.find((node) => node.type === "refinement");
    
    if (ideaNode && refinementNode) {
      const ideaLabel = (ideaNode.data as IdeaInputNodeData).label; // yet another janky type setting here
      const currentRefinementIdea = (refinementNode.data as RefinementNodeData).idea;
      
      if (ideaLabel !== currentRefinementIdea) {
        debouncedUpdateNodeData("refinement", { idea: ideaLabel });
      }
    }
  }, [nodes, debouncedUpdateNodeData]);

  useEffect(() => {
    const refinementNode = nodes.find((node) => node.id === "refinement");
    
    if (
      refinementNode &&
      refinementNode.type === "refinement" &&
      refinementNode.data.idea &&
      !refinementNode.data.isLoading && 
      !refinementNode.data.refinedIdea
    ) {
      handleRefine("refinement", refinementNode.data.idea);
    }
  }, [nodes, handleRefine]);

  useEffect(() => {
    return () => {
      debouncedUpdateNodeData.cancel();
    };
  }, [debouncedUpdateNodeData]);

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
        nodes={nodes}
      />
    </ReactFlow>
  );
}
