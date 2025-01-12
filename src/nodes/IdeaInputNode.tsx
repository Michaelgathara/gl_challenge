import { Handle, NodeProps, Position } from "@xyflow/react";
import type { IdeaInputNode } from "./types";

export function IdeaInputNode({ id, data, positionAbsoluteX, positionAbsoluteY }: NodeProps<IdeaInputNode>) {
  return (
    <div className="p-4 border rounded bg-white shadow">
      <div className="font-bold text-gray-800">{data.label || "Idea Input"}</div>
      <textarea
        rows={4}
        placeholder="Enter your idea here..."
        className="w-full border p-2 rounded mt-2"
        onChange={(e) => data.onInput(e.target.value)}
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
