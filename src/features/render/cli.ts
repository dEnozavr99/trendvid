import { Command } from "@cliffy/command";
import { type DenoConfig } from "../../shared/meta.ts";
import { render } from "./render.ts";

export function buildCli(meta: DenoConfig) {
  return new Command()
    .name(meta.name)
    .version(meta.version)
    .description(
      "Generate short videos with background gameplay, subtitles, and TTS voiceover"
    )
    .option("--text <text:string>", "Text to display and narrate", {
      required: true,
    })
    .option("--bg <file:string>", "Background video file (mp4)", {
      required: true,
    })
    .option("--out <file:string>", "Output video file", {
      default: "./out.mp4",
    })
    .option("--voice <voice:string>", "Edge TTS voice", {
      default: "uk-UA-PolinaNeural",
    })
    .option("--rate <rate:string>", "Speech rate", {
      default: "+0%",
    })
    .option("--pitch <pitch:string>", "Pitch", {
      default: "+0Hz",
    })
    .option(
      "--keep-bg-audio",
      "Mix background audio quietly instead of replacing it",
      {
        default: false,
      }
    )
    .action(
      async (args: {
        text: string;
        bg: string;
        out: string;
        voice: string;
        rate: string;
        pitch: string;
        keepBgAudio: boolean;
      }) => {
        await render({
          text: args.text,
          bg: args.bg,
          out: args.out,
          voice: args.voice,
          rate: args.rate,
          pitch: args.pitch,
          keepBgAudio: Boolean(args.keepBgAudio),
        });
      }
    );
}
