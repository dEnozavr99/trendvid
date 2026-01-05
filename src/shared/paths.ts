import { join } from "@std/path";

export const OUTPUT_DIR = "./.output";

export const SUBTITLES_FILE_NAME = "captions.ass";
export const NARRATION_FILE_NAME = "narration.mp3";
export const TTS_INPUT_FILE_NAME = "tts_input.txt";

export function workPaths(baseDir = OUTPUT_DIR) {
  return {
    baseDir,
    subtitles: join(baseDir, SUBTITLES_FILE_NAME),
    narration: join(baseDir, NARRATION_FILE_NAME),
    ttsInput: join(baseDir, TTS_INPUT_FILE_NAME),
  };
}
