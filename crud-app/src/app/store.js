import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userReducer'

 const store = configureStore({
    reducer: {
        app: userReducer
    }
})

export default store