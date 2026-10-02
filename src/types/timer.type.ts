/**
 * @description
 * Wait options
 */
export type TWaitOptions = {

  /**
   * @description
   * Signal used to abort the wait
   */
  signal?: AbortSignal;
};

/**
 * @description
 * Timeout options
 */
export type TTimeoutOptions = {

  /**
   * @description
   * Message of the TimeoutError
   */
  message?: string;
};
