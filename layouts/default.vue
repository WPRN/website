<template>
  <v-app v-scroll="onScroll">
    <TopBar
      @closeDrawer="drawer=!drawer"
    />
    <NavigationDrawer
      :drawer="drawer"
      @close="drawer = false"
      @register="$router.push({ path: '/', hash: 'register' });drawer=false"
      @about="$router.push({ path: '/', hash: 'about-us' });drawer=false"
      @list="$router.push({ path: '/search' });drawer=false"
    />
    <v-content>
      <nuxt />
      <recaptcha
        @error="onError"
        @success="onSuccess"
        @expired="onExpired"
      />
    </v-content>
    <recaptcha
      @error="onError"
      @success="onSuccess"
      @expired="onExpired"
    />
    <Footer @contact="$router.push({ path: '/', hash: 'contact-us' });drawer=false" />
    <v-fab-transition>
      <v-btn
        v-show="$store.state.offsetTop > 600"
        color="accent"
        dark
        fixed
        bottom
        right
        contained
        fab
        @click="$vuetify.goTo(0)"
      >
        <v-icon color="primary">
          mdi-arrow-up
        </v-icon>
      </v-btn>
    </v-fab-transition>
  </v-app>
</template>

<script>
import NavigationDrawer from '~/components/navigation/NavigationDrawer'
import TopBar from '~/components/navigation/TopBar'
import Footer from '~/components/navigation/Footer'

export default {
  components: { Footer, NavigationDrawer, TopBar },
  data () {
    return {
      drawer: false
    }
  },
  mounted () {
  },
  methods: {
    onError (error) { console.log(error) },
    onSuccess (token) {},
    onExpired () {},
    onScroll (e) {
      this.$store.commit('setOffsetTop', e.target.scrollingElement.scrollTop)
    }
  }
}
</script>
