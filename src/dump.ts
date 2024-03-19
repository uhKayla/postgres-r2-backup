import { exec as _exec } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

import { tmpFolder } from "./helpers";

const exec = promisify(_exec);

export const dumpToFile = async (filename: string) => {
  const filePath = path.resolve(tmpFolder, filename);

  console.time(`--> Dumping ${filename}...`);

  const { stderr } = await exec(
    `PGPASSWORD=${process.env.POSTGRES_PASSWORD} pg_dump -h ${process.env.POSTGRES_HOST} -p ${process.env.POSTGRES_PORT} -U ${process.env.POSTGRES_USER} ${process.env.POSTGRES_DATABASE} | gzip > ${filePath}`
  );

  if (stderr) {
    console.error(`Error dumping ${filename}: ${stderr}`);
    process.exit(1);
  }

  console.timeEnd(`--> Dumping ${filename}...`);
};
