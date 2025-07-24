/**
 * @description
 * Wait for a given number of milliseconds.
 *
 * @param ms - The number of milliseconds to wait.
 * @returns A promise that resolves when the time has passed.
 */
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
