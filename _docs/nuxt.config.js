import theme from '@nuxt/content-theme-docs'

export default theme({
  docs: {
    primaryColor: '#00abd9',
  },
  content: {
    liveEdit: false
  },
  plugins: [require.resolve('./plugins/sevue.js')],
  css: [require.resolve('./style/style.scss'), 'boxicons/css/boxicons.min.css']
})
