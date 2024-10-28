import {cards} from './components/Cards'
import {products} from './Model'

export {default} from './PhilzCoffee'

export const assets = products
  .map(product => product.picture)
  .concat(cards.map(card => card.picture))
