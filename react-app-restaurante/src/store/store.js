import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "../reducers/rootReducer";
import thunk from "redux-thunk"; // npm i redux-thunk middleware para acciones asincronas

// esto habilita las funciones de devtools y nos permite usar middleware
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
