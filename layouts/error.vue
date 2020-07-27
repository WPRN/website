<template>
  <v-app dark>
    <v-overlay
      :value="error"
      class="text-center headline"
    >
      <div class="display-1">
        Sorry for the inconvenience!
      </div>
      <v-responsive
        class="mx-auto"
        width="56"
      >
        <v-divider class="mb-1 mt-3" />
        <v-divider class="mb-3" />
      </v-responsive>
      <br>
      <v-icon
        v-if="error.statusCode === 404"
        x-large
        class="mb-3"
      >
        mdi-link-variant-off
      </v-icon>
      <v-icon
        v-else
        x-large
        class="mb-3"
      >
        mdi-ladybug
      </v-icon>
      <br>
      <template v-if="error.statusCode === 404">
        This page does not exist. <br>
        <div class="body-1 mt-3">
          <NuxtLink to="/">
            Go back to WPRN Home page
          </NuxtLink>
        </div>
      </template>
      <template v-else>
        An error happened while loading this page. <br>You can try again and refresh
        this page or
        <nuxt-link to="/#contact-us">
          contact WPRN
        </nuxt-link> to report this error.
      </template>
    </v-overlay>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
