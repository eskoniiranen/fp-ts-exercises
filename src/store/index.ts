import * as S from 'fp-ts/State';
import { Snowplow } from '../data/types';

type AppState = {
  snowplows: Snowplow[]
}

const initialState: AppState = {
  snowplows: [],
}

/*
const addProductToCart = (product: Snowplow): S.State<AppState, void> =>
  S.modify((state) => ({
    ...state,
    cart: {
      items: [...state.cart.items, product],
      total: 0,
    },
  }))

const removeProduct = (product: Snowplow): S.State<AppState, void> =>
  S.modify((state) => ({
    ...state,
    cart: {
      items: state.cart.items.filter((x) => x.id !== product.id),
      total: 0,
    },
  }))
*/

const initialize: S.State<AppState, void> = S.put(initialState)

export const Store = { getSnowplows: [] };

