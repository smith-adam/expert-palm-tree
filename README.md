# Web Word Builder

## Run the game locally
This project is a static web app—no build step or backend required.

1. Clone the repo and move into it.
   ```bash
   git clone <repo-url>
   cd expert-palm-tree
   ```
2. Start a simple local server (pick one):
   - Python 3: `python -m http.server 8080`
   - Node.js: `npx serve .` (if you have `serve` installed globally, just run `serve .`)
3. Open your browser to http://localhost:8080 (or the port you used).

> Tip: Using a local server avoids browser restrictions that sometimes block speech synthesis or audio when opening `index.html` directly from the file system.

## Play instructions
* Pick a hero (Spidey, Ghosty, Spin, or Hulk) and a difficulty level.
* Click **Hear Word** to listen via text-to-speech, then tap letters in order to spell the word.
* Correct taps add web strands; completing a word triggers a celebratory web blast.
