export function capitalizeFirstLetter(string: string | null | undefined) {
  if (!string) {
    return "";
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function toCamelCase(str: string) {
  return str
    .split(" ") // Split the string into an array of words
    .map((word: string, index: number) => {
      // Capitalize the first letter of each word except the first word
      if (index === 0) {
        return word.toLowerCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join(""); // Join the words back into a string
}
