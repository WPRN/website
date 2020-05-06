<template>
  <v-app>
    <nuxt />
    <recaptcha
      @error="onError"
      @success="onSuccess"
      @expired="onExpired"
    />
    <Footer />
  </v-app>
</template>

<script>
import Footer from '~/components/navigation/Footer'
export default {
  components: { Footer },
  data () {
    return {
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
