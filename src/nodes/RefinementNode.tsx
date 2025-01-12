// src/nodes/RefinementNode.tsx

import React from "react";
import { Handle, Position } from "@xyflow/react";
import { RefinementNodeData } from "./types";

type Props = {
  data: RefinementNodeData;
};

export const RefinementNode: React.FC<Props> = ({ data }) => {
  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md">
      <h3 className="font-bold mb-2">Refinement</h3>
      {data.isLoading ? (
        <p className="text-gray-500">Refining idea...</p>
      ) : data.error ? (
        <p className="text-red-500">Error: {data.error}</p>
      ) : data.refinedIdea ? (
        <p className="text-gray-800">{data.refinedIdea}</p>
      ) : (
        <p className="text-gray-500">No refined idea yet.</p>
      )}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
