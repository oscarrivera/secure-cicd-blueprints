export function sum(a, b) {
  if (typeof a !== "number" || typeof b !== "number" || Number.isNaN(a) || Number.isNaN(b)) {
    throw new TypeError("sum expects two finite numbers");
  }
  return a + b;
}
