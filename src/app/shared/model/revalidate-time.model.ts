export enum RevalidateTime {
  /**
   * 永不快取，每次都 SSR
   */
  NONE = 0,
  /**
   * 快速變動頁面，例如首頁最新消息
   */
  FAST = 10,
  /**
   * 每分鐘
   */
  EVERY_MINUTE = 60,
  /**
   * 每 5 分鐘
   */
  EVERY_5_MINUTES = 300,
  /**
   * 每小時
   */
  EVERY_HOUR = 3600,
  /**
   * 每天
   */
  DAILY = 86400,
}
