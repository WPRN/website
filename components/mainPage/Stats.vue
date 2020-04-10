<template>
  <section id="stats">
    <v-parallax
      :height="$vuetify.breakpoint.smAndDown ? 700 : 500"
      src="/parallax_lg.jpg"
      srcset="parallax_sm.jpg 480w, parallax_md.jpg 600w, parallax_lg 800w.jpg"
    >
      <v-overlay absolute z-index="0" opacity="0.6"></v-overlay>
      <v-container fill-height style="z-index:2;">
        <v-row class="mx-auto">
          <v-col v-for="[value, title] of stats" :key="title" cols="12" md="3">
            <div class="text-center">
              <div class="display-3 font-weight-black mb-4" v-text="value"></div>

              <div class="title font-weight-regular text-uppercase" v-text="title"></div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>
  </section>
</template>
<script>
export default {
  data() {
    return {
      stats: [
        ["XXX", "Projects"],
        ["XX", "Contributing Institutions"],
        ["XX", "Referents"],
        ["34", "Disciplines"]
      ]
    };
  }
};
</script>
