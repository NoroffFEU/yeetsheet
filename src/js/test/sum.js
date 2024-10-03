// export function sum(a, b) {
//   return a + b;
// }

export function sum(a, b) {
  const numA = Number(a);
  const numB = Number(b);

  // Check for NaN in case of invalid inputs
  if (isNaN(numA) || isNaN(numB)) {
    return NaN; // Return NaN if any input is not a number
  }

  return numA + numB;
}
