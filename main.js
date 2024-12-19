/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc3R5bGVzLmNzcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZXMuY3NzPzE1NTMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/styles.css\n");

/***/ }),

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getData: () => (/* binding */ getData)\n/* harmony export */ });\n/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icons */ \"./src/icons.js\");\n\n\nfunction getDayName(dateString) {\n  const date = new Date(dateString);\n  const days = [\n    \"Sunday\",\n    \"Monday\",\n    \"Tuesday\",\n    \"Wednesday\",\n    \"Thursday\",\n    \"Friday\",\n    \"Saturday\",\n  ];\n  return days[date.getDay()];\n}\n\nasync function getData() {\n  const search = document.querySelector(\"#searchfield\");\n  const displayText = document.querySelector(\"p\");\n  const toggleBtn = document.querySelector(\"#toggleBtn\");\n  const temp = document.getElementById(\"temp\");\n  const tempMainContainer = document.querySelector(\".temp-main-container\");\n  const tempForecastContainer = document.querySelector(\n    \".temp-forecast-container\"\n  );\n  const forecastContainer = document.getElementById(\"forecast\");\n  const nav = document.querySelector(\"nav\");\n\n  let currentTempCelsius = null;\n  let currentTempFahrenheit = null;\n  let isFahrenheit = true;\n\n  toggleBtn.addEventListener(\"click\", () => {\n    nav.classList.add(\"moved-up\");\n  });\n\n  toggleBtn.addEventListener(\"click\", async () => {\n    const location = search.value.trim();\n\n    if (!location) {\n      displayText.textContent = \"Please enter a location.\";\n      return;\n    } else {\n      displayText.textContent = \"\";\n    }\n    try {\n      const weatherForecast = await fetch(\n        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=KLVCV47X6979SENLNZCDUFAGA`,\n        { mode: \"cors\" }\n      );\n      if (!weatherForecast.ok) {\n        throw new Error(\"Weather data not found. Check the location.\");\n      }\n      const weatherData = await weatherForecast.json();\n      tempMainContainer.style.display = \"grid\";\n      tempForecastContainer.style.display = \"grid\";\n      const currentConditions = weatherData.currentConditions;\n\n      currentTempFahrenheit = weatherData.days[0].temp;\n      currentTempCelsius = ((currentTempFahrenheit - 32) * 5) / 9;\n\n      document.getElementById(\"location\").textContent =\n        weatherData.resolvedAddress;\n      document.getElementById(\"conditions\").textContent =\n        weatherData.currentConditions.conditions;\n      document.getElementById(\"description\").textContent =\n        weatherData.description;\n\n      const currentIcon =\n        _icons__WEBPACK_IMPORTED_MODULE_0__.weatherIcon[currentConditions.icon] || \"./icons/default.png\";\n\n      document.getElementById(\n        \"weather-icon-main\"\n      ).innerHTML = `<img src=\"${currentIcon}\" alt=\"${currentConditions.icon}\" class=\"weather-icon-main\"/>`;\n\n      temp.innerHTML = `\n        <span>${\n          isFahrenheit\n            ? currentTempFahrenheit.toFixed(1) + \"°F\"\n            : currentTempCelsius.toFixed(1) + \"°C\"\n        }</span>\n      `;\n\n      toggleBtn.textContent = isFahrenheit ? \"°C\" : \"°F\";\n\n      forecastContainer.innerHTML = \"\";\n\n      weatherData.days.slice(0, 9).forEach((day) => {\n        const dayName = getDayName(day.datetime);\n        const condition = day.icon;\n        const iconPath = _icons__WEBPACK_IMPORTED_MODULE_0__.weatherIcon[condition] || \"./icons/default.png\";\n\n        const forecastItem = document.createElement(\"div\");\n        forecastItem.classList.add(\"forecast-item\");\n        forecastItem.innerHTML = `\n          <img src=\"${iconPath}\" alt=\"${condition}\" class=\"weather-icon\" />\n\n          <p class=\"forecast-temp\"> ${\n            isFahrenheit\n              ? day.temp + \"°F\"\n              : (((day.temp - 32) * 5) / 9).toFixed(1) + \"°C\"\n          }</p>\n          <h4>${dayName}</h4>\n          <h5>(${day.datetime})</h5>\n          <p class=\"forecast-conditions\">Conditions: ${condition.replace(\n            /-/g,\n            \" \"\n          )}</p>\n        `;\n        forecastContainer.appendChild(forecastItem);\n      });\n\n      isFahrenheit = !isFahrenheit;\n    } catch (error) {\n      console.error(error);\n      displayText.textContent =\n        \"Error fetching weather data. Please try again.\";\n    }\n  });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZGF0YS5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFzQzs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRkFBK0YsU0FBUztBQUN4RyxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsK0NBQVc7O0FBRW5CO0FBQ0E7QUFDQSxpQ0FBaUMsWUFBWSxTQUFTLHVCQUF1Qjs7QUFFN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsK0NBQVc7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixTQUFTLFNBQVMsVUFBVTs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsZ0JBQWdCLFFBQVE7QUFDeEIsaUJBQWlCLGFBQWE7QUFDOUIsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0giLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9kYXRhLmpzP2Y2MDEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgd2VhdGhlckljb24gfSBmcm9tIFwiLi9pY29uc1wiO1xuXG5mdW5jdGlvbiBnZXREYXlOYW1lKGRhdGVTdHJpbmcpIHtcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRhdGVTdHJpbmcpO1xuICBjb25zdCBkYXlzID0gW1xuICAgIFwiU3VuZGF5XCIsXG4gICAgXCJNb25kYXlcIixcbiAgICBcIlR1ZXNkYXlcIixcbiAgICBcIldlZG5lc2RheVwiLFxuICAgIFwiVGh1cnNkYXlcIixcbiAgICBcIkZyaWRheVwiLFxuICAgIFwiU2F0dXJkYXlcIixcbiAgXTtcbiAgcmV0dXJuIGRheXNbZGF0ZS5nZXREYXkoKV07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXREYXRhKCkge1xuICBjb25zdCBzZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaGZpZWxkXCIpO1xuICBjb25zdCBkaXNwbGF5VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJwXCIpO1xuICBjb25zdCB0b2dnbGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RvZ2dsZUJ0blwiKTtcbiAgY29uc3QgdGVtcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGVtcFwiKTtcbiAgY29uc3QgdGVtcE1haW5Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXAtbWFpbi1jb250YWluZXJcIik7XG4gIGNvbnN0IHRlbXBGb3JlY2FzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIudGVtcC1mb3JlY2FzdC1jb250YWluZXJcIlxuICApO1xuICBjb25zdCBmb3JlY2FzdENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9yZWNhc3RcIik7XG4gIGNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJuYXZcIik7XG5cbiAgbGV0IGN1cnJlbnRUZW1wQ2Vsc2l1cyA9IG51bGw7XG4gIGxldCBjdXJyZW50VGVtcEZhaHJlbmhlaXQgPSBudWxsO1xuICBsZXQgaXNGYWhyZW5oZWl0ID0gdHJ1ZTtcblxuICB0b2dnbGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBuYXYuY2xhc3NMaXN0LmFkZChcIm1vdmVkLXVwXCIpO1xuICB9KTtcblxuICB0b2dnbGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBsb2NhdGlvbiA9IHNlYXJjaC52YWx1ZS50cmltKCk7XG5cbiAgICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgICBkaXNwbGF5VGV4dC50ZXh0Q29udGVudCA9IFwiUGxlYXNlIGVudGVyIGEgbG9jYXRpb24uXCI7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BsYXlUZXh0LnRleHRDb250ZW50ID0gXCJcIjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHdlYXRoZXJGb3JlY2FzdCA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly93ZWF0aGVyLnZpc3VhbGNyb3NzaW5nLmNvbS9WaXN1YWxDcm9zc2luZ1dlYlNlcnZpY2VzL3Jlc3Qvc2VydmljZXMvdGltZWxpbmUvJHtsb2NhdGlvbn0/a2V5PUtMVkNWNDdYNjk3OVNFTkxOWkNEVUZBR0FgLFxuICAgICAgICB7IG1vZGU6IFwiY29yc1wiIH1cbiAgICAgICk7XG4gICAgICBpZiAoIXdlYXRoZXJGb3JlY2FzdC5vaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXZWF0aGVyIGRhdGEgbm90IGZvdW5kLiBDaGVjayB0aGUgbG9jYXRpb24uXCIpO1xuICAgICAgfVxuICAgICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCB3ZWF0aGVyRm9yZWNhc3QuanNvbigpO1xuICAgICAgdGVtcE1haW5Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiZ3JpZFwiO1xuICAgICAgdGVtcEZvcmVjYXN0Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImdyaWRcIjtcbiAgICAgIGNvbnN0IGN1cnJlbnRDb25kaXRpb25zID0gd2VhdGhlckRhdGEuY3VycmVudENvbmRpdGlvbnM7XG5cbiAgICAgIGN1cnJlbnRUZW1wRmFocmVuaGVpdCA9IHdlYXRoZXJEYXRhLmRheXNbMF0udGVtcDtcbiAgICAgIGN1cnJlbnRUZW1wQ2Vsc2l1cyA9ICgoY3VycmVudFRlbXBGYWhyZW5oZWl0IC0gMzIpICogNSkgLyA5O1xuXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvY2F0aW9uXCIpLnRleHRDb250ZW50ID1cbiAgICAgICAgd2VhdGhlckRhdGEucmVzb2x2ZWRBZGRyZXNzO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25kaXRpb25zXCIpLnRleHRDb250ZW50ID1cbiAgICAgICAgd2VhdGhlckRhdGEuY3VycmVudENvbmRpdGlvbnMuY29uZGl0aW9ucztcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzY3JpcHRpb25cIikudGV4dENvbnRlbnQgPVxuICAgICAgICB3ZWF0aGVyRGF0YS5kZXNjcmlwdGlvbjtcblxuICAgICAgY29uc3QgY3VycmVudEljb24gPVxuICAgICAgICB3ZWF0aGVySWNvbltjdXJyZW50Q29uZGl0aW9ucy5pY29uXSB8fCBcIi4vaWNvbnMvZGVmYXVsdC5wbmdcIjtcblxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgIFwid2VhdGhlci1pY29uLW1haW5cIlxuICAgICAgKS5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCIke2N1cnJlbnRJY29ufVwiIGFsdD1cIiR7Y3VycmVudENvbmRpdGlvbnMuaWNvbn1cIiBjbGFzcz1cIndlYXRoZXItaWNvbi1tYWluXCIvPmA7XG5cbiAgICAgIHRlbXAuaW5uZXJIVE1MID0gYFxuICAgICAgICA8c3Bhbj4ke1xuICAgICAgICAgIGlzRmFocmVuaGVpdFxuICAgICAgICAgICAgPyBjdXJyZW50VGVtcEZhaHJlbmhlaXQudG9GaXhlZCgxKSArIFwiwrBGXCJcbiAgICAgICAgICAgIDogY3VycmVudFRlbXBDZWxzaXVzLnRvRml4ZWQoMSkgKyBcIsKwQ1wiXG4gICAgICAgIH08L3NwYW4+XG4gICAgICBgO1xuXG4gICAgICB0b2dnbGVCdG4udGV4dENvbnRlbnQgPSBpc0ZhaHJlbmhlaXQgPyBcIsKwQ1wiIDogXCLCsEZcIjtcblxuICAgICAgZm9yZWNhc3RDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgd2VhdGhlckRhdGEuZGF5cy5zbGljZSgwLCA5KS5mb3JFYWNoKChkYXkpID0+IHtcbiAgICAgICAgY29uc3QgZGF5TmFtZSA9IGdldERheU5hbWUoZGF5LmRhdGV0aW1lKTtcbiAgICAgICAgY29uc3QgY29uZGl0aW9uID0gZGF5Lmljb247XG4gICAgICAgIGNvbnN0IGljb25QYXRoID0gd2VhdGhlckljb25bY29uZGl0aW9uXSB8fCBcIi4vaWNvbnMvZGVmYXVsdC5wbmdcIjtcblxuICAgICAgICBjb25zdCBmb3JlY2FzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBmb3JlY2FzdEl0ZW0uY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0LWl0ZW1cIik7XG4gICAgICAgIGZvcmVjYXN0SXRlbS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgPGltZyBzcmM9XCIke2ljb25QYXRofVwiIGFsdD1cIiR7Y29uZGl0aW9ufVwiIGNsYXNzPVwid2VhdGhlci1pY29uXCIgLz5cblxuICAgICAgICAgIDxwIGNsYXNzPVwiZm9yZWNhc3QtdGVtcFwiPiAke1xuICAgICAgICAgICAgaXNGYWhyZW5oZWl0XG4gICAgICAgICAgICAgID8gZGF5LnRlbXAgKyBcIsKwRlwiXG4gICAgICAgICAgICAgIDogKCgoZGF5LnRlbXAgLSAzMikgKiA1KSAvIDkpLnRvRml4ZWQoMSkgKyBcIsKwQ1wiXG4gICAgICAgICAgfTwvcD5cbiAgICAgICAgICA8aDQ+JHtkYXlOYW1lfTwvaDQ+XG4gICAgICAgICAgPGg1Pigke2RheS5kYXRldGltZX0pPC9oNT5cbiAgICAgICAgICA8cCBjbGFzcz1cImZvcmVjYXN0LWNvbmRpdGlvbnNcIj5Db25kaXRpb25zOiAke2NvbmRpdGlvbi5yZXBsYWNlKFxuICAgICAgICAgICAgLy0vZyxcbiAgICAgICAgICAgIFwiIFwiXG4gICAgICAgICAgKX08L3A+XG4gICAgICAgIGA7XG4gICAgICAgIGZvcmVjYXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGZvcmVjYXN0SXRlbSk7XG4gICAgICB9KTtcblxuICAgICAgaXNGYWhyZW5oZWl0ID0gIWlzRmFocmVuaGVpdDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICBkaXNwbGF5VGV4dC50ZXh0Q29udGVudCA9XG4gICAgICAgIFwiRXJyb3IgZmV0Y2hpbmcgd2VhdGhlciBkYXRhLiBQbGVhc2UgdHJ5IGFnYWluLlwiO1xuICAgIH1cbiAgfSk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/data.js\n");

/***/ }),

/***/ "./src/icons.js":
/*!**********************!*\
  !*** ./src/icons.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   weatherIcon: () => (/* binding */ weatherIcon)\n/* harmony export */ });\n/* harmony import */ var _icons_Day_Clouds_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icons/Day Clouds.png */ \"./src/icons/Day Clouds.png\");\n/* harmony import */ var _icons_Day_Rain_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icons/Day Rain.png */ \"./src/icons/Day Rain.png\");\n/* harmony import */ var _icons_Day_Snow_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icons/Day Snow.png */ \"./src/icons/Day Snow.png\");\n/* harmony import */ var _icons_Day_Storm_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icons/Day Storm.png */ \"./src/icons/Day Storm.png\");\n/* harmony import */ var _icons_Day_Sun_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icons/Day Sun.png */ \"./src/icons/Day Sun.png\");\n/* harmony import */ var _icons_Day_Wind_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./icons/Day Wind.png */ \"./src/icons/Day Wind.png\");\n/* harmony import */ var _icons_Night_Clouds_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./icons/Night Clouds.png */ \"./src/icons/Night Clouds.png\");\n/* harmony import */ var _icons_Night_Moon_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./icons/Night Moon.png */ \"./src/icons/Night Moon.png\");\n/* harmony import */ var _icons_Night_Rain_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./icons/Night Rain.png */ \"./src/icons/Night Rain.png\");\n/* harmony import */ var _icons_Night_Snow_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./icons/Night Snow.png */ \"./src/icons/Night Snow.png\");\n/* harmony import */ var _icons_Night_Storm_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./icons/Night Storm.png */ \"./src/icons/Night Storm.png\");\n/* harmony import */ var _icons_Night_Wind_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./icons/Night Wind.png */ \"./src/icons/Night Wind.png\");\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst weatherIcon = {\n  \"snow\": _icons_Day_Snow_png__WEBPACK_IMPORTED_MODULE_2__,\n  \"snow-showers-day\": _icons_Day_Snow_png__WEBPACK_IMPORTED_MODULE_2__,\n  \"snow-showers-night\": _icons_Night_Snow_png__WEBPACK_IMPORTED_MODULE_9__,\n  \"rain\": _icons_Day_Rain_png__WEBPACK_IMPORTED_MODULE_1__,\n  \"showers-day\": _icons_Day_Rain_png__WEBPACK_IMPORTED_MODULE_1__,\n  \"showers-night\": _icons_Night_Rain_png__WEBPACK_IMPORTED_MODULE_8__,\n  \"partly-cloudy-day\": _icons_Day_Clouds_png__WEBPACK_IMPORTED_MODULE_0__,\n  \"partly-cloudy-night\": _icons_Night_Clouds_png__WEBPACK_IMPORTED_MODULE_6__,\n  \"cloudy\": _icons_Day_Clouds_png__WEBPACK_IMPORTED_MODULE_0__,\n  \"fog\": _icons_Day_Clouds_png__WEBPACK_IMPORTED_MODULE_0__,\n  \"thunder-rain\": _icons_Day_Storm_png__WEBPACK_IMPORTED_MODULE_3__,\n  \"thunder-showers-night\": _icons_Night_Storm_png__WEBPACK_IMPORTED_MODULE_10__,\n  \"thunder-showers-day\": _icons_Day_Storm_png__WEBPACK_IMPORTED_MODULE_3__,\n  \"clear-day\": _icons_Day_Sun_png__WEBPACK_IMPORTED_MODULE_4__,\n  \"clear-night\": _icons_Night_Moon_png__WEBPACK_IMPORTED_MODULE_7__,\n  \"wind-day\": _icons_Day_Wind_png__WEBPACK_IMPORTED_MODULE_5__,\n  \"wind-night\": _icons_Night_Wind_png__WEBPACK_IMPORTED_MODULE_11__\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaWNvbnMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUErQztBQUNKO0FBQ0E7QUFDRTtBQUNKO0FBQ0U7QUFDUTtBQUNKO0FBQ0E7QUFDQTtBQUNFO0FBQ0Y7O0FBRXhDO0FBQ1AsVUFBVSxnREFBTztBQUNqQixzQkFBc0IsZ0RBQU87QUFDN0Isd0JBQXdCLGtEQUFTO0FBQ2pDLFVBQVUsZ0RBQU87QUFDakIsaUJBQWlCLGdEQUFPO0FBQ3hCLG1CQUFtQixrREFBUztBQUM1Qix1QkFBdUIsa0RBQVM7QUFDaEMseUJBQXlCLG9EQUFXO0FBQ3BDLFlBQVksa0RBQVM7QUFDckIsU0FBUyxrREFBUztBQUNsQixrQkFBa0IsaURBQVE7QUFDMUIsMkJBQTJCLG9EQUFVO0FBQ3JDLHlCQUF5QixpREFBUTtBQUNqQyxlQUFlLCtDQUFNO0FBQ3JCLGlCQUFpQixrREFBUztBQUMxQixjQUFjLGdEQUFPO0FBQ3JCLGdCQUFnQixtREFBUztBQUN6QiIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2ljb25zLmpzP2I3NWYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNsb3Vkc0RheSBmcm9tIFwiLi9pY29ucy9EYXkgQ2xvdWRzLnBuZ1wiO1xuaW1wb3J0IHJhaW5EYXkgZnJvbSBcIi4vaWNvbnMvRGF5IFJhaW4ucG5nXCI7XG5pbXBvcnQgc25vd0RheSBmcm9tIFwiLi9pY29ucy9EYXkgU25vdy5wbmdcIjtcbmltcG9ydCBzdG9ybURheSBmcm9tIFwiLi9pY29ucy9EYXkgU3Rvcm0ucG5nXCI7XG5pbXBvcnQgc3VuRGF5IGZyb20gXCIuL2ljb25zL0RheSBTdW4ucG5nXCI7XG5pbXBvcnQgd2luZERheSBmcm9tIFwiLi9pY29ucy9EYXkgV2luZC5wbmdcIjtcbmltcG9ydCBjbG91ZHNOaWdodCBmcm9tIFwiLi9pY29ucy9OaWdodCBDbG91ZHMucG5nXCI7XG5pbXBvcnQgbW9vbk5pZ2h0IGZyb20gXCIuL2ljb25zL05pZ2h0IE1vb24ucG5nXCI7XG5pbXBvcnQgcmFpbk5pZ2h0IGZyb20gXCIuL2ljb25zL05pZ2h0IFJhaW4ucG5nXCI7XG5pbXBvcnQgc25vd05pZ2h0IGZyb20gXCIuL2ljb25zL05pZ2h0IFNub3cucG5nXCI7XG5pbXBvcnQgc3Rvcm1OaWdodCBmcm9tIFwiLi9pY29ucy9OaWdodCBTdG9ybS5wbmdcIjtcbmltcG9ydCB3aW5kTmlnaHQgZnJvbSBcIi4vaWNvbnMvTmlnaHQgV2luZC5wbmdcIjtcblxuZXhwb3J0IGNvbnN0IHdlYXRoZXJJY29uID0ge1xuICBcInNub3dcIjogc25vd0RheSxcbiAgXCJzbm93LXNob3dlcnMtZGF5XCI6IHNub3dEYXksXG4gIFwic25vdy1zaG93ZXJzLW5pZ2h0XCI6IHNub3dOaWdodCxcbiAgXCJyYWluXCI6IHJhaW5EYXksXG4gIFwic2hvd2Vycy1kYXlcIjogcmFpbkRheSxcbiAgXCJzaG93ZXJzLW5pZ2h0XCI6IHJhaW5OaWdodCxcbiAgXCJwYXJ0bHktY2xvdWR5LWRheVwiOiBjbG91ZHNEYXksXG4gIFwicGFydGx5LWNsb3VkeS1uaWdodFwiOiBjbG91ZHNOaWdodCxcbiAgXCJjbG91ZHlcIjogY2xvdWRzRGF5LFxuICBcImZvZ1wiOiBjbG91ZHNEYXksXG4gIFwidGh1bmRlci1yYWluXCI6IHN0b3JtRGF5LFxuICBcInRodW5kZXItc2hvd2Vycy1uaWdodFwiOiBzdG9ybU5pZ2h0LFxuICBcInRodW5kZXItc2hvd2Vycy1kYXlcIjogc3Rvcm1EYXksXG4gIFwiY2xlYXItZGF5XCI6IHN1bkRheSxcbiAgXCJjbGVhci1uaWdodFwiOiBtb29uTmlnaHQsXG4gIFwid2luZC1kYXlcIjogd2luZERheSxcbiAgXCJ3aW5kLW5pZ2h0XCI6IHdpbmROaWdodFxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/icons.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data.js */ \"./src/data.js\");\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    (0,_data_js__WEBPACK_IMPORTED_MODULE_1__.getData)()\n  })\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7O0FBQXNCOztBQUVjOztBQUVwQztBQUNBLElBQUksaURBQU87QUFDWCxHQUFHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCIuL3N0eWxlcy5jc3NcIjtcblxuaW1wb3J0IHsgZ2V0RGF0YSB9IGZyb20gXCIuL2RhdGEuanNcIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIGdldERhdGEoKVxuICB9KVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/icons/Day Clouds.png":
/*!**********************************!*\
  !*** ./src/icons/Day Clouds.png ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "6d850c3f46ce03ff8a54.png";

/***/ }),

/***/ "./src/icons/Day Rain.png":
/*!********************************!*\
  !*** ./src/icons/Day Rain.png ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a3ff5fdd5a9b2437ebae.png";

/***/ }),

/***/ "./src/icons/Day Snow.png":
/*!********************************!*\
  !*** ./src/icons/Day Snow.png ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a7afd5fa270589923a2e.png";

/***/ }),

/***/ "./src/icons/Day Storm.png":
/*!*********************************!*\
  !*** ./src/icons/Day Storm.png ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "cd7393b7923e2b94f626.png";

/***/ }),

/***/ "./src/icons/Day Sun.png":
/*!*******************************!*\
  !*** ./src/icons/Day Sun.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "64f7ac9df0dd3e3e8611.png";

/***/ }),

/***/ "./src/icons/Day Wind.png":
/*!********************************!*\
  !*** ./src/icons/Day Wind.png ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a081ff12a7acac961100.png";

/***/ }),

/***/ "./src/icons/Night Clouds.png":
/*!************************************!*\
  !*** ./src/icons/Night Clouds.png ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0b92c2a8a856be63edf1.png";

/***/ }),

/***/ "./src/icons/Night Moon.png":
/*!**********************************!*\
  !*** ./src/icons/Night Moon.png ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e0e26cb1cea2ce6c1805.png";

/***/ }),

/***/ "./src/icons/Night Rain.png":
/*!**********************************!*\
  !*** ./src/icons/Night Rain.png ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ea8b57412fa23e1bb732.png";

/***/ }),

/***/ "./src/icons/Night Snow.png":
/*!**********************************!*\
  !*** ./src/icons/Night Snow.png ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "412b8a02b2f8868b7acf.png";

/***/ }),

/***/ "./src/icons/Night Storm.png":
/*!***********************************!*\
  !*** ./src/icons/Night Storm.png ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "56ec53bb73431563ae0e.png";

/***/ }),

/***/ "./src/icons/Night Wind.png":
/*!**********************************!*\
  !*** ./src/icons/Night Wind.png ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "592dd85640204a28ff37.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;