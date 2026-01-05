import { ensureDir } from "@std/fs";
import { workPaths } from "../../shared/paths.ts";
import { synthesizeEdgeTts } from "../tts/edge_tts.ts";
import { getMediaDurationSeconds } from "../video/ffprobe.ts";
import { renderVideo } from "../video/ffmpeg.ts";
import { makeAss } from "../subtitles/ass.ts";

export type RenderInput = {
  text: string;
  bg: string;
  out: string;
  voice: string;
  rate: string;
  pitch: string;
  keepBgAudio: boolean;
};

export async function render(input: RenderInput) {
  const paths = workPaths("./.output");
  await ensureDir(paths.baseDir);

  // 1) TTS
  await synthesizeEdgeTts({
    text: input.text,
    outFile: paths.narration,
    inputFile: paths.ttsInput,
    options: { voice: input.voice, rate: input.rate, pitch: input.pitch },
  });

  // 2) Duration from narration
  const dur = await getMediaDurationSeconds(paths.narration);

  // 3) Subtitles aligned to narration duration
  await Deno.writeTextFile(paths.subtitles, makeAss(input.text, dur));

  // 4) Render final
  await renderVideo({
    bg: input.bg,
    subtitlesAss: paths.subtitles,
    narration: paths.narration,
    out: input.out,
    keepBgAudio: input.keepBgAudio,
    fontsDir: "assets/fonts",
  });
}
