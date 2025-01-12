// TODO: Fix the janky data.idea usage

import React from "react";
import { CustomNode, RefinementNodeData } from "../nodes/types";

interface RunReportPanelProps {
  isOpen: boolean;
  onClose: () => void;
  nodes: CustomNode[];
}

export function RunReportPanel({ isOpen, onClose, nodes }: RunReportPanelProps) {
  const ideaInputNode = nodes.find((node) => node.type === "ideaInput");
  const refinementNode = nodes.find((node) => node.type === "refinement");

  return (
    <div
      className={`fixed top-20 right-4 h-[90vh] w-96 bg-white border border-gray-200 rounded-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-40 shadow-lg`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Run Report</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 p-1"
        >
          ✕
        </button>
      </div>
      <div className="p-4 overflow-y-auto">
        <h3 className="font-semibold mb-2">Refined Idea:</h3>
        {(refinementNode?.data as RefinementNodeData).refinedIdea ? (
          <p className="mb-4">{(refinementNode?.data as RefinementNodeData).refinedIdea}</p>
        ) : (
          <p className="mb-4 text-gray-500">No refined idea available.</p>
        )}

        {/* Add sections for other node outputs */}
        {/* Example for Feature Definition Node */}
        {/* 
        <h3 className="font-semibold mb-2">Features:</h3>
        {featureDefinitionNode?.data.features ? (
          <ul className="list-disc list-inside mb-4">
            {featureDefinitionNode.data.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        ) : (
          <p className="mb-4 text-gray-500">No features defined.</p>
        )}
        */}

        {/* Repeat for Architecture, MVP Code, etc. */}

        {/* Example: Display Error Messages */}
        {(refinementNode?.data as RefinementNodeData).error && (
          <div className="p-2 bg-red-100 text-red-700 rounded mb-4">
            <p>Error refining idea: {(refinementNode?.data as RefinementNodeData).error}</p>
          </div>
        )}

        {/* Example: Display Loading State */}
        {(refinementNode?.data as RefinementNodeData).isLoading && (
          <div className="p-2 bg-yellow-100 text-yellow-700 rounded mb-4">
            <p>Refining idea...</p>
          </div>
        )}
      </div>
    </div>
  );
}
