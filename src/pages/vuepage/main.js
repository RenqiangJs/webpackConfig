import Vue from 'vue';
import App from './index.vue';
let v = new Vue({
	el: '#root',
	render: h => h(App),
	comments: true,
});
