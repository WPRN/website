<template>
  <v-container
    app
    fill-height
    style="align-items: start;"
    :class="{ 'pr-0': $vuetify.breakpoint.smAndDown }"
  >
    <v-app-bar
      app
      color="white"
      height="100"
      elevate-on-scroll
      elevation-3
    >
      <v-btn
        text
        class="mx-0 px-0"
        height="auto"
        @click="$router.push({ path: '/' })"
      >
        <v-avatar
          class="mr-3"
          tile
          color="grey lighten-5"
          size="72"
        >
          <v-img
            contain
            max-height="100%"
            src="/logo.png"
          />
        </v-avatar>
      </v-btn>

      <v-spacer />
      <v-btn
        light
        tile
        outlined
        class="pa-0 mb-0 ml-0 mt-1 mr-1"
        width="72"
        height="72"
        @click.stop="drawer = !drawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <NavigationDrawer
      :drawer="drawer"
      @close="drawer = false"
      @contact="$router.push({ path: '/', hash: 'contact' })"
      @register="$router.push({ path: '/', hash: 'register' })"
      @about="$router.push({ path: '/', hash: 'about-us' })"
      @featured="$router.push({ path: '/', hash: 'featured' })"
      @list="$router.push({ path: '/search' })"
    />
    <v-content v-scroll="onScroll">
      <v-container id="content">
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="1">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <nuxt-link to="/#featured">
                  <v-btn
                    fab
                    icon
                    large
                    class="mr-2"
                    v-on="on"
                  >
                    <v-icon large>
                      mdi-arrow-left
                    </v-icon>
                  </v-btn>
                </nuxt-link>
              </template>
              <span>Back to the main page</span>
            </v-tooltip>
          </v-col>
          <v-col
            cols="10"
            sm="10"
            md="8"
          >
            <h2
              class="display-2 font-weight-bold my-3 text-uppercase text-center"
            >
              Psychological and social impact of covid-19
            </h2>
          </v-col>
          <v-col cols="1" />
          <v-col
            cols="12"
            sm="12"
            md="8"
          >
            <v-responsive
              class="mx-auto mb-12"
              width="56"
            >
              <v-divider class="mb-1" />
              <v-divider />
            </v-responsive>
            <v-img
              src="/social.jpg"
              class="mb-4"
              height="275"
              max-width="100%"
              lazy-src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gIcSUNDX1BST0ZJTEUAAQEAAAIMbGNtcwIQAABtbnRyUkdCIFhZWiAH3AABABkAAwApADlhY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApkZXNjAAAA/AAAAF5jcHJ0AAABXAAAAAt3dHB0AAABaAAAABRia3B0AAABfAAAABRyWFlaAAABkAAAABRnWFlaAAABpAAAABRiWFlaAAABuAAAABRyVFJDAAABzAAAAEBnVFJDAAABzAAAAEBiVFJDAAABzAAAAEBkZXNjAAAAAAAAAANjMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB0ZXh0AAAAAElYAABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAAADFgAAAzMAAAKkWFlaIAAAAAAAAG+iAAA49QAAA5BYWVogAAAAAAAAYpkAALeFAAAY2lhZWiAAAAAAAAAkoAAAD4QAALbPY3VydgAAAAAAAAAaAAAAywHJA2MFkghrC/YQPxVRGzQh8SmQMhg7kkYFUXdd7WtwegWJsZp8rGm/fdPD6TD////bAEMACQYGCAYFCQgHCAoJCQoNFg4NDAwNGhMUEBYfHCEgHxweHiMnMiojJS8lHh4rOywvMzU4ODghKj1BPDZBMjc4Nf/bAEMBCQoKDQsNGQ4OGTUkHiQ1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1Nf/AABEIABEAGgMBIgACEQEDEQH/xAAZAAACAwEAAAAAAAAAAAAAAAAAAwIEBQb/xAAvEAACAQMDAQYDCQAAAAAAAAABAgMABBEFEiExBhMUIkFhMzVyNFJzgZGhsbLB/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEAP/EAB0RAAMAAgIDAAAAAAAAAAAAAAABAhEyA3ESITH/2gAMAwEAAhEDEQA/ANC07R38d3eS+LeNopmVo3TdGZCMjzfdwc+nIFWLm/1efVNNnlV3YJMjxRDbGTtyhfnn8qUst5b3s63No72uUWMBCcnAGQR16nk8cGrVqupXurKmp2sPhoGLI2F5Pp0Ofetmqy6YFMQkpRlSdnhd6yIZdNs0tm272RMOBjnac5HOf0roYrzU4oUSPR1VFUBVDDgD06VS1iGZ9Wjl7t5I2A7wxsSIsAnzexx+9bUTB4UYC6QMoO3cOPbrTQ8IXknyfslN9ij+kf5S2+MaKKlWqKl9Yi3+XXv1SfxSdN+V2v4Kf1FFFGtZ6Gje+z//2Q=="
            />
            <v-card>
              <v-card-text>This page content will be available shortly</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-fab-transition>
      <v-btn
        v-show="offsetTop > 600"
        color="accent"
        dark
        fixed
        bottom
        right
        contained
        fab
        @click="$vuetify.goTo('#content')"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>
<script>
import NavigationDrawer from '~/components/navigation/NavigationDrawer'
export default {
  components: {
    NavigationDrawer
  },
  data () {
    return {
      drawer: false,
      offsetTop: 0
    }
  },
  methods: {
    onScroll (e) {
      this.offsetTop = e.target.scrollingElement.scrollTop
    }
  }
}
</script>
