# measurement-protocol

[![npm version][npm-src]][npm-href]
[![Bundle size][bundlephobia-src]][bundlephobia-href]
[![License][license-src]][license-href]

A minimal universal module for Google's [Universal Analytics][ua-href] tracking via the [Measurement Protocol][mp-href].

## Usage

```bash
npm install measurement-protocol
```

```typescript
const { measure } = require('measurement-protocol')

// Initialization expects at least your Google Analytics account ID:
measure('UA-XXXXX-XX').pageview('/').send()
```

[npm-src]: https://badgen.net/npm/v/measurement-protocol
[npm-href]: https://www.npmjs.com/package/measurement-protocol
[bundlephobia-src]: https://badgen.net/bundlephobia/minzip/measurement-protocol
[bundlephobia-href]: https://bundlephobia.com/result?p=measurement-protocol
[license-src]: https://badgen.net/badge/license/MIT
[license-href]: LICENSE.md

[ua-href]: https://support.google.com/analytics/answer/2790010
[mp-href]: https://developers.google.com/analytics/devguides/collection/protocol/v1/
