import fs from "node:fs";
import path from "node:path";

import yaml from "js-yaml";
import { getRequestConfig } from "next-intl/server";

export const locale = "en";

export default getRequestConfig(async () => {
  const file = fs.readFileSync(
    path.join(process.cwd(), "messages", `${locale}.yml`),
    "utf8",
  );

  return {
    locale,
    messages: yaml.load(file) as Record<string, unknown>,
  };
});
