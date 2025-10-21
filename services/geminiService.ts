
import { GoogleGenAI, Modality } from "@google/genai";
import type { ImageFile } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const PROMPT = `Using the two provided photos, create a new photorealistic image. In this new image, the adult from the second photo should be hugging the child from the first photo. They should be positioned in a way that looks natural and emotionally warm. The lighting should be soft and natural, as if in a studio. The background must be a completely smooth, plain white, with no other elements.`;

export async function generateReunifyImage(
  childImage: ImageFile,
  adultImage: ImageFile
): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: childImage.base64,
              mimeType: childImage.mimeType,
            },
          },
          {
            inlineData: {
              data: adultImage.base64,
              mimeType: adultImage.mimeType,
            },
          },
          {
            text: PROMPT,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const firstPart = response.candidates?.[0]?.content?.parts?.[0];

    if (firstPart && firstPart.inlineData) {
      const base64ImageBytes: string = firstPart.inlineData.data;
      return `data:${firstPart.inlineData.mimeType};base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image data found in the API response.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the image.");
  }
}
