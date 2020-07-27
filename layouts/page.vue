<template>
  <v-app>
    <v-container
      v-scroll="onScroll"
      app
      fill-height
      style="align-items: start;"
    >
      <TopBar @closeDrawer="drawer=!drawer" />
      <NavigationDrawer
        :drawer="drawer"
        @close="drawer = false"
        @register="$router.push({ path: '/', hash: 'register' })"
        @about="$router.push({ path: '/', hash: 'about-us' })"
        @list="$router.push({ path: '/search' })"
      />
      <v-main v-scroll="onScroll">
        <nuxt />
      </v-main>
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
    </v-container>
    <recaptcha
      @error="onError"
      @success="onSuccess"
      @expired="onExpired"
    />
    <Footer
      @contact="$router.push({ path: '/', hash: 'contact-us' });drawer=false"
    />
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
  watch: {
    '$store.state.tab': function () {
      if (this.$store.state.tab !== null) this.updateScroll()
    }
  },
  mounted () {
    this.$store.commit('setTab', null)
  },
  methods: {
    onError (error) { console.log(error) },
    onSuccess (token) {},
    onExpired () {},
    onScroll (e) {
      this.offsetTop = e.target.scrollingElement.scrollTop
    },
    updateScroll () {
      console.log('UPDATE SCROLL FROM PAG LAYOUT')
      switch (this.$store.state.tab) {
        case 0:
          this.$router.push('/#about-us')
          break
        case 1:
          this.$router.push('/#register')
          break
        case 2:
          this.$router.push('/search')
          break
      }
      console.log('tab', this.$store.state.tab)
    }
  }
}
</script>
