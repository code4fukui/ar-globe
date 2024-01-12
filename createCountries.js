import { THREE } from "https://code4fukui.github.io/egxr.js/egxr.js";
import { lla2xyz } from "./lla2xyz.js";
import { baseurl } from "./baseurl.js";

export const createCountries = async (detail = 110, color = "green", filter = null) => { // 110, 50, 10
  const url = `${baseurl}${detail}m/cultural/ne_${detail}m_admin_0_countries.json`;
  const geojson = await (await fetch(url)).json();
  const grp = new THREE.Group();
  const makeLine = (coordinates) => {
    const points = coordinates.map(i => {
      const p = lla2xyz(Math.PI - i[0], i[1], 0);
      return new THREE.Vector3(p.x, p.y, p.z);
    });
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    grp.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color })));
  };
  const makeFeature = (f) => {
    for (const f of geojson.features) {
      const t = f.geometry.type;
      if (filter && !filter(f)) continue;
      if (t == "LineString") {
        makeLine(f.geometry.coordinates);
      } else if (t == "MultiLineString" || t == "Polygon") {
        for (const c of f.geometry.coordinates) {
          makeLine(c);
        }
      } else if (t == "MultiPolygon") {
        for (const c of f.geometry.coordinates) {
          for (const c2 of c) {
            makeLine(c2);
          }
        }
      } else {
        console.log("can't parse", f);
      }
    }
  };
  makeFeature(geojson.feature);
  return grp;
};
