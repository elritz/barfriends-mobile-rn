export function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

export function toCamelCase(str) {
  return str
    .split(' ') // Split the string into an array of words
    .map((word, index) => {
      // Capitalize the first letter of each word except the first word
      if (index === 0) {
        return word.toLowerCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join(''); // Join the words back into a string
}