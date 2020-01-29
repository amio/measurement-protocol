import uuid from 'uuid/v4'

type Boolean = '0' | '1'

type HitType =
  | 'pageview'
  | 'screenview'
  | 'transaction'
  | 'event'
  | 'item'
  | 'social'
  | 'exception'
  | 'timing'

interface MeasurementParams {
  /** Protocol Version */
  v?: '1';

  /** Tracking ID / Web Property ID */
  tid?: string;

  /** Client ID */
  cid?: string;

  /** User ID */
  uid?: string;

  /** Hit Type */
  t?: HitType;

  /** Cache Buster */
  z?: string;

  /** Document location URL */
  dl?: string;

  /** Document Host Name */
  dh?: string;

  /** Document Path */
  dp?: string;

  /** Document Title */
  dt?: string;

  /** Event Category */
  ec?: string;

  /** Event Action */
  ea?: string;

  /** Event Label */
  el?: string;

  /** Event Value */
  ev?: number;

  /** User timing category */
  utc?: string;

  /** User timing variable name */
  utv?: string;

  /** User timing time */
  utt?: number;

  /** User timing label */
  utl?: string;

  /** Exception Description */
  exd?: string;

  /** Is Exception Fatal? */
  exf?: Boolean;
}

export function measure (
  tid: MeasurementParams['tid'],
  params: Partial<MeasurementParams> = {},
): Measure {
  return new Measure({ tid, ...params })
}

class Measure {
  params: MeasurementParams;

  constructor (params: MeasurementParams = {}) {
    this.params = { v: '1', ...params }
  }

  set (this: Measure, params: MeasurementParams): Measure {
    return new Measure({ ...this.params, ...params })
  }

  setCustomDimension (values: string[]): Measure {
    const params = {}
    values.forEach((val, idx) => {
      params[`cd${idx}`] = val
    })
    return this.set(params)
  }

  setCustomMetrics (values: number[]): Measure {
    const params = {}
    values.forEach((val, idx) => {
      params[`cm${idx}`] = val
    })
    return this.set(params)
  }

  send (this: Measure): void { send(this) }

  toString (this: Measure): string { return buildPayload(this.params) }

  pageview (this: Measure, url: string | { host: string, path: string }): Measure {
    const params: MeasurementParams = { t: 'pageview' }
    if (typeof url === 'string') {
      params.dl = url
    } else {
      params.dh = url.host
      params.dp = url.path
    }
    return this.set(params)
  }

  event (this: Measure, category: string, action: string, label?: string, value?: number): Measure {
    return this.set({
      t: 'event',
      ec: category,
      ea: action,
      el: label,
      ev: value
    })
  }

  timing (this: Measure, category: string, name: string, value: number, label?: string): Measure {
    return this.set({
      t: 'timing',
      utc: category,
      utv: name,
      utt: value,
      utl: label
    })
  }

  exception (this: Measure, description: string, fatal: boolean = true): Measure {
    return this.set({
      t: 'exception',
      exd: description,
      exf: fatal ? '1' : '0'
    })
  }
}

function buildPayload (params: Partial<MeasurementParams>): string {
  const formated: Record<string, string> = {}
  Object.keys(params).forEach(key => {
    if (params[key] === undefined) return
    formated[key] = params[key]
  })

  // Create a random User ID if no cid & uid presented
  if (formated.uid === undefined && formated.cid === undefined) {
    formated.cid = uuid()
  }

  return new URLSearchParams(formated).toString()
}

export async function send (measurement: Measure): Promise<Response> {
  const body = buildPayload(measurement.params)
  return post('https://www.google-analytics.com/collect', body)
}

export async function batchSend (measurements: Measure[]): Promise<Response> {
  const body = measurements.map(m => buildPayload(m.params)).join('\n')
  return post('https://www.google-analytics.com/batch', body)
}

async function post (url: string, body: string): Promise<Response> {
  if (typeof fetch === 'function') {
    // post in browser
    return fetch(url, { method: 'POST', body })
  } else {
    // post in node
    return new Promise((resolve, reject) => {
      const https = require('https')
      const req = https.request(url, { method: 'POST' }, resolve)
      req.on('error', reject)
      req.write(body)
      req.end()
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
