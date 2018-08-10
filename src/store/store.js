import Vue from 'vue'
import Vuex from 'vuex'
import localStorage from './plugins/localStorage'
import { state } from './initialState'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: state,
	plugins: [localStorage],
	getters,
	mutations
});
