import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const store = configureStore({
	reducer: {
		auth: authSlice,
		//TODO: work on adding postSlice
		// post: postSlice,
	},
});

// // * when two or more reducers are needed, we need to combine them using combineReducers()
// /*
// const store = configureStore({
// 	reducer: combineReducers({
// 		auth: authSlice.reducer,
// 		post: postSlice.reducer,
// 	}),
// });

// */

export default store;
