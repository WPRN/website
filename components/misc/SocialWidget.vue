<template>
  <v-fab-transition>
    <v-speed-dial
      v-model="fab"
      :top="$vuetify.breakpoint.mdAndUp"
      :bottom="$vuetify.breakpoint.smAndDown"
      :right="$vuetify.breakpoint.mdAndUp"
      :left="$vuetify.breakpoint.smAndDown"
      absolute
      :direction="$vuetify.breakpoint.mdAndUp?'bottom':'top'"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="blue darken-2"
          dark
          fab
        >
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-share-variant
          </v-icon>
        </v-btn>
      </template>
      <v-tooltip
        v-for="(social, index) in socialChannels"
        :key="index"
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn
            :small="$vuetify.breakpoint.smAndDown"
            :href="social.url"
            :color="social.color"
            target="_blank"
            fab
            dark
            v-on="on"
          >
            <v-icon :small="$vuetify.breakpoint.smAndDown">
              mdi-{{ social.icon }}
            </v-icon>
          </v-btn>
        </template>
        <span v-if="social.label !== 'Email'">Share this project on {{ social.label }}</span>
        <span v-else>Share this project by {{ social.label }}</span>
      </v-tooltip>
    </v-speed-dial>
  </v-fab-transition>
</template>
<script>
export default {
  props: {
    project: Object
  },
  data () {
    return {
      fab: false,

      /* TODO add linkedin */
      socialChannels: [
        {
          label: 'Facebook',
          icon: 'facebook',
          url:
            `${'https://www.facebook.com/sharer.php?u=' +
            'https://wprn.org/item/'}${
              this.project.pubId}`,
          color: '#3b5998'
        },
        {
          label: 'Twitter',
          icon: 'twitter',
          url:
            `https://twitter.com/share?url=https://wprn.org/item/${
              this.project.pubId
            }&text=Check this project "${
              this.project.name
            }" on WPRN : &via=WPRN&hashtags=WPRN`,
          color: 'rgb(29, 161, 242)'
        },
        {
          label: 'Email',
          icon: 'email',
          url:
            `mailto:?subject=WPRN Project&body=Hello,%0d%0a%0d%0aPlease check this project called ${
              this.project.name
            } on WPRN (World Pandemic Research Network) :%0d%0ahttps%3A%2F%2Fwprn.org%2Fitem%2F${
              this.project.pubId
            }%0d%0a%0d%0aBest regards,`,
          color: 'accent'
        }
      ]
    }
  }
}
</script>
