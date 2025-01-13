import React from "react";
import { Handle, Position, useReactFlow, NodeProps } from "@xyflow/react";

export const IdeaInputNode = ({ id, data }: NodeProps) => {
  const { setNodes } = useReactFlow();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    console.log("New Value: ", newValue);
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              label: newValue,
            },
          };
        }
        return node;
      })
    );
  };

  return (
    <div className="p-4 bg-yellow-100 rounded-lg shadow-md">
      <h3 className="font-bold mb-2">Idea Input</h3>
      <textarea
        value={data.label as string || ""}
        onChange={handleChange}
        placeholder="Enter your software idea here..."
        className="w-full p-2 border rounded mb-2"
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
