// https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
// https://gist.github.com/amio/5b51d2d5c2f36275a2ee2cf6f0d405db

export interface MeasurementConfig {
  server?: string;
}

type Bool = '0' | '1' | 0 | 1

type Number = number

type Integer = number

type Currency = number

type Text = string

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
  // ========== General ==========

  /**
   * Protocol Version
   *
   * The Protocol version. The current value is '1'. This will only change when there are changes made that are not backwards compatible.
   *
   * Example value: 1
   *
   * Example usage: v=1
   */
  v?: Text;

  /**
   * Measurement ID/ Web Property ID
   *
   * The measurement ID / web property ID. The format is UA-XXXX-Y. All collected data is associated by this ID.
   *
   * Example value: UA-XXXX-Y
   *
   * Example usage: tid=UA-XXXX-Y
   */
   tid?: Text;

  /**
   * Anonymize IP
   *
   * When present, the IP address of the sender will be anonymized. For example, the IP will be anonymized if any of the following parameters are present in the payload: &aip=, &aip=0, or &aip=1
   *
   * Example value: 1
   *
   * Example usage: aip=1
   */
   aip?: Bool;

  /**
   * Disabling Advertising Personalization
   *
   * Use this parameter to mark an event as disabled for advertising personalization, including for events from a property with a setting that otherwise permits ads personalization. For example, if a transaction is marked to disable advertising personalization, it won't be used when populating a remarketing audience for "past purchasers".
   *
   * Example value: 1
   *
   * Example usage: npa=1
   */
   npa?: Bool;

  /**
   * Data Source
   *
   * Indicates the data source of the hit. Hits sent from analytics.js will have data source set to 'web'; hits sent from one of the mobile SDKs will have data source set to 'app'.
   *
   * Example value: web
   *
   * Example usage: ds=web
   */
   ds?: Text;

  /**
   * Queue Time
   *
   * Used to collect offline / latent hits. The value represents the time delta (in milliseconds) between when the hit being reported occurred and the time the hit was sent. The value must be greater than or equal to 0. Values greater than four hours may lead to hits not being processed.
   *
   * Example value: 560
   *
   * Example usage: qt=560
   */
   qt?: Integer;

  /**
   * Cache Buster
   *
   * Used to send a random number in GET requests to ensure browsers and proxies don't cache hits. It should be sent as the final parameter of the request since we've seen some 3rd party internet filtering software add additional parameters to HTTP requests incorrectly. This value is not used in reporting.
   *
   * Example value: 289372387623
   *
   * Example usage: z=289372387623
   */
   z?: Text;


  // ========== User ==========

  /**
   * Client ID
   *
   * This field is required if User ID (uid) is not specified in the request. This anonymously identifies a particular user, device, or browser instance. For the web, this is generally stored as a first-party cookie with a two-year expiration. For mobile apps, this is randomly generated for each particular instance of an application install. The value of this field should be a random UUID (version 4) as described in http://www.ietf.org/rfc/rfc4122.txt.
   *
   * Example value: 35009a79-1a05-49d7-b876-2b884d0f825b
   *
   * Example usage: cid=35009a79-1a05-49d7-b876-2b884d0f825b
   */
   cid?: Text;

  /**
   * User ID
   *
   * This field is required if Client ID (cid) is not specified in the request. This is intended to be a known identifier for a user provided by the site owner/library user. It must not itself be PII (personally identifiable information). The value should never be persisted in Google Analytics cookies or other Analytics provided storage.
   *
   * Example value: as8eknlll
   *
   * Example usage: uid=as8eknlll
   */
   uid?: Text;


  // ========== Session ==========

  /**
   * Session Control
   *
   * Used to control the session duration. A value of 'start' forces a new session to start with this hit and 'end' forces the current session to end with this hit. All other values are ignored.
   *
   * Example value: start
   *
   * Example usage: sc=start
   */
   sc?: Text;

  /**
   * IP Override
   *
   * The IP address of the user. This should be a valid IP address in IPv4 or IPv6 format. It will always be anonymized just as though &aip (anonymize IP) had been used.
   *
   * Example value: 1.2.3.4
   *
   * Example usage: uip=1.2.3.4
   */
   uip?: Text;

  /**
   * User Agent Override
   *
   * The User Agent of the browser. Note that Google has libraries to identify real user agents. Hand crafting your own agent could break at any time.
   *
   * Example value: Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14
   *
   * Example usage: ua=Opera%2F9.80%20%28Windows%20NT%206.0%29%20Presto%2F2.12.388%20Version%2F12.14
   */
   ua?: Text;

  /**
   * Geographical Override
   *
   * The geographical location of the user. The geographical ID should be a two letter country code or a criteria ID representing a city or region (see http://developers.google.com/analytics/devguides/collection/protocol/v1/geoid). This parameter takes precedent over any location derived from IP address, including the IP Override parameter. An invalid code will result in geographical dimensions to be set to '(not set)'.
   *
   * Example value: US
   *
   * Example usage: geoid=US
   */
   geoid?: Text;


  // ========== Traffic Sources ==========

  /**
   * Document Referrer
   *
   * Specifies which referral source brought traffic to a website. This value is also used to compute the traffic source. The format of this value is a URL.
   *
   * Example value: http://example.com
   *
   * Example usage: dr=http%3A%2F%2Fexample.com
   */
   dr?: Text;

  /**
   * Campaign Name
   *
   * Specifies the campaign name.
   *
   * Example value: (direct)
   *
   * Example usage: cn=%28direct%29
   */
   cn?: Text;

  /**
   * Campaign Source
   *
   * Specifies the campaign source.
   *
   * Example value: (direct)
   *
   * Example usage: cs=%28direct%29
   */
   cs?: Text;

  /**
   * Campaign Medium
   *
   * Specifies the campaign medium.
   *
   * Example value: organic
   *
   * Example usage: cm=organic
   */
   cm?: Text;

  /**
   * Campaign Keyword
   *
   * Specifies the campaign keyword.
   *
   * Example value: Blue Shoes
   *
   * Example usage: ck=Blue%20Shoes
   */
   ck?: Text;

  /**
   * Campaign Content
   *
   * Specifies the campaign content.
   *
   * Example value: content
   *
   * Example usage: cc=content
   */
   cc?: Text;

  /**
   * Campaign ID
   *
   * Specifies the campaign ID.
   *
   * Example value: ID
   *
   * Example usage: ci=ID
   */
   ci?: Text;

  /**
   * Google Ads ID
   *
   * Specifies the Google Ad Id.
   *
   * Example value: CL6Q-OXyqKUCFcgK2goddQuoHg
   *
   * Example usage: gclid=CL6Q-OXyqKUCFcgK2goddQuoHg
   */
   gclid?: Text;

  /**
   * Google Display Ads ID
   *
   * Specifies the Google Display Ads Id.
   *
   * Example value: d_click_id
   *
   * Example usage: dclid=d_click_id
   */
   dclid?: Text;


  // ========== System Info ==========

  /**
   * Screen Resolution
   *
   * Specifies the screen resolution.
   *
   * Example value: 800x600
   *
   * Example usage: sr=800x600
   */
   sr?: Text;

  /**
   * Viewport size
   *
   * Specifies the viewable area of the browser / device.
   *
   * Example value: 123x456
   *
   * Example usage: vp=123x456
   */
   vp?: Text;

  /**
   * Document Encoding
   *
   * Specifies the character set used to encode the page / document.
   *
   * Example value: UTF-8
   *
   * Example usage: de=UTF-8
   */
   de?: Text;

  /**
   * Screen Colors
   *
   * Specifies the screen color depth.
   *
   * Example value: 24-bits
   *
   * Example usage: sd=24-bits
   */
   sd?: Text;

  /**
   * User Language
   *
   * Specifies the language.
   *
   * Example value: en-us
   *
   * Example usage: ul=en-us
   */
   ul?: Text;

  /**
   * Java Enabled
   *
   * Specifies whether Java was enabled.
   *
   * Example value: 1
   *
   * Example usage: je=1
   */
   je?: Bool;

  /**
   * Flash Version
   *
   * Specifies the flash version.
   *
   * Example value: 10 1 r103
   *
   * Example usage: fl=10%201%20r103
   */
   fl?: Text;


  // ========== Hit ==========

  /**
   * Hit type
   *
   * The type of hit. Must be one of 'pageview', 'screenview', 'event', 'transaction', 'item', 'social', 'exception', 'timing'.
   *
   * Example value: pageview
   *
   * Example usage: t=pageview
   */
   t?: HitType;

  /**
   * Non-Interaction Hit
   *
   * Specifies that a hit be considered non-interactive.
   *
   * Example value: 1
   *
   * Example usage: ni=1
   */
   ni?: Bool;


  // ========== Content Information ==========

  /**
   * Document location URL
   *
   * Use this parameter to send the full URL (document location) of the page on which content resides. You can use the &dh and &dp parameters to override the hostname and path + query portions of the document location, accordingly. The JavaScript clients determine this parameter using the concatenation of the document.location.origin + document.location.pathname + document.location.search browser parameters. Be sure to remove any user authentication or other private information from the URL if present. For 'pageview' hits, either &dl or both &dh and &dp have to be specified for the hit to be valid.
   *
   * Example value: http://foo.com/home?a=b
   *
   * Example usage: dl=http%3A%2F%2Ffoo.com%2Fhome%3Fa%3Db
   */
   dl?: Text;

  /**
   * Document Host Name
   *
   * Specifies the hostname from which content was hosted.
   *
   * Example value: foo.com
   *
   * Example usage: dh=foo.com
   */
   dh?: Text;

  /**
   * Document Path
   *
   * The path portion of the page URL. Should begin with '/'. For 'pageview' hits, either &dl or both &dh and &dp have to be specified for the hit to be valid.
   *
   * Example value: /foo
   *
   * Example usage: dp=%2Ffoo
   */
   dp?: Text;

  /**
   * Document Title
   *
   * The title of the page / document.
   *
   * Example value: Settings
   *
   * Example usage: dt=Settings
   */
   dt?: Text;

  /**
   * Screen Name
   *
   * This parameter is optional on web properties, and required on mobile properties for screenview hits, where it is used for the 'Screen Name' of the screenview hit. On web properties this will default to the unique URL of the page by either using the &dl parameter as-is or assembling it from &dh and &dp.
   *
   * Example value: High Scores
   *
   * Example usage: cd=High%20Scores
   */
   cd?: Text;

  /**
   * Content Group
   *
   * You can have up to 5 content groupings, each of which has an associated index between 1 and 5, inclusive. Each content grouping can have up to 100 content groups. The value of a content group is hierarchical text delimited by '/". All leading and trailing slashes will be removed and any repeated slashes will be reduced to a single slash. For example, '/a//b/' will be converted to 'a/b'.
   *
   * Example value: news/sports
   *
   * Example usage: cg1=news%2Fsports
   */
   cg1?: Text;

  /**
   * Link ID
   *
   * The ID of a clicked DOM element, used to disambiguate multiple links to the same URL in In-Page Analytics reports when Enhanced Link Attribution is enabled for the property.
   *
   * Example value: nav_bar
   *
   * Example usage: linkid=nav_bar
   */
   linkid?: Text;


  // ========== Apps ==========

  /**
   * Application Name
   *
   * Specifies the application name. This field is required for any hit that has app related data (i.e., app version, app ID, or app installer ID). For hits sent to web properties, this field is optional.
   *
   * Example value: My App
   *
   * Example usage: an=My%20App
   */
   an?: Text;

  /**
   * Application ID
   *
   * Application identifier.
   *
   * Example value: com.company.app
   *
   * Example usage: aid=com.company.app
   */
   aid?: Text;

  /**
   * Application Version
   *
   * Specifies the application version.
   *
   * Example value: 1.2
   *
   * Example usage: av=1.2
   */
   av?: Text;

  /**
   * Application Installer ID
   *
   * Application installer identifier.
   *
   * Example value: com.platform.vending
   *
   * Example usage: aiid=com.platform.vending
   */
   aiid?: Text;


  // ========== Events ==========

  /**
   * Event Category
   *
   * Specifies the event category. Must not be empty.
   *
   * Example value: Category
   *
   * Example usage: ec=Category
   */
   ec?: Text;

  /**
   * Event Action
   *
   * Specifies the event action. Must not be empty.
   *
   * Example value: Action
   *
   * Example usage: ea=Action
   */
   ea?: Text;

  /**
   * Event Label
   *
   * Specifies the event label.
   *
   * Example value: Label
   *
   * Example usage: el=Label
   */
   el?: Text;

  /**
   * Event Value
   *
   * Specifies the event value. Values must be non-negative.
   *
   * Example value: 55
   *
   * Example usage: ev=55
   */
   ev?: Integer;


  // ========== E-Commerce ==========

  /**
   * Transaction ID
   *
   * A unique identifier for the transaction. This value should be the same for both the Transaction hit and Items hits associated to the particular transaction.
   *
   * Example value: OD564
   *
   * Example usage: ti=OD564
   */
   ti?: Text;

  /**
   * Transaction Affiliation
   *
   * Specifies the affiliation or store name.
   *
   * Example value: Member
   *
   * Example usage: ta=Member
   */
   ta?: Text;

  /**
   * Transaction Revenue
   *
   * Specifies the total revenue associated with the transaction. This value should include any shipping or tax costs.
   *
   * Example value: 15.47
   *
   * Example usage: tr=15.47
   */
   tr?: Currency;

  /**
   * Transaction Shipping
   *
   * Specifies the total shipping cost of the transaction.
   *
   * Example value: 3.50
   *
   * Example usage: ts=3.50
   */
   ts?: Currency;

  /**
   * Transaction Tax
   *
   * Specifies the total tax of the transaction.
   *
   * Example value: 11.20
   *
   * Example usage: tt=11.20
   */
   tt?: Currency;

  /**
   * Item Name
   *
   * Specifies the item name.
   *
   * Example value: Shoe
   *
   * Example usage: in=Shoe
   */
   in?: Text;

  /**
   * Item Price
   *
   * Specifies the price for a single item / unit.
   *
   * Example value: 3.50
   *
   * Example usage: ip=3.50
   */
   ip?: Currency;

  /**
   * Item Quantity
   *
   * Specifies the number of items purchased.
   *
   * Example value: 4
   *
   * Example usage: iq=4
   */
   iq?: Integer;

  /**
   * Item Code
   *
   * Specifies the SKU or item code.
   *
   * Example value: SKU47
   *
   * Example usage: ic=SKU47
   */
   ic?: Text;

  /**
   * Item Category
   *
   * Specifies the category that the item belongs to.
   *
   * Example value: Blue
   *
   * Example usage: iv=Blue
   */
   iv?: Text;


  // ========== Enhanced E-Commerce ==========

  /**
   * Product SKU
   *
   * The SKU of the product. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: P12345
   *
   * Example usage: pr1id=P12345
   */
   pr1id?: Text;

  /**
   * Product Name
   *
   * The name of the product. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: Android T-Shirt
   *
   * Example usage: pr1nm=Android%20T-Shirt
   */
   pr1nm?: Text;

  /**
   * Product Brand
   *
   * The brand associated with the product. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: Google
   *
   * Example usage: pr1br=Google
   */
   pr1br?: Text;

  /**
   * Product Category
   *
   * The category to which the product belongs. Product index must be a positive integer between 1 and 200, inclusive. The product category parameter can be hierarchical. Use / as a delimiter to specify up to 5-levels of hierarchy. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: Apparel
   *
   * Example usage: pr1ca=Apparel
   */
   pr1ca?: Text;

  /**
   * Product Variant
   *
   * The variant of the product. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: Black
   *
   * Example usage: pr1va=Black
   */
   pr1va?: Text;

  /**
   * Product Price
   *
   * The unit price of a product. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: 29.20
   *
   * Example usage: pr1pr=29.20
   */
   pr1pr?: Currency;

  /**
   * Product Quantity
   *
   * The quantity of a product. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: 2
   *
   * Example usage: pr1qt=2
   */
   pr1qt?: Integer;

  /**
   * Product Coupon Code
   *
   * The coupon code associated with a product. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: SUMMER_SALE13
   *
   * Example usage: pr1cc=SUMMER_SALE13
   */
   pr1cc?: Text;

  /**
   * Product Position
   *
   * The product's position in a list or collection. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: 2
   *
   * Example usage: pr1ps=2
   */
   pr1ps?: Integer;

  /**
   * Product Custom Dimension
   *
   * A product-level custom dimension where dimension index is a positive integer between 1 and 200, inclusive. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: Member
   *
   * Example usage: pr1cd2=Member
   */
   pr1cd1?: Text;

  /**
   * Product Custom Metric
   *
   * A product-level custom metric where metric index is a positive integer between 1 and 200, inclusive. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: 28
   *
   * Example usage: pr1cm2=28
   */
   pr1cm1?: Integer;

  /**
   * Product Action
   *
   * The role of the products included in a hit. If a product action is not specified, all product definitions included with the hit will be ignored. Must be one of: detail, click, add, remove, checkout, checkout_option, purchase, refund. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: detail
   *
   * Example usage: pa=detail
   */
   pa?: Text;

  /**
   * Coupon Code
   *
   * The transaction coupon redeemed with the transaction. This is an additional parameter that can be sent when Product Action is set to 'purchase' or 'refund'. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: SUMMER08
   *
   * Example usage: tcc=SUMMER08
   */
   tcc?: Text;

  /**
   * Product Action List
   *
   * The list or collection from which a product action occurred. This is an additional parameter that can be sent when Product Action is set to 'detail' or 'click'. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: Search Results
   *
   * Example usage: pal=Search%20Results
   */
   pal?: Text;

  /**
   * Checkout Step
   *
   * The step number in a checkout funnel. This is an additional parameter that can be sent when Product Action is set to 'checkout'. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: 2
   *
   * Example usage: cos=2
   */
   cos?: Integer;

  /**
   * Checkout Step Option
   *
   * Additional information about a checkout step. This is an additional parameter that can be sent when Product Action is set to 'checkout'. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: Visa
   *
   * Example usage: col=Visa
   */
   col?: Text;

  /**
   * Product Impression List Name
   *
   * The list or collection to which a product belongs. Impression List index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: Search Results
   *
   * Example usage: il1nm=Search%20Results
   */
   il1nm?: Text;

  /**
   * Product Impression SKU
   *
   * The product ID or SKU. Impression List index must be a positive integer between 1 and 200, inclusive. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: P67890
   *
   * Example usage: il1pi2id=P67890
   */
   il1pi1id?: Text;

  /**
   * Product Impression Name
   *
   * The name of the product. Impression List index must be a positive integer between 1 and 200, inclusive. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: Android T-Shirt
   *
   * Example usage: il1pi2nm=Android%20T-Shirt
   */
   il1pi1nm?: Text;

  /**
   * Product Impression Brand
   *
   * The brand associated with the product. Impression List index must be a positive integer between 1 and 200, inclusive. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: Google
   *
   * Example usage: il1pi2br=Google
   */
   il1pi1br?: Text;

  /**
   * Product Impression Category
   *
   * The category to which the product belongs. Impression List index must be a positive integer between 1 and 200, inclusive. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: Apparel
   *
   * Example usage: il1pi2ca=Apparel
   */
   il1pi1ca?: Text;

  /**
   * Product Impression Variant
   *
   * The variant of the product. Impression List index must be a positive integer between 1 and 200, inclusive. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: Black
   *
   * Example usage: il1pi2va=Black
   */
   il1pi1va?: Text;

  /**
   * Product Impression Position
   *
   * The product's position in a list or collection. Impression List index must be a positive integer between 1 and 200, inclusive. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: 2
   *
   * Example usage: il1pi2ps=2
   */
   il1pi1ps?: Integer;

  /**
   * Product Impression Price
   *
   * The price of a product. Impression List index must be a positive integer between 1 and 200, inclusive. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: 29.20
   *
   * Example usage: il1pi2pr=29.20
   */
   il1pi1pr?: Currency;

  /**
   * Product Impression Custom Dimension
   *
   * A product-level custom dimension where dimension index is a positive integer between 1 and 200, inclusive. Impression List index must be a positive integer between 1 and 200, inclusive. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: Member
   *
   * Example usage: il1pi2cd3=Member
   */
   il1pi1cd1?: Text;

  /**
   * Product Impression Custom Metric
   *
   * A product-level custom metric where metric index is a positive integer between 1 and 200, inclusive. Impression List index must be a positive integer between 1 and 200, inclusive. Product index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: 28
   *
   * Example usage: il1pi2cm3=28
   */
   il1pi1cm1?: Integer;

  /**
   * Promotion ID
   *
   * The promotion ID. Promotion index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: SHIP
   *
   * Example usage: promo1id=SHIP
   */
   promo1id?: Text;

  /**
   * Promotion Name
   *
   * The name of the promotion. Promotion index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: Free Shipping
   *
   * Example usage: promo1nm=Free%20Shipping
   */
   promo1nm?: Text;

  /**
   * Promotion Creative
   *
   * The creative associated with the promotion. Promotion index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: Shipping Banner
   *
   * Example usage: promo1cr=Shipping%20Banner
   */
   promo1cr?: Text;

  /**
   * Promotion Position
   *
   * The position of the creative. Promotion index must be a positive integer between 1 and 200, inclusive. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: banner_slot_1
   *
   * Example usage: promo1ps=banner_slot_1
   */
   promo1ps?: Text;

  /**
   * Promotion Action
   *
   * Specifies the role of the promotions included in a hit. If a promotion action is not specified, the default promotion action, 'view', is assumed. To measure a user click on a promotion set this to 'promo_click'. For analytics.js the Enhanced Ecommerce plugin must be installed before using this field.
   *
   * Example value: click
   *
   * Example usage: promoa=click
   */
   promoa?: Text;

  /**
   * Currency Code
   *
   * When present indicates the local currency for all transaction currency values. Value should be a valid ISO 4217 currency code.
   *
   * Example value: EUR
   *
   * Example usage: cu=EUR
   */
   cu?: Text;


  // ========== Social Interactions ==========

  /**
   * Social Network
   *
   * Specifies the social network, for example Facebook or Google Plus.
   *
   * Example value: facebook
   *
   * Example usage: sn=facebook
   */
   sn?: Text;

  /**
   * Social Action
   *
   * Specifies the social interaction action. For example on Google Plus when a user clicks the +1 button, the social action is 'plus'.
   *
   * Example value: like
   *
   * Example usage: sa=like
   */
   sa?: Text;

  /**
   * Social Action Target
   *
   * Specifies the target of a social interaction. This value is typically a URL but can be any text.
   *
   * Example value: http://foo.com
   *
   * Example usage: st=http%3A%2F%2Ffoo.com
   */
   st?: Text;


  // ========== Timing ==========

  /**
   * User timing category
   *
   * Specifies the user timing category.
   *
   * Example value: category
   *
   * Example usage: utc=category
   */
   utc?: Text;

  /**
   * User timing variable name
   *
   * Specifies the user timing variable.
   *
   * Example value: lookup
   *
   * Example usage: utv=lookup
   */
   utv?: Text;

  /**
   * User timing time
   *
   * Specifies the user timing value. The value is in milliseconds.
   *
   * Example value: 123
   *
   * Example usage: utt=123
   */
   utt?: Integer;

  /**
   * User timing label
   *
   * Specifies the user timing label.
   *
   * Example value: label
   *
   * Example usage: utl=label
   */
   utl?: Text;

  /**
   * Page Load Time
   *
   * Specifies the time it took for a page to load. The value is in milliseconds.
   *
   * Example value: 3554
   *
   * Example usage: plt=3554
   */
   plt?: Integer;

  /**
   * DNS Time
   *
   * Specifies the time it took to do a DNS lookup.The value is in milliseconds.
   *
   * Example value: 43
   *
   * Example usage: dns=43
   */
   dns?: Integer;

  /**
   * Page Download Time
   *
   * Specifies the time it took for the page to be downloaded. The value is in milliseconds.
   *
   * Example value: 500
   *
   * Example usage: pdt=500
   */
   pdt?: Integer;

  /**
   * Redirect Response Time
   *
   * Specifies the time it took for any redirects to happen. The value is in milliseconds.
   *
   * Example value: 500
   *
   * Example usage: rrt=500
   */
   rrt?: Integer;

  /**
   * TCP Connect Time
   *
   * Specifies the time it took for a TCP connection to be made. The value is in milliseconds.
   *
   * Example value: 500
   *
   * Example usage: tcp=500
   */
   tcp?: Integer;

  /**
   * Server Response Time
   *
   * Specifies the time it took for the server to respond after the connect time. The value is in milliseconds.
   *
   * Example value: 500
   *
   * Example usage: srt=500
   */
   srt?: Integer;

  /**
   * DOM Interactive Time
   *
   * Specifies the time it took for Document.readyState to be 'interactive'. The value is in milliseconds.
   *
   * Example value: 500
   *
   * Example usage: dit=500
   */
   dit?: Integer;

  /**
   * Content Load Time
   *
   * Specifies the time it took for the DOMContentLoaded Event to fire. The value is in milliseconds.
   *
   * Example value: 500
   *
   * Example usage: clt=500
   */
   clt?: Integer;


  // ========== Exceptions ==========

  /**
   * Exception Description
   *
   * Specifies the description of an exception.
   *
   * Example value: DatabaseError
   *
   * Example usage: exd=DatabaseError
   */
   exd?: Text;

  /**
   * Is Exception Fatal?
   *
   * Specifies whether the exception was fatal.
   *
   * Example value: 0
   *
   * Example usage: exf=0
   */
   exf?: Bool;


  // ========== Custom Dimensions / Metrics ==========

  /**
   * Custom Dimension
   *
   * Each custom dimension has an associated index. There is a maximum of 20 custom dimensions (200 for Analytics 360 accounts). The dimension index must be a positive integer between 1 and 200, inclusive.
   *
   * Example value: Sports
   *
   * Example usage: cd1=Sports
   */
   cd1?: Text;

  /**
   * Custom Metric
   *
   * Each custom metric has an associated index. There is a maximum of 20 custom metrics (200 for Analytics 360 accounts). The metric index must be a positive integer between 1 and 200, inclusive.
   *
   * Example value: 47
   *
   * Example usage: cm1=47
   */
   cm1?: Number;
}
