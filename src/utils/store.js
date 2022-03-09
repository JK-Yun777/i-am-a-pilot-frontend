import create from "zustand";
import * as THREE from "three";

import { color } from "./color";
import bgAudio from "../assets/music/GameBg.mp3";
import rankAudio from "../assets/music/RankingBg.mp3";
import bonusAudio from "../assets/music/BonusHit.mp3";

let clock = new THREE.Clock();
const bg = new Audio(bgAudio);
const rankBg = new Audio(rankAudio);
const bonusBg = new Audio(bonusAudio);
bg.loop = true;
rankBg.loop = true;

const useStore = create((set) => ({
  distance: 0,
  points: 0,
  hit: false,
  startup: true,
  restart: false,
  userEmail: false,
  airplaneColor: color.red,
  stopGameBg: () => {
    bg.pause();
    bg.currentTime = 0;
  },
  startRankBg: () => {
    rankBg.play();
  },
  stopRankBg: () => {
    rankBg.pause();
    rankBg.currentTime = 0;
  },
  start: () => {
    clock = new THREE.Clock();
    set({ startup: false });
    bg.play();
  },
  setColor: (data) => {
    set({ airplaneColor: data });
  },
  login: (data) => {
    set({ userEmail: data });
  },
  logout: () => {
    set({
      userEmail: false,
      points: 0,
      distance: 0,
      startup: true,
      restart: true,
    });
  },
  getDistance: (time) => {
    if (time) {
      set((state) => ({
        distance: Math.floor(state.distance + clock.getDelta()),
        restart: false,
      }));
    }
  },
  reset: () => {
    set({ points: 0, distance: 0, startup: true, restart: true });
  },
  contact: (e) => {
    if (e.contact.impactVelocity > 1) {
      set((state) => ({ points: state.points + 1 }));
      bonusBg.play();
    }
  },
}));

export { useStore };
