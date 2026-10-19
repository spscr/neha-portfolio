# Neha Perla — Portfolio Website (template)

A simple, elegant one-page portfolio. Plain HTML/CSS/JavaScript. No build step, no installs.

## See it
Double-click `index.html` to open it in a browser. Or, from this folder, run
`python3 -m http.server` and visit http://localhost:8000.

## Change text or images: edit ONE file
Open **`js/content.js`** in any text editor (TextEdit in plain-text mode, Notepad, or VS Code).
Everything on the site lives there: name, tagline, artwork titles and captions, the arangetram story and details, the bio, interests, and email.

- **Change text:** edit what's inside the quotes `"..."`. Keep the quotes and commas.
- **Swap an image (easiest):** replace a file in `/images` with your picture under the **same name**
  (for example, save your painting as `images/art-01.jpg`). Refresh the page.
- **Add an artwork:** copy one `{ src: ..., title: ..., medium: ..., year: ..., alt: ... }` block in
  `artworks`, paste it below, and point `src` at your new image. Separate blocks with commas.
- **Alt text:** `alt` is a short description of the image for screen readers. Please fill it in.
- **YouTube video:** the featured video is set by `youtubeId` (now `7hakMtLNrSs`, "Neha Arangetram Glimpses").
  For `https://www.youtube.com/watch?v=abc123XYZ`, the ID is `abc123XYZ`. Leave it `""` to hide it.

### Image files
| File | Used for |
|---|---|
| `hero.jpg` | Large image at the top (shown 5:4; currently Two Skylines) |
| `art-01.jpg` … `art-05.jpg` | Portfolio gallery (any shape works; the ivory mat and gold rule come from CSS) |
| `arangetram/neha-####-1000.jpg` | Arangetram photos as shown on the page (1000px long side) |
| `arangetram/neha-####-2000.jpg` | Same photos, full size, shown when you click to enlarge |
| `media/glimpses-poster.jpg` | Still shown on the YouTube video until someone presses play (YouTube's own thumbnail, saved locally) |
| `media/stage-varnam-excerpt.mp4` | Stage clip: Varnam, Maathe Malayadhwaja (35s, 1080p) |
| `media/stage-redlight-excerpt.mp4` | Stage clip: on stage with the orchestra (34s, 1080p) |
| `portrait.jpg` | About section (cropped to 4:5; smiling close-up from the arangetram photoshoot, #4851) |

**Arangetram photos** are the 12 photoshoot pictures listed in `content.js` (`arangetram.photos`), shown in that order.
`rowPattern: [2, 3, 2, 3, 2]` sets how many go in each row on computers (the first row is the big feature row).
Phones show the first photo alone, then wide photos one per row and tall photos two per row. Photos are never cropped.
Each entry has `src` (the 1000px file), `full` (the 2000px file for the enlarged view), and `w`/`h` (the full-size pixel size).
To swap a photo: make a 1000px and a 2000px JPG, drop them in `images/arangetram/`, and update `src`, `full`, `w`, `h` and `alt`.
Add `caption: "..."` to show a line under a photo (the guru photo has one). Photos load only as you scroll to them.

**Program (margam):** edit `arangetram.margam`. Each piece has `title`, `raga`, `tala` (and optional `kind`, like "Varnam").
The `{ intermission: true }` line splits it into two columns.

**Videos:** the YouTube "Glimpses" video is the featured video. To protect privacy and keep the page fast, it shows only a still
(`videoPoster`) until someone presses play, then loads the player from youtube-nocookie.com. `videoCaption` is the line under it.
Below it, the two stage clips in `/media` (`arangetram.videos`; each has a `label` and a `-poster.jpg` still) play on the page.
Nothing autoplays, only a small preview loads until someone presses play, and starting one video pauses the others.
Keep self-hosted clips short (under about 10 MB each); longer performances belong on YouTube.

Tip: resize photos to about 1000px (page) / 2000px (enlarged) on the long side and save them as JPG so the site stays fast.

## Change colors or fonts
At the top of `css/styles.css`, the `:root` block holds every color (`--maroon`, `--gold`, `--ivory`…) and both fonts.

## Files
```
index.html        page structure (rarely needs editing)
js/content.js     ← ALL text and image paths
js/main.js        builds the page, gallery viewer, gentle scroll fades
css/styles.css    design
images/           pictures
media/            video clips and their poster stills
screenshots/      preview images of the design (not part of the published site)
```

## Notes
- Fonts (Cormorant Garamond + Manrope) load from Google Fonts. Offline, it falls back to Georgia and the system font.
- Animations are subtle and switch off automatically when the device's "reduce motion" setting is on.
- To publish for free: drag this folder onto https://app.netlify.com/drop, or use GitHub Pages.
