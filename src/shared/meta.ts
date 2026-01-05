export type DenoConfig = { name: string; version: string };

export async function readProjectMeta(): Promise<{
  name: string;
  version: string;
}> {
  const text = await Deno.readTextFile("deno.json");
  const json = JSON.parse(text) as DenoConfig;

  return { name: json.name ?? "trendvid", version: json.version ?? "0.0.0" };
}
