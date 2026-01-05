import { ensureDir } from "@std/fs";
import { dirname } from "@std/path";
import { runCmd } from "../../shared/process.ts";

export async function renderVideo(opts: {
  bg: string;
  subtitlesAss: string;
  narration: string;
  out: string;
  fontsDir?: string;
  keepBgAudio?: boolean;
}) {
  await ensureDir(dirname(opts.out));

  const fontsDir = opts.fontsDir ?? "assets/fonts";
  const subtitleFilter = `subtitles=${opts.subtitlesAss}:fontsdir=${fontsDir}`;

  const args: string[] = ["-y", "-i", opts.bg, "-i", opts.narration];

  if (!opts.keepBgAudio) {
    args.push(
      "-vf",
      subtitleFilter,
      "-map",
      "0:v:0",
      "-map",
      "1:a:0",
      "-shortest",
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "-c:a",
      "aac",
      "-b:a",
      "192k",
      opts.out
    );
  } else {
    args.push(
      "-vf",
      subtitleFilter,
      "-filter_complex",
      "[0:a]volume=0.15[a0];[1:a]volume=1.0[a1];[a0][a1]amix=inputs=2:duration=shortest[aout]",
      "-map",
      "0:v:0",
      "-map",
      "[aout]",
      "-shortest",
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "-c:a",
      "aac",
      "-b:a",
      "192k",
      opts.out
    );
  }

  await runCmd("ffmpeg", args);
}
