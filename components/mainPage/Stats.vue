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
            v-for="([value, append, title], i) of stats"
            :key="title"
            cols="12"
            md="3"
          >
            <div class="text-center">
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
            </div>
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
        [100, '+', 'Projects'],
        [172, '', 'Contributing Institutions'],
        [51, '', 'Referents'],
        [34, '', 'Disciplines']
      ],
      tweened: false
    }
  }
}
</script>
