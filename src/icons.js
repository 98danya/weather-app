import cloudsDay from "./icons/Day Clouds.png";
import rainDay from "./icons/Day Rain.png";
import snowDay from "./icons/Day Snow.png";
import stormDay from "./icons/Day Storm.png";
import sunDay from "./icons/Day Sun.png";
import windDay from "./icons/Day Wind.png";
import cloudsNight from "./icons/Night Clouds.png";
import moonNight from "./icons/Night Moon.png";
import rainNight from "./icons/Night Rain.png";
import snowNight from "./icons/Night Snow.png";
import stormNight from "./icons/Night Storm.png";
import windNight from "./icons/Night Wind.png";

export const weatherIcon = {
  "snow": snowDay,
  "snow-showers-day": snowDay,
  "snow-showers-night": snowNight,
  "rain": rainDay,
  "showers-day": rainDay,
  "showers-night": rainNight,
  "partly-cloudy-day": cloudsDay,
  "partly-cloudy-night": cloudsNight,
  "cloudy": cloudsDay,
  "fog": cloudsDay,
  "thunder-rain": stormDay,
  "thunder-showers-night": stormNight,
  "thunder-showers-day": stormDay,
  "clear-day": sunDay,
  "clear-night": moonNight,
  "wind-day": windDay,
  "wind-night": windNight
};
