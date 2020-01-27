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
  v: '1';

  /** Tracking ID / Web Property ID */
  tid: string;

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

  /** Exception Description */
  exd?: string;

  /** Is Exception Fatal? */
  exf?: Boolean;
}

type MeasurementConfig = Partial<MeasurementParams>

export function measure (
  tid: MeasurementParams['tid'],
  config: MeasurementConfig = {},
): Measure {
  return new Measure({ tid, ...config })
}

class Measure {
  config: MeasurementConfig;

  constructor (config: MeasurementConfig = {}) {
    this.config = { v: '1', ...config }
  }

  set (this: Measure, config: MeasurementConfig): Measure {
    return new Measure({ ...this.config, ...config })
  }

  setCustomDimension (values: string[]): Measure {
    const config = {}
    values.forEach((val, idx) => {
      config[`cd${idx}`] = val
    })
    return this.set(config)
  }

  setCustomMetrics (values: number[]): Measure {
    const config = {}
    values.forEach((val, idx) => {
      config[`cm${idx}`] = val
    })
    return this.set(config)
  }

  send (this: Measure): void { send(this) }

  toString (this: Measure): string { return buildPayload(this.config) }

  pageview (this: Measure, url: string | { dh: string, dp: string }): Measure {
    const config: MeasurementConfig = { t: 'pageview' }
    if (typeof url === 'string') {
      config.dl = url
    } else {
      config.dh = url.dh
      config.dp = url.dp
    }
    return this.set(config)
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

  exception (this: Measure, description: string, fatal: Boolean = '1'): Measure {
    return this.set({
      t: 'exception',
      exd: description,
      exf: fatal
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
  const body = buildPayload(measurement.config)
  return post('https://www.google-analytics.com/collect', body)
}

export async function batchSend (measurements: Measure[]): Promise<Response> {
  const body = measurements.map(m => buildPayload(m.config)).join('\n')
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
