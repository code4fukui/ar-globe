import { THREE } from "https://code4fukui.github.io/egxr.js/egxr.js";
import { lla2xyz } from "./lla2xyz.js";

export const createCoastLines = async (r = 1.0, detail = 110, color = "green") => { // 110, 50, 10
  const path = `ne_${detail}m_coastline.json`;
  const geojson = await (await fetch(path)).json();
  const grp = new THREE.Group();
  const makeLine = (coordinates) => {
    const points = coordinates.map(i => {
      const p = lla2xyz(Math.PI - i[0], i[1], 0, r);
      return new THREE.Vector3(p.x, p.y, p.z);
    });
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    grp.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color })));
  };
  const makeFeature = (f) => {
    for (const f of geojson.features) {
      if (f.geometry.type == "LineString") {
        makeLine(f.geometry.coordinates);
      } else if (f.geometry.type == "MultiLineString") {
        for (const c of f.geometry.coordinates) {
          makeLine(c);
        }
      } else {
        console.log("can't parse", f);
      }
    }
  };
  makeFeature(geojson.feature);
  return grp;
};
