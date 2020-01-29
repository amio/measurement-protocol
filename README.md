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
measure('UA-XXXXX-XX')
  .pageview('https://example.com/docs')
  .send()
```

### Core

To send measurement to Google Analytics, all you need is:

```js
measure(trackId)  // create a measurement instance
  .set(params)    // setup parameters
  .send()         // send it
```

For all available parameters, checkout [Measurement Protocol Parameter Reference](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters)

### Helpers

Built on top of that, there's some human-friendly helpers:

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
// this human fiendly manner
measure(trackId).pageview({ host: 'example.com', path: '/docs' }).send()
// is equal to
measure(trackId).set({ t: 'pageview', dh: 'example.com', dp: '/docs' }).send()
```

## API

All methods return a new Measurement instance, they are chainable. Except `send()` and `batchSend()`.

#### `measure(trackId: string, params?: Record<string, string>)`

Create a measurement instance.

```js
// Create a measurement (tracker)
const tracker = measure('UA-XXXXX-XX')

// Create a measurement with params
const tracker = measure('UA-XXXXX-XX', { uid: 'XXXX.XXXX' })
```

##### `measurement.set(Record<string, string>)`

Set measurement parameter, returns a new measurement instance.

```js
const tracker = measure('UA-XXXXX-XX')

const trackPageview = tracker.set({ t: 'pageview' })
const trackEvent = tracker.set({ t: 'event' })
```

#### `measurement.send() => Promise<Response>`

Send measurement to Google Analytics (`https://www.google-analytics.com/collect`)

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
