import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cartItems', 'itemCount', 'total', 'isLike'],
}

const initialState = {
	cartItems: [],
	itemCount: 0,
	total: 0,
	bookingObject: '',
	isLike: [],
}

export const appSlices = createSlice({
	name: 'app',
	initialState,
	reducers: {
		// likes
		setLike: (state, action) => {
			// eslint-disable-next-line no-unused-expressions
			state.isLike.push(action.payload)
		},
		setDislike: (state, action) => {
			const removeIndex = state.isLike.findIndex(
				(item) => item === action.payload
			)
			state.isLike.splice(removeIndex, 1)
		},

		// Add item
		addToCartItem: (state, action) => {
			// check if item is in the cart
			if (!state.cartItems.find((item) => item.id === action.payload.id)) {
				state.cartItems.push({
					...action.payload,
					quantity: action.payload.quantity || 1,
				})
			}

			state.itemCount = state.cartItems.reduce(
				(total, prod) => total + prod.quantity,
				0
			)
			state.total = state.cartItems.reduce(
				(total, prod) => total + prod.price * prod.quantity,
				0
			)
		},

		// Increase Item
		increaseCartItem: (state, action) => {
			if (
				state.cartItems.find(
					(item) =>
						item.hairLength === action.payload.hairLength &&
						item.id === action.payload.id
				)
			) {
				const increaseIndex = state.cartItems.findIndex(
					(item) =>
						item.id === action.payload.id &&
						item.hairLength === action.payload.hairLength
				)

				state.cartItems[increaseIndex].quantity++

				state.itemCount = state.cartItems.reduce(
					(total, prod) => total + prod.quantity,
					0
				)
				state.total = state.cartItems.reduce(
					(total, prod) => total + prod.price * prod.quantity,
					0
				)
			} else {
				state.cartItems.push({
					...action.payload,
					quantity: action.payload.quantity || 1,
				})

				state.itemCount = state.cartItems.reduce(
					(total, prod) => total + prod.quantity,
					0
				)
				state.total = state.cartItems.reduce(
					(total, prod) => total + prod.price * prod.quantity,
					0
				)
			}
		},

		// Decrease Item
		decreaseCartItem: (state, action) => {
			const decreaseIndex = state.cartItems.findIndex(
				(item) =>
					item.id === action.payload.id &&
					item.hairLength === action.payload.hairLength
			)
			const product = state.cartItems[decreaseIndex]
			if (product.quantity >= 1) {
				product.quantity--
			}
			state.itemCount = state.cartItems.reduce(
				(total, prod) => total + prod.quantity,
				0
			)
			state.total = state.cartItems.reduce(
				(total, prod) => total + prod.price * prod.quantity,
				0
			)
		},

		// Remove Item
		removeCartItem: (state, action) => {
			const removeIndex = state.cartItems.findIndex(
				(item) =>
					item.id === action.payload.id &&
					item.hairLength === action.payload.hairLength
			)

			const a = state.cartItems.slice(0, removeIndex)
			const b = state.cartItems.slice(removeIndex + 1, state.cartItems.length)

			const newCartItems = [...a, ...b]

			state.cartItems = [...newCartItems]

			state.itemCount = state.cartItems.reduce(
				(total, prod) => total + prod.quantity,
				0
			)
			state.total = state.cartItems.reduce(
				(total, prod) => total + prod.price * prod.quantity,
				0
			)
		},

		// Clear CartItems
		clearCartItem: (state) => {
			state.cartItems = []
			state.itemCount = 0
			state.total = 0
		},
		setBookingObject: (state, action) => {
			state.bookingObject = action.payload
		},
	},
})

export const {
	addToCartItem,
	increaseCartItem,
	decreaseCartItem,
	removeCartItem,
	clearCartItem,
	setBookingObject,
	setLike,
	setDislike,
} = appSlices.actions

// Selectors
export const selectCartItems = (state) => state.app.cartItems
export const selectItemCount = (state) => state.app.itemCount
export const selectTotal = (state) => state.app.total
export const selectBookingObject = (state) => state.app.bookingObject
export const selectIsLike = (state) => state.app.isLike

const rootReducer = appSlices.reducer

export default persistReducer(persistConfig, rootReducer)
