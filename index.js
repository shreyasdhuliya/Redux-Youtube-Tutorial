//import redux from 'redux';

//responsisili
const redux = require('redux')
const combineReducers = redux.combineReducers
//responsibility 2: crete reduc store
const createStore = redux.createStore;

//redux-logeger
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger();

//apply middleware
const applyMiddleware = redux.applyMiddleware

console.log('hi')

const BUY_CAKE= 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM' 

function buyCake(){
    return{
        type: BUY_CAKE,
        info:'first action'
    }
}

function buyIceCream(){
    return{
        type: BUY_ICECREAM,
        info:'second action'
    }
}
//************************************************************ */
//*************************Single Reducer********************* */
//************************************************************ */
//reducter (prevState, action) => newState

const initialState = {
    numOfCakes: 10,
    numOfIceCreams: 20
}



const reducer =(state = initialState, action) => {
    switch(action.type) {
        case BUY_CAKE:
            return{
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        case BUY_ICECREAM   :
            return{
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        default:  return state
            
    }
}

//responsibility 1:redux store holding app state
const store = createStore(reducer)

//responsibility 2:getSate() gives current state
console.log('Initial stsate', store.getState())

//responisibilty 4: subsrcbe
const unsubscribe = store.subscribe(()=> console.log('updated state', store.getState()))

//responsibility 3: 
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())

//responsibilyy 5: unscribe
unsubscribe()

//************************************************************ */
//*************************Multiple Reducer********************* */
//************************************************************ */

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCreams: 20
}


const cakeReducer =(state = initialCakeState, action) => {
    switch(action.type) {
        case BUY_CAKE:
            return{
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        default:  return state
            
    }
}

const icecreamReducer =(state = initialIceCreamState, action) => {
    switch(action.type) {      
        case BUY_ICECREAM   :
            return{
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        default:  return state
            
    }
}

console.log("################################")

//combine reducer
const rootreducer = combineReducers({
    cake:cakeReducer,
    iceCream: icecreamReducer
})

//responsibility 1:redux store holding app state
const store2 = createStore(rootreducer, applyMiddleware(logger))

//responsibility 2:getSate() gives current state
console.log('Initial stsate', store2.getState())

//responisibilty 4: subsrcbe
//const unsubscribe2 = store2.subscribe(()=> console.log('updated state', store2.getState()))
const unsubscribe2 = store2.subscribe(()=> {})

//responsibility 3: 
store2.dispatch(buyIceCream())
store2.dispatch(buyIceCream())
store2.dispatch(buyCake())
store2.dispatch(buyCake())
store2.dispatch(buyCake())


//responsibilyy 5: unscribe
unsubscribe2()