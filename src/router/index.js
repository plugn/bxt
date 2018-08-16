import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import List from '@/components/List';
import Editor from '@/components/Editor';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'List',
			component: List
		},
		{
			path: '/edit/:id?',
			name: 'Edit',
			component: Editor
		}
	]
});
