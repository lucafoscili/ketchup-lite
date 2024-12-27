// scripts/append-declarations.js
const fs = require("fs");
const path = require("path");

// Adjust to wherever Stencil places the final index.d.ts
const DECLARATION_FILE = path.join(
  __dirname,
  "..",
  "..",
  "dist",
  "components",
  "index.d.ts",
);

// The text you want to append
// (You might need to tweak the relative import path to KulManager.)
const FIX_DECLARATION = `

// 🚨 Hack: Manually appending these missing declarations.
export declare const kulManagerReady: Promise<import('./managers/kul-manager/kul-manager').KulManager>;
export declare const kulManagerSingleton: import('./managers/kul-manager/kul-manager').KulManager;
`;

function appendDeclarations() {
  let original;
  try {
    original = fs.readFileSync(DECLARATION_FILE, "utf8");
  } catch (err) {
    console.error("Could not read index.d.ts:", err);
    process.exit(1);
  }

  // Append your missing type exports
  const updated = original + FIX_DECLARATION;

  try {
    fs.writeFileSync(DECLARATION_FILE, updated, "utf8");
    console.log(
      `Successfully appended missing declarations to ${DECLARATION_FILE}`,
    );
  } catch (err) {
    console.error("Could not write updated index.d.ts:", err);
    process.exit(1);
  }
}

appendDeclarations();
