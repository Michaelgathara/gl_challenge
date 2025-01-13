// src/nodes/RefinementNode.tsx

import React from "react";
import { Handle, Position } from "@xyflow/react";
import { ArchNodeData } from "./types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

type Props = {
  data: ArchNodeData;
};

export const ArchNode: React.FC<Props> = ({ data }) => {
  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md">
      <h3 className="font-bold mb-2">Architecture</h3>
      {data.isLoading ? (
        <p className="text-gray-500">Refining idea...</p>
      ) : data.error ? (
        <p className="text-red-500">Error: {data.error}</p>
      ) : data.arch ? (
        <ReactMarkdown
          children={data.arch}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSanitize]}
          className="prose"
        />
      ) : (
        <p className="text-gray-500">No architecture idea yet.</p>
      )}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
