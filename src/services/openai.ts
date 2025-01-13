import OpenAI from "openai";
import { OPENAI_API_KEY, OPENAI_MODEL } from "../config";

// DO NOT RUN THIS IN PROD BTW JUST CAUSE YOU CAN EASILY EXPOSE YOUR API KEY HERE
const openai = new OpenAI({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });

export interface RefineIdeaResponse {
  refinedIdea: string;
}

export interface ArchitectureResponse {
  arch: string;
}

const REFINE_IDEA_SYSTEM_PROMPT = `
  You are an expert assistant specializing in idea refinement and enhancement. 
  Your primary function is to analyze concepts, distill them to their essential elements, 
  and reconstruct them to be more effective, sophisticated, and well-articulated. 
  You ensure clarity, creativity, and precision in every iteration, 
  helping users transform their ideas into polished and impactful outcomes.
`;

const PROPOSE_ARCH_SYSTEM_PROMPT = `
  You are a highly skilled expert assistant specializing in transforming software ideas 
  into comprehensive system designs and robust architectures. Your expertise encompasses 
  analyzing project requirements, identifying optimal technologies and frameworks, 
  applying best practices in software engineering, and ensuring scalability, security, 
  and efficiency in every solution you develop. You excel at creating detailed architectural 
  diagrams, providing insightful recommendations, and offering actionable plans that align 
  with both technical and business objectives. Your goal is to deliver innovative and 
  tailored system designs that drive successful software development projects.
`;

const createCompletion = async (
  systemPrompt: string,
  userPrompt: string
): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    return response.choices[0].message.content?.trim() || "";
  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    throw new Error(error.response?.data?.error?.message || "API request failed.");
  }
};

export const refineIdea = async (idea: string): Promise<RefineIdeaResponse> => {
  const userPrompt = `
    Please refine the following software idea, making it clearer and more detailed:

    "${idea}"

    Refined Idea:
  `;

  const refinedIdea = await createCompletion(REFINE_IDEA_SYSTEM_PROMPT, userPrompt);
  return { refinedIdea };
};

export const proposeArch = async (refinedIdea: string): Promise<ArchitectureResponse> => {
  const userPrompt = `
    Please propose an architecture for the following software idea, making it easier to start on coding and system design and more detailed:

    "${refinedIdea}"

    Proposed Architecture:
  `;

  const arch = await createCompletion(PROPOSE_ARCH_SYSTEM_PROMPT, userPrompt);
  return { arch };
};
