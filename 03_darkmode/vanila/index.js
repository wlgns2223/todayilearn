const $check = document.getElementById("darkModeCheck");
const colorMode = "color-mode";
const light = "light";
const dark = "dark";

const isUserColorTheme = localStorage.getItem(colorMode);
const isOsColorTheme = window.matchMedia("(prefers-color-scheme: dark").matches
  ? dark
  : light;

const getUserColorMode = () =>
  isUserColorTheme ? isUserColorTheme : isOsColorTheme;

console.log(getUserColorMode());

window.addEventListener("load", () => {
  if (getUserColorMode() === dark) {
    localStorage.setItem(colorMode, dark);
    document.documentElement.setAttribute(colorMode, dark);
    $check.setAttribute("checked", true);
  } else {
    localStorage.setItem(colorMode, light);
    document.documentElement.setAttribute(colorMode, light);
  }
});

$check.addEventListener("click", (e) => {
  if (e.target.checked) {
    document.documentElement.setAttribute(colorMode, dark);
    localStorage.setItem(colorMode, dark);
  } else {
    document.documentElement.setAttribute(colorMode, light);
    localStorage.setItem(colorMode, light);
  }
});
