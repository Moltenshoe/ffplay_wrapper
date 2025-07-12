# ffplay_wrapper

A lightweight wrapper for `ffplay` using Node.js that allows you to play audio files with custom volume (and effects if desired).  
Ideal for use in tools, scripts, or **VSCode extensions** where you want `ffplay.exe` to support volume control.

---

## Features

- Play audio with custom volume (default: 30%)
- Compiled into a standalone `ffplay.exe` using `pkg`
- Pass-through for all original ffplay arguments
- Plug-and-play replacement for the original `ffplay.exe`

---

## File Structure

```
ffplay_wrapper/
├── ffplay.js              # The Node.js wrapper logic
├── ffplay-original.exe    # The real ffplay binary (downloaded from ffmpeg)
├── ffplay.exe             # Final compiled wrapper (runs ffplay-original)
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Moltenshoe/ffplay_wrapper.git
cd ffplay_wrapper
```

### 2. Install `pkg` globally

```bash
npm install -g pkg
```

### 3. Build the wrapper EXE

```bash
pkg . --targets node18-win-x64 --output ffplay.exe
```

Make sure `ffplay-original.exe` is in the **same folder** as `ffplay.js`.

---

## Usage

Play any sound file with volume control:

```bash
ffplay.exe "C:\path\to\your\sound.wav"
```

It will internally run:

```bash
ffplay-original.exe -nodisp -autoexit -af volume=0.3 "your_file.wav"
```

You can modify the volume or effects inside `ffplay.js`.

---

## How It Works

- Node.js wraps the real `ffplay-original.exe`
- The script adds audio filters like `volume=0.3`
- It works around `pkg`'s virtual FS by copying `ffplay-original.exe` to a temp directory and executing it from there

---

## Customization

Want louder or quieter audio?

Open `ffplay.js` and change:

```js
"-af", "volume=0.3"
```

You can also add FFmpeg audio filters like:

```js
"-af", "volume=0.3,aecho=0.8:0.9:1000:0.3"
```

---

## Example Use Case

If your extension or script plays sounds using `ffplay.exe`, just replace the default binary with this custom wrapper to get **volume control** and more.

---

## License

MIT — feel free to fork, use, or modify!  
Credits to FFmpeg team for the original `ffplay`.

---

## Inspired By

This was built to support a [Minecraft sound extension](https://github.com/Moltenshoe/minecraft_sounds_vscode) for VSCode

## Author

Kottapalli Trishanth – B.Tech Student at IIIT Naya Raipur