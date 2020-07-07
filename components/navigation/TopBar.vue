<template>
  <v-app-bar
    app
    color="white"
    height="80"
    elevate-on-scroll
    elevation-3
    :inverted-scroll="$route.name==='index'"
  >
    <v-btn
      text
      class="mx-0 px-0"
      height="auto"
      @click="$router.push({ path: '/' })"
    >
      <v-avatar
        class="mr-3"
        tile
        color="grey lighten-5"
        size="72"
      >
        <v-img
          contain
          max-height="100%"
          src="/logo.png"
        />
      </v-avatar>
    </v-btn>

    <v-spacer />
    <v-tabs
      v-if="$vuetify.breakpoint.mdAndUp"
      id="main-app-bar"
      v-model="tab"
      light
      right
      :optional="!tab"
      slider-size="8"
      active-class="text--blue"
      s
      @change="updateStore($event)"
    >
      <v-tab
        nuxt
        active-class="text--blue"
        class="font-weight-bold"
        min-width="96"
        text
        :class="{'v-tab--active': $store.state.tab===0}"
        @click="$route.name==='index'?scrollTo('#about-us'):$router.push({path:'/', hash:'#about-us'})"
      >
        About WPRN
      </v-tab>
      <v-tab
        nuxt
        active-class="text--blue"
        class="font-weight-bold"
        min-width="96"
        text
        :class="{'v-tab--active': $store.state.tab===1}"
        @click="$route.name==='index'?scrollTo('#register'):$router.push({path:'/', hash:'#register'})"
      >
        Register your project
      </v-tab>
      <v-tab
        nuxt
        active-class="text--blue"
        class="font-weight-bold"
        min-width="96"
        text
        to="/search"
      >
        Browse projects
      </v-tab>
    </v-tabs>
    <v-btn
      v-show="$vuetify.breakpoint.smAndDown"
      :class="{'v-tab--active': $store.state.tab===2}"
      light
      tile
      outlined
      class="pa-0 mb-0 ml-0 mt-0 mr-1"
      width="72"
      height="72"
      @click.stop="$emit('closeDrawer')"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  props: {
  },
  computed: {
    tab: {
      get () {
        return this.$store.state.tab
      },
      set (newValue) {
        return this.$store.commit('setTab', newValue)
      }
    }
  },
  methods: {
    updateStore (value) {
      this.$store.commit('setTab', value)
    },
    scrollTo (value) {
      this.$store.commit('lockScrolling')
      this.$vuetify.goTo(value)
      setTimeout(() => { this.$store.commit('unlockScrolling') }, 500)
    }
  }
}
</script>
