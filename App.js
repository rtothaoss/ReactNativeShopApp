import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/orders'
import ShopNavigator from './navigation/ShopNavigator';
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk)); //remove , composeWithDevTools before deploy

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/Fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/Fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {

  const [ fontLoaded, setFontLoaded ] = useState(false)

  if(!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)}/>
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
