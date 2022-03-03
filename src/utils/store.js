import create from "zustand";

const useStore = create((set) => ({
  points: 0,
  startup: true,
  restart: false,
  start: () => {
    set({ startup: false });
    document.body.style.cursor = "none";
  },
  reset: () => {
    set({ points: 0, restart: true });
    setTimeout(() => set({ restart: false }), 10);
  },
  contact: (e) => {
    if (e.contact.impactVelocity > 4) {
      set((state) => ({ points: state.points + 1 }));
    }
  },
}));

export { useStore };
