/**
 * @description
 * Retry options
 */
export type TRetryOptions = {

  /**
   * @description
   * Number of retries after the first attempt
   *
   * @default 3
   */
  retries?: number;

  /**
   * @description
   * Delay in milliseconds before each retry, or a function that computes it
   *
   * @default 0
   */
  delay?: number | ((attempt: number, error: unknown) => number);

  /**
   * @description
   * Signal used to abort retrying
   */
  signal?: AbortSignal;

  /**
   * @description
   * Decide whether an error should be retried
   */
  shouldRetry?: (error: unknown, attempt: number) => boolean;
};
