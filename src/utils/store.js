import create from "zustand";
import * as THREE from "three";

const clock = new THREE.Clock();

const useStore = create((set) => ({
  distance: 0,
  points: 0,
  startup: true,
  restart: false,
  userEmail: null,
  start: () => {
    set({ startup: false });
  },
  login: (data) => {
    set({ userEmail: data });
  },
  getDistance: (time) => {
    if (time) {
      set((state) => ({
        distance: Math.floor(state.distance + clock.getDelta()),
      }));
    }
  },
  reset: () => {
    set({ points: 0, restart: true });
    setTimeout(() => set({ restart: false }), 10);
  },
  contact: (e) => {
    if (e.contact.impactVelocity > 1) {
      set((state) => ({ points: state.points + 1 }));
    }
  },
}));

export { useStore };
