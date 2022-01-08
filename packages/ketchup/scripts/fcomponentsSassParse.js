const fs = require("fs");
const path = require("path");
const sass = require("sass");

console.log("Build FComponents SCSS");

const NODE_MODULES_PATH = path.join(__dirname, '../node_modules');

const FCOMPONENTS_FOLDER_PATH = "../src/f-components";
const rootDirPath = path.join(__dirname, FCOMPONENTS_FOLDER_PATH);

const GLOBAL_STYLE_FOLDER_PATH = "../src/style";
const globalStyleDirPath = path.join(__dirname, GLOBAL_STYLE_FOLDER_PATH);

console.log(`Reading FComponents folder: ${rootDirPath}...`);

const componentsFolders = fs.readdirSync(rootDirPath);

for (const componentName of componentsFolders) {
    const componentFolder = path.join(rootDirPath, componentName);
    if (fs.statSync(componentFolder).isDirectory()) {

        const componentScssFilePath = path.join(componentFolder, `${componentName}.scss`);
        console.log(`Found component folder ${componentFolder}.`);
        console.log(`Parsing its SCSS `, componentScssFilePath);

        if (fs.existsSync(componentScssFilePath)) {
            try {
                const parsedStyle = sass.compileString(`
                    @import 'global.scss';
                    @import '${componentName}.scss';
                `, {
                    loadPaths: [
                        globalStyleDirPath,
                        componentFolder,
                        NODE_MODULES_PATH,
                    ],
                    style: "compressed",
                });

                console.log("parsed", parsedStyle.css.substr(0,10));
            } catch(e) {
                console.error("Failed to parse file " + componentScssFilePath, e);
            }
        }
    }
}
