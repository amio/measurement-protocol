# measurement-protocol

[![npm version][npm-src]][npm-href]
[![Bundle size][bundlephobia-src]][bundlephobia-href]

A minimal module for Google's [Universal Analytics][ua-href] tracking via the [Measurement Protocol][mp-href], in human friendly manner.

Works in node.js and browser.

## Usage

```bash
npm install measurement-protocol
```

```typescript
const { measure } = require('measurement-protocol')

// Initialize with Google Analytics Tracking ID / Web Property ID:
measure('UA-XXXXX-XX').pageview('/docs').send()
```

### Core Functions

To send measurement data to Google Analytics, all you need is:

```js
measure(trackId)  // create a measurement instance
  .set(params)    // setup parameters
  .send()         // send it
```

- `trackId` Google Analytics Tracking ID / Web Property ID (`'UA-XXXXX-XX'`)
- `params` Parameters for Measurement Protocol (`{ t: 'pageview', dh: 'example.com', dp: '/docs' }`)

For all available parameters, checkout [Measurement Protocol Parameter Reference](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters)

### Helpers

Built on top of that, there's human-friendly helpers for common usage:

```js
measure(trackId).pageview(...params).send()
measure(trackId).screenview(...params).send()   // not implemented yet
measure(trackId).transaction(...params).send()  // not implemented yet
measure(trackId).social(...params).send()       // not implemented yet
measure(trackId).item(...params).send()         // not implemented yet
measure(trackId).event(...params).send()
measure(trackId).timing(...params).send()
measure(trackId).exception(...params).send()
```

```js
// a human fiendly manner
measure(trackId).pageview({ host: 'example.com', path: '/docs' }).send()
// equals to
measure(trackId).set({ t: 'pageview', dh: 'example.com', dp: '/docs' }).send()
```

## API

> All measurement methods are chainable (returns a new Measurement instance), except `.send()`.

### `measure(trackId: string, params?: Record<string, string>)`

Create a measurement instance.

```js
// Create a measurement (tracker)
const tracker = measure('UA-XXXXX-XX')
```
```js
// Create a measurement with params
const tracker = measure('UA-XXXXX-XX', { uid: 'XXXX.XXXX' })
```

#### `measurement.set(params: Record<string, string>)`

Set measurement parameter, returns a new measurement instance.

```js
const tracker = measure('UA-XXXXX-XX')

const trackPageview = tracker.set({ t: 'pageview' })
const trackEvent = tracker.set({ t: 'event' })
```

#### `measurement.send() => Promise<Response>`

Send measurement data to Google Analytics via Measurement Protocol.

#### `measurement.pageview(url: string | { host: string, path: string })`

Page view measurement allows you to measure the number of views you had for a particular page on your website. Pages often correspond to an entire HTML document, but they can also represent dynamically loaded content; this is known as "virtual pageviews".

```js
measure('UA-XXXXX-XX').pageview('https://example.com/about').send()
```
```js
measure('UA-XXXXX-XX').pageview({ host: 'example.com', path: '/about' }).send()
```

#### `measurement.event(category: string, action: string, label?: string, value?: number)`

Events are user interactions with content that can be measured independently from a web page or a screen load. Downloads, mobile ad clicks, gadgets, Flash elements, AJAX embedded elements, and video plays are all examples of actions you might want to measure as Events.

```js
measure('UA-XXXXX-XX').event('error', '404').send()
```
```js
measure('UA-XXXXX-XX').event('error', '404', '/not-found').send()
```

#### `measurement.timing(category: string, name: string, value: number, label?: string)`

User timings allow developers to measure periods of time. This is particularly useful for developers to measure the latency, or time spent, making AJAX requests and loading web resources.

```js
measure('UA-XXXXX-XX').timing('deps', 'load', 3200).send()
```
```js
measure('UA-XXXXX-XX').timing('deps', 'load', 3200, 'css').send()
```

#### `measurement.exception(description: string, fatal?: boolean = true)`

Exception tracking allows you to measure the number and type of crashes or errors that occur on your property.

```js
measure('UA-XXXXX-XX').exception(error.message).send()
```
```js
measure('UA-XXXXX-XX').exception(error.message, false).send()
```

### `batchSend(measurements: Measurement[]) => void`

Send multiple hits in a single request.

> Batch requests have the following additional limitations:
>
> - A maximum of 20 hits can be specified per request.
> - The total size of all hit payloads cannot be greater than 16K bytes.
> - No single hit payload can be greater than 8K bytes.

```js
const { measure, batchSend } = require('measurement-protocol')

batchSend([
  measure('UA-XXXXX-XX').pageview('/docs'),
  measure('UA-XXXXX-XX').event('load', '/index.js')
])
```

## License

[![License][license-src]][license-href]


[npm-src]: https://badgen.net/npm/v/measurement-protocol
[npm-href]: https://www.npmjs.com/package/measurement-protocol
[bundlephobia-src]: https://badgen.net/bundlephobia/minzip/measurement-protocol
[bundlephobia-href]: https://bundlephobia.com/result?p=measurement-protocol
[license-src]: https://badgen.net/badge/license/MIT
[license-href]: LICENSE.md

[ua-href]: https://support.google.com/analytics/answer/2790010
[mp-href]: https://developers.google.com/analytics/devguides/collection/protocol/v1/
