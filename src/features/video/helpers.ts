export async function runCmdCapture(
  cmd: string,
  args: string[]
): Promise<string> {
  const p = new Deno.Command(cmd, { args, stdout: "piped", stderr: "inherit" });
  const { code, stdout } = await p.output();
  if (code !== 0) throw new Error(`${cmd} failed with code ${code}`);
  return new TextDecoder().decode(stdout);
}
