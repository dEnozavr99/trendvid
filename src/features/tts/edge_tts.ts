import { ensureDir } from "@std/fs";
import { dirname } from "@std/path";
import { runCmd } from "../../shared/process.ts";

export type TtsOptions = {
  voice: string;
  rate: string;
  pitch: string;
};

export async function synthesizeEdgeTts(params: {
  text: string;
  outFile: string;
  inputFile: string;
  options: TtsOptions;
}): Promise<void> {
  await ensureDir(dirname(params.outFile));
  await Deno.writeTextFile(params.inputFile, params.text);

  await runCmd("edge-tts", [
    "--voice",
    params.options.voice,
    "--rate",
    params.options.rate,
    "--pitch",
    params.options.pitch,
    "--file",
    params.inputFile,
    "--write-media",
    params.outFile,
  ]);
}
