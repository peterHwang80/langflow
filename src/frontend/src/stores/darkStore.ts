import { create } from "zustand";
import type { DarkStoreType } from "../types/zustand/dark";

export const useDarkStore = create<DarkStoreType>((set, get) => ({
  dark: (() => {
    const stored = window.localStorage.getItem("isDark");
    if (stored !== null) return JSON.parse(stored);
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  })(),
  stars: 0,
  version: "",
  latestVersion: "",
  refreshLatestVersion: (v: string) => {
    set(() => ({ latestVersion: v }));
  },
  setDark: (dark) => {
    set(() => ({ dark: dark }));
    window.localStorage.setItem("isDark", dark.toString());
  },
  refreshVersion: (v) => {
    set(() => ({ version: v }));
  },
  refreshStars: () => {
    set(() => ({ stars: 0, lastUpdated: new Date() }));
  },
  discordCount: 0,
  refreshDiscordCount: () => {
    set(() => ({ discordCount: 0 }));
  },
}));
