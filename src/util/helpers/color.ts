import C from "color";

export const Color = {
  lighten: (color: string, ratio: number) => C(color).lighten(ratio).toString(),
  darken: (color: string, ratio: number) => C(color).darken(ratio).toString(),
  alpha: (color: string, ratio: number) => C(color).alpha(ratio).toString(),
  mix: (first: string, second: string, amount = 0.5) =>
    C(first).mix(C(second), amount).toString(),
  isDark: (color: string) => C(color).isDark(),
  isLight: (color: string) => C(color).isLight(),
};
