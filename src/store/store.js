import Vue from 'vue'
import Vuex from 'vuex'
import { initialState } from './initialState'
import { localStoragePlugin, stateResolver } from "./plugins/localStorage"
import getters from './getters'
import mutations from './mutations'

const appStoragePrefix = 'MaxDVuex';
const state = stateResolver(appStoragePrefix, initialState);

Vue.use(Vuex);

const store = new Vuex.Store({
	plugins: [localStoragePlugin(appStoragePrefix)],
	state,
	getters,
	mutations
});

export default store;
