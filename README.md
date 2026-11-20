# Drake Hub

A black and gold fan app for ranking every Drake song, grading every album and playing Drake games. It installs on iPhone from Safari and works offline.

## Install on iPhone

1. Open the app's GitHub Pages link in **Safari**.
2. Tap the **Share** button, then **Add to Home Screen**.
3. Open Drake Hub from your home screen. It runs full screen like any other app.

## What's inside

- **Rank**: Head to Head battles that finalize your full ranking of 368 songs, an album ranking built from your song positions, and a drag-to-edit full list.
- **Play**: Name That Tune (real 30-second previews cut to 7, 4, 2 or 1 seconds), Cover Zoom, Trivia, Higher or Lower on Spotify streams, Odd One Out, Timeline and a Daily Challenge with streaks.
- **Library**: every album and song with ratings, letter grades, previews, lanes, chart history and stream counts.
- **Me**: levels named after his albums, badges, stats, Spotify connection and backups.

## Moving your progress from the web hub

In the web hub, open **My Stats** and tap **Copy backup code**. In the app, paste it on the Home screen or under **Me → Backup**.

## Connecting Spotify

Spotify only allows personal projects through your own developer key:

1. Go to developer.spotify.com, open the Dashboard and create an app.
2. Add the app's address (shown in **Me → Spotify**) as a Redirect URI and tick **Web API**.
3. Paste the Client ID into **Me → Spotify** and tap Connect.

Spotify requires the developer app's owner to have Premium. Tokens stay on your phone.

## Data

Tracklists, cover art and audio previews come from Apple's iTunes catalogue and are streamed from Apple, not stored here. Spotify stream counts are from kworb.net. Chart history is from Billboard reporting. This is an unofficial fan project, not affiliated with Drake or OVO.

## Running it locally

It's a static site with no build step:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.
