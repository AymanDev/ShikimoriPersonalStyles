const sass = require("sass");
const fs = require("fs");
const path = require("path");

const version = process.env.VERSION;
const packageVersion = process.env.PACKAGE_VERSION;

const srcFolder = path.join(__dirname, "src");
const buildFolder = path.join(__dirname, "build");

if (!fs.existsSync(buildFolder)) {
  fs.mkdirSync(buildFolder);
  console.log("Build folder created");
}

try {
  console.time("Reading SCSS");
  const scssFile = path.join(srcFolder, "index.scss");
  const data = fs.readFileSync(scssFile, "utf8");
  const outputFile = path.join(buildFolder, `index-${version}.css`);
  console.timeEnd("Reading SCSS");

  console.time("Render SCSS");
  const result = sass.renderSync({
    data: `$VERSION: "${packageVersion}";\n${data}`,
    includePaths: [srcFolder],
  });
  console.timeEnd("Render SCSS");

  console.time("Writing CSS");
  fs.writeFileSync(outputFile, result.css);
  console.timeEnd("Writing CSS");
} catch (err) {
  console.error(err);
  process.exit(1);
}
