<template>
  <v-row
    align="center"
    justify="center"
  >
    <!--  BackButton takes one col -->
    <BackButton url="/#who" />
    <v-col
      cols="10"
      sm="10"
      md="8"
    >
      <h2
        id="board"
        class="display-2 font-weight-bold my-3 text-uppercase text-center"
      >
        Supporting institutions
      </h2>
    </v-col>
    <v-col cols="1" />
    <v-col
      cols="12"
      sm="12"
      md="8"
    >
      <v-responsive
        class="mx-auto"
        width="56"
      >
        <v-divider class="mb-1" />
        <v-divider />
      </v-responsive>
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="8"
    >
      <v-expansion-panels popout>
        <v-expansion-panel
          v-for="(item,i) in institutions"
          :key="i"
        >
          <v-expansion-panel-header
            class="pa-1 "
          >
            <v-item v-slot:default="{}">
              <a
                :href="item.url"
                target="_blank"
                rel="noopener noreferrer"
                :title="item.name"
                :style="'background-color:' + item.color"
                style="flex: 0 1 auto;"
                class="pa-2 ma-1"
                width="100"
              >
                <v-img
                  :src="'/logos/' + item.image"
                  contain
                  :width="$vuetify.breakpoint.mdAndUp ? '100' : '75'"
                  height="60"
                  class="text-right pa-2"
                />
              </a>
            </v-item>
            <div class="title pa-3">
              {{ item.name }}
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="pa-3">
            {{ item.text }} <a
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              :title="item.name"
            >More.</a>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>

    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="10"
        offset-md="1"
      >
        <div class="text-center body-1">
          Becoming a partner institution is subject to the validation of the Scientific Advisory Board. <br>
          Contact <a href="mailto:partners@wprn.org">partners@wprn.org</a>
        </div>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="pa-3"
      >
        <v-card
          class="pa-6 "
          :flat="$vuetify.theme.isDark"
          height="100%"
        >
          <v-card-title
            class="justify-center font-weight-black text-uppercase text-center"
            style="cursor:pointer;"
            @click="$router.push({path:'/worldwide'})"
          >
            Why should my institution become partner?
          </v-card-title>
          <v-card-text
            class="subtitle-1 white--text title font-weight-regular"
            color="black"
          >
            <WhyInstitution />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="pa-3"
      >
        <v-card
          class="pa-6"
          :flat="$vuetify.theme.isDark"
          height="100%"
        >
          <v-card-title
            class="justify-center font-weight-black text-uppercase text-center"
            style="cursor:pointer;"
            @click="$router.push({path:'/worldwide'})"
          >
            How do my institution become partner?
          </v-card-title>
          <v-card-text
            class="subtitle-1  white--text title font-weight-regular"
            color="black"
          >
            <HowInstitution />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-row>
</template>
<script>
import { institutions } from '~/assets/data'
import BackButton from '~/components/navigation/BackButton'
import HowInstitution from '~/components/contentBlocks/HowInstitution'
import WhyInstitution from '~/components/contentBlocks/WhyInstitution'
export default {
  layout: 'page',
  components: {
    BackButton,
    HowInstitution,
    WhyInstitution
  },
  data () {
    return {
      institutions
    }
  },
  mounted () {
    this.$store.commit('setTab', null)
  }
}
</script>
