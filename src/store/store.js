import {configureStore} from '@reduxjs/toolkit'
import authreducer from '../Features/slice1'
const store =configureStore({

    reducer:{
           authreducer
    },

    devTools:true
})

export default store;