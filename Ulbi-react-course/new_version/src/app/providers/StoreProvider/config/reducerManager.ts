export function createReducerManager(initialReducers) {
  const reducers = { ...initialReducers };

  let combinedReducer = combineReducers(reducers);

  let keysToRemove = [];

  return {
    getReducerMap: () => reducers,

    reduce: (state, action) => {
      if (keysToRemove.length > 0) {
        state = { ...state };
        for (let key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = [];
      }

      return combinedReducer(state, action);
    },

    add: (key, reducer) => {
      if (!key || reducers[key]) {
        return;
      }

      reducers[key] = reducer;

      combinedReducer = combineReducers(reducers);
    },

    remove: (key) => {
      if (!key || !reducers[key]) {
        return;
      }

      delete reducers[key];

      keysToRemove.push(key);

      combinedReducer = combineReducers(reducers);
    },
  };
}

const staticReducers = {
  users: usersReducer,
  posts: postsReducer,
};

export function configureStore(initialState) {
  const reducerManager = createReducerManager(staticReducers);

  const store = createStore(reducerManager.reduce, initialState);

  store.reducerManager = reducerManager;
}
