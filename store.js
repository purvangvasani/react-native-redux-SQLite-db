import {combineReducers, createStore} from 'redux'
import ContactReducer from './reducers/ContactReducer'

const rootReducer = combineReducers({
    contact: ContactReducer,
})

const configureStore = () =>{
    return createStore(rootReducer)
}

export default configureStore