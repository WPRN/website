<template>
  <section id="stats">
    <v-parallax
      :height="$vuetify.breakpoint.smAndDown ? 700 : 500"
      src="/parallax_lg.jpg"
      srcset="parallax_sm.jpg 480w, parallax_md.jpg 600w, parallax_lg 800w.jpg"
    >
      <v-overlay
        absolute
        z-index="0"
        opacity="0.6"
      />
      <v-container
        fill-height
        style="z-index: 2;"
      >
        <v-row class="mx-auto">
          <v-col
            v-for="([value, append, title, url], i) of stats"
            :key="title"
            cols="12"
            md="4"
          >
            <nuxt-link
              class="text-center counter"
              :to="url"
              style="color:white;text-decoration:none;"
            >
              <div class="display-3 font-weight-black mb-4">
                <template v-if="tweened">
                  <span
                    class="display-3 font-weight-black mb-4"
                    v-text="value"
                  />
                </template>
                <template v-else>
                  <AnimatedInteger
                    :value="value"
                    :delay="(i + 1) * 800"
                    @finished="tweened = true"
                  />
                  <span class="display-3 font-weight-black mb-4">
                    {{
                      append
                    }}
                  </span>
                </template>
              </div>

              <div
                class="title font-weight-regular text-uppercase"
                v-text="title"
              />
            </nuxt-link>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>
  </section>
</template>
<script>
import AnimatedInteger from '~/components/mainPage/AnimatedInteger'
export default {
  components: {
    AnimatedInteger
  },
  data () {
    return {
      stats: [
        [500, '+', 'Projects', '/search'],
        [298, '', 'Contributing Institutions', '/institutions'],
        [111, '', 'Referents', '/referents']
      ],
      tweened: false
    }
  }
}
</script>
<style lang="scss">
/* .counter:hover {
  border: 3px solid $primary!important;
} */
</style>
