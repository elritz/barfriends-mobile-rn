import { products } from "./Model";
import { cards } from "./components/Cards";

export { default } from "./AdvertismentHorizontal";

export const assets = products
  .map((product) => product.picture)
  .concat(cards.map((card) => card.picture));
