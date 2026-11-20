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

## Sharing it with friends

Anyone can use it. Send them the GitHub Pages link. There's no sign-up and no server: each person's rankings, scores and settings live on their own phone.

Built-in ways to play together:

- **Share my top 10**: a black and gold image card for stories or group chats.
- **Compare with a friend**: a link with your top 25 inside it. Your friend opens it and sees your taste match.
- **Challenge a friend**: after any game, send a link. Your friend gets the exact same questions or clips and sees your score to beat.
- **Daily Challenge**: the same five questions for everyone each day, with a shareable result grid.

## Moving your progress from the web hub

In the web hub, open **My Stats** and tap **Copy backup code**. In the app, paste it on the Home screen or under **Me → Backup**.

## Connecting Spotify

Everything except the Spotify features works for everyone with no setup.

**For the person hosting the app (one time):**

1. Go to developer.spotify.com, open the Dashboard and create an app.
2. Add the app's GitHub Pages address as a Redirect URI, for example `https://naplcitta.github.io/drake-hub/`, and tick **Web API**.
3. Put the Client ID in `js/config.js` as `spotifyClientId` and push. A Client ID isn't a secret.
4. Under **User Management** in the dashboard, add the Spotify email of each friend who wants Spotify features.

Spotify's rules for personal developer apps: the owner needs Premium, and each Client ID can approve up to 5 listeners. Anyone beyond that can tap "Use your own Spotify developer key" in **Me → Spotify** and follow the same steps with their own account. Sign-in tokens stay on each person's phone.

## Data

Tracklists, cover art and audio previews come from Apple's iTunes catalogue and are streamed from Apple, not stored here. Spotify stream counts are from kworb.net. Chart history is from Billboard reporting. This is an unofficial fan project, not affiliated with Drake or OVO.

## Running it locally

It's a static site with no build step:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.
