import DefaultTheme from 'vitepress/theme'
import ProtectedContent from './components/ProtectedContent.vue'
import ProjectShowcase from './components/ProjectShowcase.vue'
import Layout from './Layout.vue'
import './styles/index.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ProtectedContent', ProtectedContent)
    app.component('ProjectShowcase', ProjectShowcase)
  },
}
