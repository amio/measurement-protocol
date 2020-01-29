// https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters

type Bool = '0' | '1'

type HitType =
  | 'pageview'
  | 'screenview'
  | 'transaction'
  | 'event'
  | 'item'
  | 'social'
  | 'exception'
  | 'timing'

export interface MeasurementParams {
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
  exf?: Bool;
}
