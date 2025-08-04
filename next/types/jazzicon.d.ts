// types/jazzicon.d.ts
declare module "@metamask/jazzicon" {
  /**
   * Generates a Jazzicon SVG/HTML node.
   * @param diameter The diameter (px) of the icon.
   * @param seed A numeric seed (e.g. parseInt(address.slice(2,10),16)).
   * @returns An HTMLElement containing the icon.
   */
  export default function jazzicon(diameter: number, seed: number): HTMLElement
}
