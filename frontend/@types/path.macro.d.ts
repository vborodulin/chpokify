declare module 'paths.macro' {
  const base: string;
  const npmRoot: string;
  const gitRoot: string;
  const wd: string;
  const fileAbsolute: string;
  const file: string;
  const extension: string;
  const filename: string;
  const baseAbsolute: string;

  export {
    base,
    npmRoot,
    gitRoot,
    wd,
    fileAbsolute,
    file,
    extension,
    filename,
    baseAbsolute,
  };

  export = base;
}
