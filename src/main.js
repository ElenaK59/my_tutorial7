import './styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { useTasksStore } from '@/stores/useTasksStore'

const app = createApp(App)

app.use(createPinia())
app.mount('#app')

const store = useTasksStore()

store.$subscribe((_, state) => {
  localStorage.setItem('vue-tasks', JSON.stringify(state.tasks))
})
