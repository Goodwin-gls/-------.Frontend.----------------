/**
 * Возвращает функцию-обертку, предотвращающую многократное срабатывание функции обратного вызова,
 * пока не пройдет установленное время бездействия.
 *
 * @param {Function} cb - Функция обратного вызова.
 * @param {number} [timeout=16] - Время ожидания в миллисекундах до вызова функции.
 * @returns {Function} - Функция-обертка (ленивый слушатель события).
 * @example
 * const debounceScrollListener = debounce((event: Event) => {
 *   // Код, который выполнится, когда пользователь приостановит прокрутку
 * }, 100)
 * scrollElement.addEventListener('scroll', debounceScrollListener)
 */
export function debounce<T extends unknown[]>(
  cb: (...args: T) => void,
  timeout: number = 16,
): (...args: T) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (...args: T): void {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      cb(...args);
    }, timeout);
  };
}
