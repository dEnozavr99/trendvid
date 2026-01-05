import { emojiRe } from "./emoji.ts";

export type AssStyle = {
  playResX: number;
  playResY: number;
  fontText: string;
  fontEmoji: string;
  fontSize: number;
  marginV: number;
};

export function makeAss(
  text: string,
  durationSec: number,
  style?: Partial<AssStyle>
): string {
  const s: AssStyle = {
    playResX: 1080,
    playResY: 1920,
    fontText: "Arial",
    fontEmoji: "Noto Emoji",
    fontSize: 64,
    marginV: 200,
    ...style,
  };

  const safeText = assText(text, s.fontText, s.fontEmoji);

  return `
[Script Info]
Title: TrendVid Subtitles
ScriptType: v4.00+
PlayResX: ${s.playResX}
PlayResY: ${s.playResY}

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,${s.fontText},${
    s.fontSize
  },&H00FFFFFF,&H000000FF,&H00000000,&H64000000,1,0,0,0,100,100,0,0,1,4,0,2,80,80,${
    s.marginV
  },1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:00.00,${formatAssTime(durationSec)},Default,,0,0,0,,${safeText}
`.trim();
}

function formatAssTime(totalSeconds: number): string {
  const s = Math.max(0, totalSeconds);
  const hh = Math.floor(s / 3600);
  const mm = Math.floor((s % 3600) / 60);
  const ss = Math.floor(s % 60);
  const cs = Math.floor((s - Math.floor(s)) * 100); // centiseconds
  return `${hh}:${String(mm).padStart(2, "0")}:${String(ss).padStart(
    2,
    "0"
  )}.${String(cs).padStart(2, "0")}`;
}

function escapeAss(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/{/g, "\\{").replace(/}/g, "\\}");
}

function assText(input: string, fontText: string, fontEmoji: string): string {
  let out = "";
  let last = 0;

  for (const m of input.matchAll(emojiRe)) {
    const i = m.index ?? 0;
    const emoji = m[0];
    out += escapeAss(input.slice(last, i));
    out += `{\\fn${fontEmoji}}${emoji}{\\fn${fontText}}`;
    last = i + emoji.length;
  }

  out += escapeAss(input.slice(last));
  return out;
}
