import { createApp } from 'vue'
import App from './App.vue'

var abc = {a: 1, b: 2}
var data = Object.assign({c: 3}, abc)
console.log(data)

createApp(App).mount('#app')


