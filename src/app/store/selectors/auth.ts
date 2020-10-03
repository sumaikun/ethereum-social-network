import { createFeatureSelector, createSelector } from "@ngrx/store";

import { State, adapter, ENTITY_FEATURE_KEY } from "../reducers/auth";

// Lookup the 'Entity' feature state managed by NgRx
const getEntityState = createFeatureSelector<any>(ENTITY_FEATURE_KEY);

// get the selectors
//const { selectIds, selectAll, selectTotal, selectEntities } = adapter.getSelectors();

// select entity error
export const selectUser = createSelector(
  getEntityState,
  state => state.user
);

export const selectRole = createSelector(
  getEntityState,
  state => state.user?.role
);

export const selectToken = createSelector(
  getEntityState,
  state => state.tokenapi
);


// select entity loaded flag
export const selectEntityLoaded = createSelector(
  getEntityState,
  state => state.loaded
);

// select entity error
export const selectError = createSelector(
  getEntityState,
  state => state.error
);