import { combineReducers, createStore, applyMiddleware} from 'redux' ;

import thunk from 'redux-thunk' ;
import {composeWithDevTools} from 'redux-devtools-extension' ;
import { getProductDetailsReducer, getProductsReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer' ;
//takes object 
const reducers = combineReducers({
    getProducts: getProductsReducer,
    getProductDetails: getProductDetailsReducer,
    cart:cartReducer
})

const middleware = [thunk] ;
// takes two argument reducers and middleware
const store = createStore(
     reducers,
     composeWithDevTools( applyMiddleware(...middleware) ) 
)

export default store ;