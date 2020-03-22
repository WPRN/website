<template>
  <v-dialog v-model="credits" scrollable max-width="600px" light>
    <v-card>
      <v-card-title>
        <v-avatar small class="mr-3" tile color="grey lighten-5" size="72">
          <v-img contain max-height="100%" src="/website/logo.png"></v-img>
        </v-avatar>Credits
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-6 px-6 subtitle-1">
        WPRN is a collective effort that originated from
        <a
          href="https://www.paris-iea.fr"
          target="_blank"
          rel="noopener noreferrer"
        >IAS Paris - IEA de Paris</a>.
      </v-card-text>
      <v-card-text class="subtitle-1 px-6">
        <b>Institutional supports</b>
        <br />This project is supported by :
        <ul>
          <li>
            <a
              href="https://www.paris-iea.fr"
              target="_blank"
              rel="noopener noreferrer"
            >IAS Paris - IEA de Paris</a>.
          </li>
          <li>
            <a href="http://" target="_blank" rel="noopener noreferrer">partner name</a>
          </li>
          <li></li>
        </ul>
      </v-card-text>
      <v-card-text class="subtitle-1 px-6">
        <b>Technical supports</b>
        <br />This website and logo have been designed by
        <a
          href="https://github.com/Billybobbonnet"
          target="_blank"
          rel="noopener noreferrer"
        >Antoine Cordelois</a>.
        The frontend is static/lambda-generated and is powered by
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >Nuxt</a> and
        <a href="http://vuetifyjs.com" target="_blank" rel="noopener noreferrer">Vuetify</a>. It is hosted on
        <a
          href="https://pages.github.com/"
          target="_blank"
          rel="noopener noreferrer"
        >Github Pages</a>.
        <br />The logo is based on an SVG file downloaded from
        <a
          href="https://thenounproject.com"
          target="_blank"
          rel="noopener noreferrer"
        >thenounproject.com</a> named "Globe" by
        <a
          href="https://thenounproject.com/nguyenthanhthuydesign/"
          target="_blank"
          rel="noopener noreferrer"
        >NTT</a>
        <br />The backend (work in progress) is built around a serverless graphQL API made with
        <a
          href="https://aws.amazon.com/amplify/"
          target="_blank"
          rel="noopener noreferrer"
        >AWS Amplify</a>. Its source code will not be released as it is a private service, but the API will be made public in the upcoming weeks.
        <br />All the images used are pictures free of rights (or distributed as such).
        <br />This frontend is licenced under Creative Commons
        <v-icon small>mdi-creative-commons</v-icon>&nbsp;and its source code is available
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
        >here</a>
        .
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('closeCredits')">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    credits: false
  }
};
</script>
