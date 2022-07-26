import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
import userReducer from "./userReducer";
import clientReducer from "./clientReducer";
import adminReducer from './adminReducer';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo']
};

const clientPersistConfig = {
    ...persistCommonConfig,
    key: 'client',
    whitelist: ['isLoggedIn', 'clientInfo']
};

const appPersistConfig = {
    ...persistCommonConfig,
    key: 'app',
    whitelist: ['language']
};

const combineReducersfunc = (history) => combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    client: persistReducer(clientPersistConfig, clientReducer),
    app: persistReducer(appPersistConfig, appReducer),
    admin: adminReducer
})

export default combineReducersfunc