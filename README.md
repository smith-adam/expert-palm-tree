# Web Word Builder

## Run the game locally
This project is a static web app—no build step or backend required.

1. Clone the repo and move into it.
   ```bash
   git clone <repo-url>
   cd expert-palm-tree
   ```
2. Start a simple local server (pick one):
   - Python 3: `python3 -m http.server 8080` (use `python3` because some systems don’t provide the `python` alias)
   - Node.js (npm):
     * **One-off:** `npx serve .`
     * **npm only:** `npm install -g serve` then `serve -l 8080 .` (no `npx` needed after the global install)
3. Open your browser to http://localhost:8080 (or the port you used).

> Tip: Using a local server avoids browser restrictions that sometimes block speech synthesis or audio when opening `index.html` directly from the file system.

## Play instructions
* Pick a hero (Spidey, Ghosty, Spin, or Hulk) and a difficulty level.
* Click **Hear Word** to listen via text-to-speech, then tap letters in order to spell the word.
* Correct taps add web strands; completing a word triggers a celebratory web blast.
