export function arrayToObj(values: Array<unknown>, keys: string[]) {
    if (values.length !== keys.length) throw Error('Values and keys table must have same length');

    const obj: Record<string, unknown> = {};
    keys.map((key: string, index: number) => (obj[key] = values[index]));
    return obj;
}
