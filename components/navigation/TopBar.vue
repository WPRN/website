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
      v-model="value"
      light
      right
      :optional="!value"
      slider-size="8"
    >
      <v-tab
        to="/#about-us"
        nuxt
        active-class="text--blue"
        class="font-weight-bold"
        min-width="96"
        text
      >
        About WPRN
      </v-tab>
      <v-tab
        to="/#register"
        nuxt
        active-class="text--blue"
        class="font-weight-bold"
        min-width="96"
        text
      >
        Register your project
      </v-tab>
      <v-tab
        to="/search"
        nuxt
        active-class="text--blue"
        class="font-weight-bold"
        min-width="96"
        text
      >
        Browse projects
      </v-tab>
    </v-tabs>
    <v-btn
      v-show="$vuetify.breakpoint.smAndDown"
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
    value: {
      type: [String, Boolean],
      required: false,
      default: false
    }
  }
}
</script>
