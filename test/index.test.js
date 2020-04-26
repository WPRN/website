import { resolve } from 'path'
import test from 'ava'
import { Nuxt, Builder } from 'nuxt'

// Nous gardons une référence à Nuxt pour fermer
// le serveur à la fin du test
let nuxt = null

// Initialiser Nuxt.js et démarrer l'écoute sur localhost:4000
test.before('Init Nuxt.js', async (t) => {
  const rootDir = resolve(__dirname, '..')
  let config = {}
  try { config = require(resolve(rootDir, 'nuxt.config.js')) } catch (e) { }
  config.rootDir = rootDir // dossier du projet
  config.dev = false // build de production
  config.mode = 'spa' // application isomorphique
  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  nuxt.listen(4000, 'localhost')
})

// Exemple de test uniquement sur le HTML généré
test('Route / exits and render HTML', async (t) => {
  const context = {}
  const { html } = await nuxt.renderRoute('/', context)
  t.true(html.includes('<h1 class="red">Hello World !</h1>'))
})

// Exemple de test via la vérification du DOM
test('Route / exits and render HTML with CSS applied', async (t) => {
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const element = window.document.querySelector('.red')
  t.not(element, null)
  t.is(element.textContent, 'Hello World !')
  t.is(element.className, 'red')
  t.is(window.getComputedStyle(element).color, 'red')
})

// Arrêter le serveur Nuxt
test.after('Closing server', (t) => {
  nuxt.close()
})
