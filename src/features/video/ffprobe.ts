// Дуже простий варіант: парсимо stdout ffprobe (json) для duration
import { runCmdCapture } from "./helpers.ts";

export async function getMediaDurationSeconds(file: string): Promise<number> {
  const out = await runCmdCapture("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "default=nw=1:nk=1",
    file,
  ]);

  const n = Number(out.trim());
  if (!Number.isFinite(n))
    throw new Error(`Could not parse duration from ffprobe output: "${out}"`);
  return n;
}
