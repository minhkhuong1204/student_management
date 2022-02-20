import { configureStore, ThunkAction, Action, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import counterReducer from '../features/counter/counterSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga'
import { connectRouter, routerMiddleware } from "connected-react-router";
import { history } from 'utils';
import dashboardReducer from 'features/dashboard/dashboardSlice';
import studentReducer from 'features/student/studentSlice';
import cityReducer from 'features/city/citySlice';

const rootReducer = combineReducers( {
  router: connectRouter(history),
  auth: authReducer,
  counter: counterReducer,
  dashboard: dashboardReducer,
  student: studentReducer,
  city: cityReducer
})

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
