import { useMemo } from "react";

type UseAvatarOpts = {
  seed?: string; // usually email or username
};

function pickGender(seed?: string) {
  const val = seed
    ? seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0)
    : Math.floor(Math.random() * 1000);
  return val % 2 === 0 ? "men" : "women";
}

function pickNumber(seed?: string) {
  if (!seed) return Math.floor(Math.random() * 100);
  return seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 100; // 0–99
}

/** Returns a stable randomuser.me portrait URL */
export function useAvatar({ seed }: UseAvatarOpts = {}) {
  const src = useMemo(() => {
    const gender = pickGender(seed);
    const num = pickNumber(seed);
    return `https://randomuser.me/api/portraits/${gender}/${num}.jpg`;
  }, [seed]);

  return { src };
}
