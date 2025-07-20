import { cartReducer } from './CartContext';

describe('cartReducer', () => {
  const initialState = { items: [] };

  test('adds a new item when ADD_ITEM is dispatched', () => {
    const action = {
      type: 'ADD_ITEM',
      payload: { id: 'p1', name: 'Widget', price: 9.99, quantity: 1 },
    };
    const nextState = cartReducer(initialState, action);

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0]).toEqual(action.payload);
  });

  test('increments quantity if same item is added again', () => {
    const state = {
      items: [{ id: 'p1', name: 'Widget', price: 9.99, quantity: 1 }],
    };
    const action = {
      type: 'ADD_ITEM',
      payload: { id: 'p1', name: 'Widget', price: 9.99, quantity: 1 },
    };
    const nextState = cartReducer(state, action);

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].quantity).toBe(2);
  });

  test('removes item when REMOVE_ITEM is dispatched', () => {
    const state = {
      items: [{ id: 'p1', name: 'Widget', price: 9.99, quantity: 1 }],
    };
    const action = { type: 'REMOVE_ITEM', payload: { id: 'p1' } };
    const nextState = cartReducer(state, action);

    expect(nextState.items).toHaveLength(0);
  });

  test('unknown action returns the same state', () => {
    const action = { type: 'UNKNOWN' };
    const nextState = cartReducer(initialState, action);
    expect(nextState).toBe(initialState);
  });
});
