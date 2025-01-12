import { NodeProps, Handle, Position } from "@xyflow/react";
import { useEffect, useState } from "react";
import type { RefinementNodeType } from "./types";

export function RefinementNode({ data }:  NodeProps<RefinementNodeType>) {
  const [refinedIdea, setRefinedIdea] = useState("");

  useEffect(() => {
    if (data.idea) {
      // TODO: API CALL
      setRefinedIdea(`Refined: ${data.idea}`);
      data.onRefine(`Refined: ${data.idea}`);
    }
  }, [data.idea]);

  return (
    <div className="p-4 border rounded bg-white shadow">
      <div className="font-bold text-gray-800">Refinement Node</div>
      <p className="mt-2 text-sm text-gray-600">{refinedIdea || "Waiting for input..."}</p>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
