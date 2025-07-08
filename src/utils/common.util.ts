export function arrayToObj(values: Array<unknown>, keys: string[]) {
    if (values.length !== keys.length) throw Error('Values and keys table must have same length');

    const obj: Record<string, unknown> = {};
    keys.map((key: string, index: number) => (obj[key] = values[index]));
    return obj;
}

export function filterWithIndex(
    arrayToFilter: unknown[],
    checkingFunction: (element: unknown) => boolean
): [Array<unknown>, number[]] {
    const indexes: number[] = [];
    const filteredArray = arrayToFilter.filter((element: unknown, index: number) => {
        const checkingResult = checkingFunction(element);
        if (checkingResult) indexes.push(index);
        return checkingResult;
    });
    return [filteredArray, indexes];
}
