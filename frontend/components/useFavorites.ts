"use client";
import { useCallback, useEffect, useState } from "react";
const KEY = "yourehome-favorites";

/** Favorites are browser-local in v1. No login or back-end account is required. */
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  useEffect(() => {
    try { setFavorites(JSON.parse(window.localStorage.getItem(KEY) || "[]")); } catch { setFavorites([]); }
    const sync = () => {
      try { setFavorites(JSON.parse(window.localStorage.getItem(KEY) || "[]")); } catch { setFavorites([]); }
    };
    window.addEventListener("storage", sync);
    window.addEventListener("yourehome-favorites-updated", sync);
    return () => { window.removeEventListener("storage", sync); window.removeEventListener("yourehome-favorites-updated", sync); };
  }, []);
  const toggleFavorite = useCallback((slug: string) => {
    let current: string[] = [];
    try { current = JSON.parse(window.localStorage.getItem(KEY) || "[]"); } catch { /* use empty list */ }
    const next = current.includes(slug) ? current.filter(s => s !== slug) : [...current, slug];
    window.localStorage.setItem(KEY, JSON.stringify(next));
    setFavorites(next);
    window.dispatchEvent(new Event("yourehome-favorites-updated"));
  }, []);
  return { favorites, isFavorite: (slug: string) => favorites.includes(slug), toggleFavorite };
}
