import Vue from 'vue';
import App from './App.vue';

// Vue 2.7 doesn't strictly require createApp but it's good practice to keep structure clean
// Standard Vue 2 mount
new Vue({
  render: (h) => h(App),
}).$mount('#app');
