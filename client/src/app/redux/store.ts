import { configureStore } from "@reduxjs/toolkit";
//import type { TypedUseSelectorHook } from 'react-redux'
import  { useDispatch, useSelector } from "react-redux";

import { cartSlice } from "../../features/Cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
//export const useAppSelector:(selector : (state :RootState) => any) => any = useSelector;

export const useAppSelector = useSelector<RootState>;

//export const useAppSelector = useSelector.withTypes<RootState>()

//export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//npm cache clean --force