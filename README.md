# 4-Ch Knob Line Follower Documentation

Documentation sources are under `content/`. Available versions:

- `latest`: version selection instructions
- `gpio-version`: GPIO documentation
- `i2c-version`: I2C documentation

## Development

```bash
npm ci
npm run dev:latest
npm run dev:gpio-version
npm run dev:i2c-version
```

## Build and preview

```bash
npm run build:all
npm run docs:preview
```

Each version is staged under `projects/4-Ch-Knob-Line-Follower/en/<version>/`.
The VitePress preview directory contains the last version built; run
`npm run build:latest` to preview latest with the default base path.

Production routes:

```text
/projects/4-Ch-Knob-Line-Follower/en/latest/
/projects/4-Ch-Knob-Line-Follower/en/gpio-version/
/projects/4-Ch-Knob-Line-Follower/en/i2c-version/
```

Commit the generated `projects/` files when publishing the static site.
