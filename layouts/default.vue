<template>
  <v-app>
    <nuxt />
    <recaptcha
      @error="onError"
      @success="onSuccess"
      @expired="onExpired"
    />
    <v-footer
      class="justify-center"
      color="#292929"
      :class="{ 'pb-4': $vuetify.breakpoint.smAndDown }"
    >
      <div class="title font-weight-light grey--text text--lighten-1 text-center">
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
            >
              <a
                :href="item.url"
                target="_blank"
                rel="noopener noreferrer"
                style="text-decoration: none;"
              >
                <v-icon color="white">mdi-{{ item.icon }}</v-icon>
              </a>
            </v-btn>
          </template>
          <span>{{ item.text }}</span>
        </v-tooltip>
        <br>
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
          <nuxt-link
            to="/privacy_policy"
            class="blue--text"
          >Privacy Policy</nuxt-link>&nbsp;-&nbsp;
          <nuxt-link
            to="/press_room"
            class="blue--text"
          >Press Room</nuxt-link>
        </span>

        <Credits
          :credits="showCredits"
          @closeCredits="showCredits = false"
        />
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import Credits from '~/components/navigation/Credits'
import {socialIcons} from '~/assets/data'
export default {
  components: { Credits },
  data () {
    return {
      showCredits: false,
      socialIcons
    }
  },
  methods: {
    onError (error) { console.log(error) },
    onSuccess (token) {},
    onExpired () {}
  }
}
</script>
