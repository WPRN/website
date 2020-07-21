<template>
  <v-footer
    class="justify-center"
    :class="{ 'pb-4': $vuetify.breakpoint.smAndDown }"
  >
    <div
    class="title font-weight-light text-center align-end"
    :class="{ 'grey--text text--lighten-1': $vuetify.theme.isDark }"
    >
    <div class="d-flex align-center justify-center">
        <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-switch
          class="mt-0 pa-0 inline-flex"
          v-model="$vuetify.theme.isDark"
          :false-value="true" :true-value="false"
          append-icon="mdi-brightness-5"
          prepend-icon="mdi-moon-waning-crescent"
          hide-details
          v-on="on"
          style="max-width:104px;line-height:36px;"
        ></v-switch>
      </template>
      <span>Toggle the dark mode</span>
    </v-tooltip>
    <v-divider vertical class="ml-2"></v-divider>
      <v-tooltip
        v-for="(item, index) in socialIcons"
        :key="index"
        top
      >
        <template v-slot:activator="{ on }">
          <v-btn
            text
            icon
            v-on="on"
            class=" d-inline-flex"
          >
            <a
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              style="text-decoration: none;"
            >
              <v-icon
              :color="$vuetify.theme.isDark?'white':'secondary'">mdi-{{ item.icon }}</v-icon>
            </a>
          </v-btn>
        </template>
        <span>{{ item.text }}</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn
            text
            icon
            v-on="on"
          >
            <a
              href="http://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              style="text-decoration: none;"
            >
              <v-icon color="white">mdi-creative-commons</v-icon>
            </a>
          </v-btn>
        </template>
        <span>This website is licenced under Creative Commons</span>
      </v-tooltip>
    </div>
      <span class="body-2">
        {{ new Date().getFullYear() }} - This website is maintained by
        <a
          class="blue--text"
          href="https://www.paris-iea.fr/en"
          target="_blank"
          rel="noopener noreferrer"
        >IAS Paris</a>.
        <br>
        <a
          style="text-decoration: underline;"
          class="blue--text"
          @click="showCredits = true"
        >See full credits</a>
        &nbsp;-&nbsp;
        <!-- eslint-disable-next-line vue/max-attributes-per-line -->
        <nuxt-link to="/privacy_policy" class="blue--text">Privacy Policy</nuxt-link>&nbsp;-&nbsp;
        <!-- eslint-disable-next-line vue/max-attributes-per-line -->
        <nuxt-link to="/press_room" class="blue--text">Press Room</nuxt-link>&nbsp;-&nbsp;
        <!-- eslint-disable-next-line vue/max-attributes-per-line -->
        <nuxt-link to="/resources">Resources</nuxt-link>&nbsp;-&nbsp;
        <span
          class="blue--text"
          style="text-decoration: underline;cursor:pointer;"
          @click="$store.commit('setTab', 3),$router.push({path:'/', hash:'contact-us'})"
        >Contact us</span>
      </span>

      <Credits
        :credits="showCredits"
        @closeCredits="showCredits = false"
      />
    </div>
  </v-footer>
</template>

<script>
import Credits from '~/components/navigation/Credits'
import { socialIcons } from '~/assets/data'
export default {
  components: { Credits },
  data () {
    return {
      showCredits: false,
      socialIcons
    }
  }
}
</script>
