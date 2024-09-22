import { useState, useEffect } from 'react';
import Color from 'color';

/**
 * Custom hook to determine whether text should be 'light' or 'dark'
 * based on the background color.
 * @param {string} backgroundColor - The background color (in any CSS-compatible format).
 * @returns {string} - Returns 'light' if the text should be light, otherwise 'dark'.
 */
const useTextContrast = (color: string) => {
  const [textColor, setTextColor] = useState('dark'); // Default to 'dark'

  useEffect(() => {
    try {
      const colorObj = Color(color);
      const luminance = colorObj.luminosity();

      // Set text color based on luminance
      setTextColor(luminance > 0.5 ? 'dark' : 'light');
    } catch (e) {
      console.error('Invalid color format:', color);
      setTextColor('dark'); // Default to 'dark' if color format is invalid
    }
  }, [color]); // Recalculate if the backgroundColor changes

  return textColor;
};

export default useTextContrast;