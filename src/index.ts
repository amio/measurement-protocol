import uuid from 'uuid/v4'

import { MeasurementParams, MeasurementConfig } from './types'

export function measure (
  tid: MeasurementParams['tid'],
  params: MeasurementParams = {},
  config: MeasurementConfig = {},
): Measure {
  return new Measure({ tid, ...params }, config)
}

class Measure {
  params: MeasurementParams;
  config: MeasurementConfig = {
    server: 'https://www.google-analytics.com'
  };

  constructor (params: MeasurementParams = {}, config: MeasurementConfig = {}) {
    this.params = { v: '1', ...params }
    this.config = { ...this.config, ...config }
  }

  set (this: Measure, params: MeasurementParams, config: MeasurementConfig = {}): Measure {
    return new Measure(
      { ...this.params, ...params },
      { ...this.config, ...config }
    )
  }

  setCustomDimensions (values: string[]): Measure {
    if (values.length > 200) {
      throw new Error('There is a maximum of 200 custom dimensions for Analytics 360 accounts (20 for standard accounts)')
    }

    const params = {}
    values.forEach((val, idx) => {
      params[`cd${++idx}`] = val
    })
    return this.set(params)
  }

  setCustomMetrics (values: number[]): Measure {
    if (values.length > 200) {
      throw new Error('There is a maximum of 200 custom metrics for Analytics 360 accounts (20 for standard accounts)')
    }

    const params = {}
    values.forEach((val, idx) => {
      params[`cm${++idx}`] = val
    })
    return this.set(params)
  }

  send (this: Measure): Promise<Response | IncomingMessage> { return send(this) }

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

  if (formated.cid === undefined) {
    formated.cid = uuid()
  }

  return new URLSearchParams(formated).toString()
}

export async function send (measurement: Measure): Promise<Response | IncomingMessage> {
  const body = buildPayload(measurement.params)
  return post(`${measurement.config.server}/collect`, body)
}

export async function batchSend (measurements: Measure[]): Promise<Response | IncomingMessage> {
  if (measurements.length = 0) {
    throw new Error('Expect one measurement at minimum')
  }

  const server = measurements[0].config.server

  if (!measurements.every(m => m.config.server === server)) {
    throw new Error('Expect all measurements have same `server` config')
  }

  const body = measurements.map(m => buildPayload(m.params)).join('\n')
  return post(`${server}/batch`, body)
}

import { IncomingMessage } from 'http'

async function post (url: string, body: string): Promise<Response | IncomingMessage> {
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
