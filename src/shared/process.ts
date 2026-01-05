export async function runCmd(
  cmd: string,
  args: string[],
  opts?: { cwd?: string }
): Promise<void> {
  const p = new Deno.Command(cmd, {
    args,
    cwd: opts?.cwd,
    stdout: "inherit",
    stderr: "inherit",
  });
  const { code } = await p.output();
  if (code !== 0) throw new Error(`${cmd} failed with code ${code}`);
}
