/**
 * This script appends missing declarations to Stencil's final index.d.ts.
 *
 * Why do we need this?
 * --------------------
 * Stencil’s automatic type generation can sometimes omit or tree-shake
 * symbols (like `kulManagerReady` and `kulManagerSingleton`) if it believes
 * they're “internal” or otherwise unused by the public component API. Even if
 * they're properly exported in your code, they might not appear in the
 * generated .d.ts.
 *
 * By running this script after the build, we forcibly add the missing
 * type definitions so consumers of our library can import them without
 * hitting TS errors or needing @ts-ignore hacks.
 *
 * It's not elegant, but it's a reliable fallback when other options
 * (like "declaration": true in tsconfig, re-exports in index.ts, or
 * direct usage in components) don't resolve the omission.
 */

const fs = require("fs");
const path = require("path");

const DECLARATION_FILE = path.join(
  __dirname,
  "..",
  "..",
  "dist",
  "components",
  "index.d.ts",
);

const FIX_DECLARATION = `

// 🚨 Hack: Manually appending these missing declarations.
export declare const kulManagerReady: Promise<import('../types/managers/kul-manager/kul-manager').KulManager>;
export declare const kulManagerSingleton: import('../types/managers/kul-manager/kul-manager').KulManager;
`;

function appendDeclarations() {
  let original;
  try {
    original = fs.readFileSync(DECLARATION_FILE, "utf8");
  } catch (err) {
    console.error("Could not read index.d.ts:", err);
    process.exit(1);
  }

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
