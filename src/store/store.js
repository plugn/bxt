import Vue from 'vue'
import Vuex from 'vuex'
import localStorage from './plugins/localStorage'
import { state } from './initialState'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex);

const store = new Vuex.Store({
	plugins: [localStorage],
	state,
	getters,
	mutations
});

export default store;
