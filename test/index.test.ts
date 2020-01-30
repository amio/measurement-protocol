import { measure } from '../src/index'

const trackId = 'UA-1234567-12'

test('Create a measurement instance', () => {
  const result = measure(trackId)

  expect(result.params).toEqual({
    v: '1',
    tid: trackId
  })
})

test('Set params on initialization', () => {
  const { params } = measure(trackId, { t: 'pageview' })

  expect(params).toEqual({
    v: '1',
    tid: trackId,
    t: 'pageview'
  })
})

test('Set params after initialization', () => {
  const { params } = measure(trackId).set({ t: 'pageview', dp: '/docs' })

  expect(params).toEqual({
    v: '1',
    tid: trackId,
    t: 'pageview',
    dp: '/docs'
  })
})

test('Override params', () => {
  const { params } = measure(trackId, { t: 'pageview' }).set({ t: 'event' })

  expect(params).toEqual({
    v: '1',
    tid: trackId,
    t: 'event'
  })
})

test('.toString()', () => {
  const payload = measure(trackId).pageview('/').toString()
  expect(payload.startsWith('v=1&tid=UA-1234567-12&t=pageview&dl=%2F&cid=')).toBe(true)
})

test('.setCustomDimensions()', () => {
  const { params } = measure(trackId).setCustomDimensions(['ei', 'yo'])

  expect(params).toEqual({
    v: '1',
    tid: trackId,
    cd1: 'ei',
    cd2: 'yo'
  })
})

test('.setCustomDimensions() throws on more than 200 args', () => {
  expect(() => {
    const dims = new Array(201)
    measure(trackId).setCustomDimensions(dims)
  }).toThrow()
})

test('.setCustomMetrics()', () => {
  const { params } = measure(trackId).setCustomMetrics([1, 2])

  expect(params).toEqual({
    v: '1',
    tid: trackId,
    cm1: 1,
    cm2: 2
  })
})

test('.setCustomMetrics() throws on more than 200 args', () => {
  expect(() => {
    const dims = new Array(201)
    measure(trackId).setCustomMetrics(dims)
  }).toThrow()
})

test('.pageview(url)', () => {
  const { params } = measure(trackId).pageview('/docs')

  expect(params).toEqual({
    v: '1',
    tid: trackId,
    t: 'pageview',
    dl: '/docs'
  })
})

test('.pageview({ host, path })', () => {
  const { params } = measure(trackId).pageview({ host: 'yo.com', path: '/docs' })

  expect(params).toEqual({
    v: '1',
    tid: trackId,
    t: 'pageview',
    dh: 'yo.com',
    dp: '/docs'
  })
})

test('.event()', () => {
  const { params } = measure(trackId).event('cat', 'action', 'label', 10)

  expect(params).toEqual({
    v: '1',
    tid: trackId,
    t: 'event',
    ec: 'cat',
    ea: 'action',
    el: 'label',
    ev: 10
  })
})

test('.timing()', () => {
  const { params } = measure(trackId).timing('cat', 'name', 10, 'label')

  expect(params).toEqual({
    v: '1',
    tid: trackId,
    t: 'timing',
    utc: 'cat',
    utv: 'name',
    utt: 10,
    utl: 'label'
  })
})

test('.exception()', () => {
  const { params } = measure(trackId).exception('desc', false)

  expect(params).toEqual({
    v: '1',
    tid: trackId,
    t: 'exception',
    exd: 'desc',
    exf: '0'
  })
})
