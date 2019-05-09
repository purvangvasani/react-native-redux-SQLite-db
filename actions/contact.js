import {ADD_CONTACT_INFO} from './types'
import {EMPTY_STORE} from './types'

export const addContactInfo = (ContactID, ContactName, ContactNumber, ContactAddress) => {
    console.log('====================================');
    console.log("Action ADD");
    console.log('====================================');
    return {
        type: ADD_CONTACT_INFO,
        payload: {ContactID, ContactName, ContactNumber, ContactAddress}
    }
}

export const emptyStore = () => {
    console.log('====================================');
    console.log("Action Empty");
    console.log('====================================');
    return {
        type: EMPTY_STORE,
        payload: {}
    }
}