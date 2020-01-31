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

  /** Screen Name */
  cd?: string;

  //  Application Tracking

  /** Application Name */
  an?: string;

  /** Application Version */
  av?: string;

  /** Application ID */
  aid?: string;

  /** Application Installer ID */
  aiid?: string;

  //  E-Commerce

  /** Transaction ID */
  ti?: string;

  /** Transaction Affiliation */
  ta?: string;

  /** Transaction Revenue */
  tr?: number;

  /** Transaction Shipping Cost */
  ts?: number;

  /** Transaction Tax */
  tt?: number;

  /** Item Name */
  in?: string;

  /** Item Price */
  ip?: number;

  /** Item Quantity */
  iq?: number;

  /** Item Code / SKU */
  ic?: string;

  /** Item Category */
  iv?: string;

  //  Enhanced E-Commerce

  //  Event Tracking

  /** Event Category */
  ec?: string;

  /** Event Action */
  ea?: string;

  /** Event Label */
  el?: string;

  /** Event Value */
  ev?: number;

  //  Social Interactions

  /** Social Network */
  sn?: string;

  /** Social Action */
  sa?: string;

  /** Social Action Target */
  st?: string;

  //  Timing

  /** User timing category */
  utc?: string;

  /** User timing variable name */
  utv?: string;

  /** User timing time */
  utt?: number;

  /** User timing label */
  utl?: string;

  //  Exceptions

  /** Exception Description */
  exd?: string;

  /** Is Exception Fatal? */
  exf?: Bool;
}

export interface MeasurementConfig {
  server?: string;
}
