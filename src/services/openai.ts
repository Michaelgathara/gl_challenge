import OpenAI from "openai";
import { OPENAI_MODEL } from "../config";
const openai = new OpenAI();

export interface RefineIdeaResponse {
  refinedIdea: string;
}

export const refineIdea = async (idea: string): Promise<RefineIdeaResponse> => {
  const prompt = `
    Please refine the following software idea, making it clearer and more detailed:

    "${idea}"

    Refined Idea:
  `;

  try {
    const response = await openai.chat.completions.create({
        model: OPENAI_MODEL,
        messages: [
            { role: "system", content: "You are an expert assistant specializing in idea refinement and enhancement. Your primary function is to analyze concepts, distill them to their essential elements, and reconstruct them to be more effective, sophisticated, and well-articulated. You ensure clarity, creativity, and precision in every iteration, helping users transform their ideas into polished and impactful outcomes." },
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    console.log("OpenAI Output: ", response)

    const refinedIdea: string = response.choices[0].message.content?.trim() || '';
    return { refinedIdea };
  } catch (error: any) {
    console.error("Error refining idea:", error);
    throw new Error(error.response?.data?.error?.message || "Failed to refine idea.");
  }
};
