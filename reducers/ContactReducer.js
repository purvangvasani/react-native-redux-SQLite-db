import {ADD_CONTACT_INFO} from '../actions/types'
import {EMPTY_STORE} from '../actions/types'

const initialState = {
    ContactID: '',
    ContactName: '',
    ContactNumber: '',
    ContactAddress: '',
    Contacts: [],
}

const contactReducer = (state=initialState, action) => {
    switch(action.type){
        case ADD_CONTACT_INFO:
            console.log('====================================');
            console.log("Reducer ADD");
            console.log('====================================');
            return Object.assign({}, state, {
                Contacts: state.Contacts.concat({
                    key: new Date(),
                    ContactID: action.payload.ContactID,
                    ContactName: action.payload.ContactName,
                    ContactNumber: action.payload.ContactNumber,
                    ContactAddress: action.payload.ContactAddress,
                })
            })
        case EMPTY_STORE:
            console.log('====================================');
            console.log("Reducer EMPTY");
            console.log('====================================');
            return initialState
        default:
            return state
    }
}


export default contactReducer