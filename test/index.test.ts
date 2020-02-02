import { measure, batchSend } from '../src/index'
import { IncomingMessage } from 'http'

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

test('.screenview(screenName)', () => {
  const { params } = measure(trackId).screenview('High Scores')

  expect(params).toEqual({
    v: '1',
    tid: trackId,
    t: 'screenview',
    cd: 'High Scores'
  })
})

test('.transaction(id, affiliation, revenue, shipping, tax)', () => {
  const { params } = measure(trackId).transaction('0D564', 'Member', 15.47, 3.50, 11.20)

  expect(params).toEqual({
    v: '1',
    tid: trackId,
    t: 'transaction',
    ta: 'Member',
    ti: '0D564',
    tr: 15.47,
    ts: 3.5,
    tt: 11.2
  })
})

test('.item(id, name, price, quantity, code, category)', () => {
  const { params } = measure(trackId).item('0D564', 'Shoe', 3.50, 4, 'SKU47', 'Blue')

  expect(params).toEqual({
    v: '1',
    tid: trackId,
    t: 'item',
    ti: '0D564',
    in: 'Shoe',
    ip: 3.5,
    iq: 4,
    ic: 'SKU47',
    iv: 'Blue'
  })
})

test('.social(name, action, actionTarget)', () => {
  const { params } = measure(trackId).social('facebook', 'like', '/docs')

  expect(params).toEqual({
    v: '1',
    tid: trackId,
    t: 'social',
    sn: 'facebook',
    sa: 'like',
    st: '/docs'
  })
})

test('.event(category, action, label, value)', () => {
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

test('.timing(category, name, value, label)', () => {
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

test('.exception(description, fatal)', () => {
  const { params } = measure(trackId).exception('desc', false)

  expect(params).toEqual({
    v: '1',
    tid: trackId,
    t: 'exception',
    exd: 'desc',
    exf: '0'
  })
})

test('.send()', (done) => {
  measure(trackId, {}, { server: 'https://www.google-analytics.com/debug' }).pageview('/').send()
    .then(resp => {
      jsonParseResponse(resp as IncomingMessage).then(data => {
        expect(data.hitParsingResult.length).toBe(1)
        expect(data.hitParsingResult.every(h => h.valid)).toBe(true)
        done()
      })
    }, done)
})

async function jsonParseResponse (response: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      let body = ''
      response.on('data', trunk => body += trunk)
      response.on('error', reject)
      response.on('end', () => {
        resolve(JSON.parse(body))
      })
    } catch (error) {
      reject(error)
    }
  })
}
