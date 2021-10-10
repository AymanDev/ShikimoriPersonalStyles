"use strict";
const sass = require("sass");
const fs = require("fs");
const path = require("path");

const version = process.env.VERSION;
const packageVersion = process.env.PACKAGE_VERSION;

const srcFolder = path.join(__dirname, "src");
const buildFolder = path.join(__dirname, "build");

try {
  const scssFile = path.join(srcFolder, "index.scss");
  const data = fs.readFileSync(scssFile, "utf8");
  const outputFile = path.join(buildFolder, `index-${version}.css`);

  const result = sass.renderSync({
    data: `$VERSION: "${packageVersion}";\n${data}`,
    includePaths: [srcFolder],
  });

  console.time("SASS Compile");
  fs.writeFileSync(outputFile, result.css);
  console.timeEnd("SASS Compile");
} catch (err) {
  console.error(err);
  process.exit(1);
}
