// -----------------------------------------------
// All the Global styles for the app here
// -----------------------------------------------

export const quackColors = {
  quackYellow: "#ff9800",
  quackGreen: "#4caf50",
  quackRed: "#f44336",
  quackBlue: "#2196f3",
  quackPurple: "#9c27b0",
  quackOrange: "#ff9800",
};

export const quackColorStates = {
  transparent: "transparent",
  activeColor: "#ff9800",
  inactiveColor: "#9e9e9e",
  successColor: "#4caf50",
  errorColor: "#f44336",
  warningColor: "#ffeb3b",
  infoColor: "#9e9e9e",
  linkColor: "#0070f3",
  disabledColor: "#9e9e9e",
  placeholderColor: "#9e9e9e",
  borderColor: "#9e9e9e",
  hoverColor: "#e0e0e0",
  activeBorderColor: "#ff9800",
};

export const quackFontSizes = {
  small: "12px",
  medium: "14px",
  large: "16px",
  xlarge: "18px",
  xxlarge: "20px",
  xxxlarge: "24px",
  xxxxlarge: "32px",
};

export const quackFontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  bold: 700,
};

export const quackFonts = {
  primary: "Roboto, sans-serif",
  secondary: "Arial, sans-serif",
};

export const quackLetterSpacings = {
  normal: "normal",
  wider: "wider",
  widest: "widest",
};

export const quackLineHeights = {
  normal: "normal",
  shorter: "shorter",
  short: "short",
  tall: "tall",
  taller: "taller",
  tallest: "tallest",
};

// Export as default to be used
const stylesGlobals = {
  quackColors,
  quackColorStates,
  quackFontSizes,
  quackFontWeights,
  quackFonts,
  quackLetterSpacings,
  quackLineHeights,
};

export default stylesGlobals;
