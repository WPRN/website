<template>
  <v-dialog
    v-model="credits"
    scrollable
    max-width="700px"
    light
    @click:outside="$emit('closeCredits')"
  >
    <v-card>
      <v-card-title>
        <v-avatar small class="mr-3" tile color="grey lighten-5" size="72">
          <v-img contain max-height="100%" src="/logo.png"></v-img>
        </v-avatar>Credits
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('closeCredits')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-6 px-6 subtitle-1">
        WPRN (Word Pandemic Research Network) is a collective effort that originated from
        <a
          href="https://www.paris-iea.fr"
          target="_blank"
          rel="noopener noreferrer"
        >IAS Paris - IEA de Paris</a>.
      </v-card-text>
      <v-card-text class="subtitle-1">
        <b>Thanks</b> to all the contributors whose contribution and collective intelligence provides us all with this
        shared resource.
      </v-card-text>
      <v-card-text class="subtitle-1">This is a non-profit initiative. We welcome donations.</v-card-text>
      <v-card-subtitle class="subtitle-2 px-6">Institutional supports</v-card-subtitle>
      <v-card-text class="subtitle-1 px-6 mb-3">
        This project is sponsored by :
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
      <v-card-subtitle class="subtitle-2 px-6">Technical supports</v-card-subtitle>
      <v-card-text class="subtitle-1 px-6 mb-3">
        This website and logo have been designed by
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
        <a href="http://vuetifyjs.com" target="_blank" rel="noopener noreferrer">Vuetify</a>..
        <br />The logo is based on a SVG file downloaded from
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
        <br />The backend (work in progress) is built around a serverless/FAAS graphQL API made on top of
        <a
          href="https://aws.amazon.com/"
          target="_blank"
          rel="noopener noreferrer"
        >AWS ecosystem</a>. Its source code will not be released as it is based on a private service, but talks about making the API public in the upcoming weeks are in progress.
        <br />All the images used are free of rights (or distributed as such).
      </v-card-text>
      <v-card-text class="font-weight-light caption px-6 mb-3">
        <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
          <img
            alt="Creative Commons License"
            style="border-width:0"
            src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
          />
        </a>
        <br />
        <span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">WPRN</span> by
        <a
          xmlns:cc="http://creativecommons.org/ns#"
          href="https://wprn.org"
          property="cc:attributionName"
          rel="cc:attributionURL"
        >World Pandemic Research Network</a> is licensed under a
        <a
          rel="license"
          href="http://creativecommons.org/licenses/by-sa/4.0/"
        >Creative Commons Attribution-ShareAlike 4.0 International License</a>.
        <br />Based on a work at
        <a
          xmlns:dct="http://purl.org/dc/terms/"
          href="https://github.com/WPRN/website"
          rel="dct:source"
        >https://github.com/WPRN/website</a>.
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
