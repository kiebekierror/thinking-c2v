export function lerp(a, b, t) {
    return a * (1 - t) + b * t;
}

export function vLerp(a, b, t) {
    const res = {};
    for (let attr in a) {
        res[attr] = lerp(a[attr], b[attr], t);
    }
    return res;
}
