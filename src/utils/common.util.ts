/**
 *
 * @param {unknown[]} values
 * @param {string[]} keys
 * @returns {object}
 */
export function arrayToObj(values: unknown[], keys: string[]): object {
    if (values.length !== keys.length) throw Error('Values and keys table must have same length');

    const obj: Record<string, unknown> = {};
    keys.map((key: string, index: number) => (obj[key] = values[index]));
    return obj;
}

/**
 *
 * @param {unknown[]} arrayToFilter
 * @param {(element: unknown) => boolean} checkingFunction
 * @returns {[unknown[], number[]]}
 */
export function filterWithIndex(
    arrayToFilter: unknown[],
    checkingFunction: (element: unknown) => boolean
): [unknown[], number[]] {
    const indexes: number[] = [];
    const filteredArray = arrayToFilter.filter((element: unknown, index: number) => {
        const checkingResult = checkingFunction(element);
        if (checkingResult) indexes.push(index);
        return checkingResult;
    });
    return [filteredArray, indexes];
}

/**
 *
 * @param {element | unknown} element
 * @returns {boolean}
 */
export function indexAtFound(element: number | unknown): boolean {
    return typeof element === 'number' && element > -1;
}
