import { THREE } from "https://code4fukui.github.io/egxr.js/egxr.js";
import { createCountries } from "./createCountries.js";
import { createSphere } from "./createSphere.js";

const detail = 110;
//const detailjp = 50;
const detail2 = 10;

//const spherecolor = 0xccddff; // blue
const spherecolor = 0xffffff; // white

export const createCountriesDetail = async (deteailcountries) => {
  const o = new THREE.Group();
  o.add(await createSphere(0.997, 6, spherecolor));
  o.add(await createCountries(detail, 0x222222, f => deteailcountries.indexOf(f.properties.NAME) == -1));
  o.add(await createCountries(detail2, 0x222222, f => deteailcountries.indexOf(f.properties.NAME) != -1));
  return o;
};
