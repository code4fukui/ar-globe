import { THREE } from "https://code4fukui.github.io/egxr.js/egxr.js";

export const createSphere = (r, level = 6, color = "white", opacity = 0.5) => {
  const geo = new THREE.IcosahedronGeometry(r, level);
  //const geo = new THREE.SphereGeometry(r, 18, 9);
  //const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  const opt = { color, side: THREE.DoubleSide };
  if (opacity < 1.0) {
    opt.opacity = opacity;
    opt.transparent = true;
  }
  const mat = new THREE.MeshBasicMaterial(opt);
  const mesh = new THREE.Mesh(geo, mat);
  return mesh;
};
