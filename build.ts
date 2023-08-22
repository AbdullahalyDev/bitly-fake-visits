import shell from "shelljs";

// build windows
shell.exec(
  "npx pkg ./dist/index.js --target node16-win-x64 --out-path ./build/win"
);

// // build linux
shell.exec(
  "npx pkg ./dist/index.js --target node16-linux-x64 --out-path ./build/linux"
);

// // build macos
shell.exec(
  "npx pkg ./dist/index.js --target node16-macos-x64 --out-path ./build/macos"
);
