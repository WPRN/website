<template>
  <v-app>
    <v-container
      v-scroll="onScroll"
      app
      fill-height
      style="align-items: start;"
      :class="{ 'pr-0': $vuetify.breakpoint.smAndDown }"
    >
      <TopBar @closeDrawer="drawer=!drawer" />
      <NavigationDrawer
        :drawer="drawer"
        @close="drawer = false"
        @register="$router.push({ path: '/', hash: 'register' })"
        @about="$router.push({ path: '/', hash: 'about-us' })"
        @list="$router.push({ path: '/search' })"
      />
      <v-content v-scroll="onScroll">
        <nuxt />
      </v-content>
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
          @click="$vuetify.goTo('#content')"
        >
          <v-icon color="primary">
            mdi-arrow-up
          </v-icon>
        </v-btn>
      </v-fab-transition>
    </v-container>
    <recaptcha
      @error="onError"
      @success="onSuccess"
      @expired="onExpired"
    />
    <Footer />
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
