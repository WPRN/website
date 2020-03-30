<template>
  <v-app>
    <nuxt />
    <v-footer class="justify-center" color="#292929" height="100">
      <div class="title font-weight-light grey--text text--lighten-1 text-center">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn text icon v-on="on">
              <a
                href="http://creativecommons.org/licenses/by-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <v-icon color="white">mdi-creative-commons</v-icon>
              </a>
            </v-btn>
          </template>
          <span>This website is licenced under Creative Commons</span>
        </v-tooltip>
        {{ new Date().getFullYear() }} - This website is maintained by
        <a
          href="https://www.paris-iea.fr/en"
          target="_blank"
          rel="noopener noreferrer"
        >IAS Paris</a>.
        <a style="text-decoration:underline;" @click="showCredits=true">See full credits</a>
        <Credits :credits="showCredits" @closeCredits="showCredits=false" />
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn text icon v-on="on">
              <a href="https://github.com/WPRN/website" target="_blank" rel="noopener noreferrer">
                <v-icon color="white">mdi-github</v-icon>
              </a>
            </v-btn>
          </template>
          <span>See this website source code and contribute</span>
        </v-tooltip>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import Credits from "~/components/navigation/Credits";
export default {
  data() {
    return {
      showCredits: false
    };
  },
  components: { Credits }
};
</script>
