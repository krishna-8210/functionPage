import { configureStore } from '@reduxjs/toolkit'
import authslice from './AuthSlice'

import datalistSlice from './DatalistSlice'

export default configureStore({
  reducer: {authslice,datalistSlice},
})