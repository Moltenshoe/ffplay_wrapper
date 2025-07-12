const { execFile } = require("child_process");
const path = require("path");
const fs = require("fs");
const os = require("os");

const args = process.argv.slice(2);

// Get the path to the original executable
const original = path.join(__dirname, "ffplay-original.exe");

// Prepare a writable temp file path
const tmpDir = os.tmpdir();
const tempPlayerPath = path.join(tmpDir, "ffplay-original.exe");

// Copy if not already there
if (!fs.existsSync(tempPlayerPath)) {
  fs.copyFileSync(original, tempPlayerPath);
}

// Add volume control
const cmdArgs = [
  "-nodisp",
  "-autoexit",
  "-af",
  "volume=0.3",
  ...args,
];

// Run the original player with reduced volume
execFile(tempPlayerPath, cmdArgs, (error) => {
  if (error) {
    console.error("Error running ffplay-original.exe:", error);
  }
});
