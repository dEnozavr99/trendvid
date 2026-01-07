# trendvid Project

## How to run

### Locally

`deno task dev --text "<your_text_goes_here>" --bg ./assets/video/subway.mp4 --out ./.output/out.mp4 --keep-bg-audio --voice uk-UA-OstapNeural`

#### List voices available

`edge-tts --list-voices | grep <locale>`

### Using docker

`docker run --rm -v "$PWD:/app" trendvid --text "<your_text_goes_here>" --bg /app/assets/video/subway.mp4 --out /app/.output/out.mp4`
