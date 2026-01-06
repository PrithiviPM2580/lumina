import type { Response } from "express";
import { PDFParse } from "pdf-parse";
import fs from "node:fs/promises";
import APIError from "@/lib/error.js";

export const sendResponse = <T>(
  res: Response,
  statatusCode: number = 200,
  message: string = "Success",
  data?: T
) => {
  res.status(statatusCode).json({
    success: true,
    statatusCode,
    message,
    data,
  });
};

export const extractTextFromPDF = async (
  filePath: string
): Promise<{ text: string; pages: number }> => {
  try {
    const dataBuffer = await fs.readFile(filePath);
    const parser = new PDFParse(new Uint8Array(dataBuffer));
    const data = await parser.getText();

    return {
      text: data.text,
      pages: data.total,
    };
  } catch (error) {
    throw new APIError(500, "Failed to extract text from PDF");
  }
};

export const chunkText = (
  text: string,
  chunkSize: number = 500,
  overlapSize: number = 50
): Array<{ content: string; chunkIndex: number; pageNumber: number }> => {
  if (!text || text.trim().length === 0) {
    return [];
  }

  const cleanedText = text
    .replace(/\r\n/g, "\n")
    .replace(/\s+/g, " ")
    .replace(/\n /g, "\n")
    .replace(/ \n/g, "\n")
    .trim();

  const paragraphs = cleanedText
    .split(/\n+/)
    .filter((p) => p.trim().length > 0);

  const chunks: [] = [];
  let currentChunk: [] = [];
  let currentWordCount = 0;
  let currentIndex = 0;

  for (const paragraph of paragraphs) {
    const paragraphWords = paragraph.trim().split(/\s+/);
    const paragraphWordCount = paragraphWords.length;

    if (paragraphWordCount > chunkSize) {
      if (currentChunk.length > 0) {
        chunks.push({
          content: currentChunk.join(" "),
          chunkIndex: currentIndex++,
          pageNumber: 0,
        });
        currentChunk = [];
        currentWordCount = 0;
      }
    }
  }
};
