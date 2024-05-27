const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
console.log(alphabet);

export default function numberToLetter(number) {
  if (number < 26) {
    return alphabet[number];
  } else {
    // Add logic here if we need to convert numbers greater than 26 to letters (since all letters will have been used, can add solution were a second letter is added forexample if this is needed).
  }
}
