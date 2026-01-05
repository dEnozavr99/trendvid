import { buildCli } from "./features/render/cli.ts";
import { readProjectMeta } from "./shared/meta.ts";

const meta = await readProjectMeta();

const cli = buildCli({
  name: meta.name,
  version: meta.version,
});

cli.parse(Deno.args);
