<template>
  <v-app v-scroll="onScroll">
    <TopBar
      v-if="$route.name!=='index'"
      @closeDrawer="drawer=!drawer"
    />
    <NavigationDrawer
      :drawer="drawer"
      @close="drawer = false"
      @register="$router.push({ path: '/', hash: 'register' })"
      @about="$router.push({ path: '/', hash: 'about-us' })"
      @list="$router.push({ path: '/search' })"
    />
    <v-main>
      <nuxt />
      <recaptcha
        @error="onError"
        @success="onSuccess"
        @expired="onExpired"
      />
    </v-main>
    <recaptcha
      @error="onError"
      @success="onSuccess"
      @expired="onExpired"
    />
    <Footer />
    <v-fab-transition>
      <v-btn
        v-show="offsetTop > 600"
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
      drawer: false,
      offsetTop: 0
    }
  },
  mounted () {
  },
  methods: {
    onError (error) { console.log(error) },
    onSuccess (token) {},
    onExpired () {},
    onScroll (e) {
      this.offsetTop = e.target.scrollingElement.scrollTop
    }
  }
}
</script>
