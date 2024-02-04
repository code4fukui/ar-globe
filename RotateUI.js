class UI {
  ptouch = null;
  bkth = null;
  preth = null;
};

export class RotateUI {
  uis = [];
  autoth = -0.0005;
  constructor(target, r) {
    this.target = target;
    this.r = r;
  }
  update(renderer) {
    const o = this.target;
    const r = this.r;
    const p = o.position;
    for (let i = 0; i < 2; i++) {
      const ctrl = renderer.xr.getController(i);
      if (!ctrl) continue;

      let ui = this.uis[i];
      if (!ui) ui = this.uis[i] = new UI();
      
      if (!ui.ptouch) {
        if (p.distanceTo(ctrl.position) < r) {
          ui.ptouch = ctrl.position.clone().sub(p);
          ui.bkth = o.rotation.z;
        }
      } else {
        const p2 = ctrl.position.clone().sub(p);
        const p1 = ui.ptouch;
        const th1 = Math.atan2(p1.z, p1.x);
        const th2 = Math.atan2(p2.z, p2.x);
        const th = th2 - th1;
        o.rotation.z = ui.bkth + th;
        if (p.distanceTo(ctrl.position) >= r) {
          ui.ptouch = null;
          this.autoth = th - ui.preth;
        }
        ui.preth = th;
      }
    }
    // 両方触っていない時惰性で回す
    if (!this.uis.reduce((cur, i) => cur || i.ptouch != null, false)) {
      o.rotation.z += this.autoth;
      //this.autoth *= 0.97; // 減衰させる
    }
  }
}
