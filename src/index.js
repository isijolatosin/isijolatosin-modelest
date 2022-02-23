import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import './App.css'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import UserContextProvider from './context/user-context'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
	'pk_test_51KQIMSLTIkVkSAcp9vIGMazcgD1450LNgPLEKUYqO4m3jxpDpXKFx14XQIH8qIZE1XHTGFkhqsKRa3eFEeKwOTKV000hsAZtpi'
)

ReactDOM.render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<BrowserRouter>
				<UserContextProvider>
					<Elements stripe={stripePromise}>
						<App />
					</Elements>
				</UserContextProvider>
			</BrowserRouter>
		</PersistGate>
	</Provider>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
