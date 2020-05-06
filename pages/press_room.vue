<template>
  <v-row justify="center">
    <!--  BackButton takes one col -->
    <BackButton />
    <v-col
      cols="10"
      sm="10"
      md="8"
    >
      <h2 class="display-2 font-weight-bold my-3 text-uppercase text-center">
        Press Room
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
      class="text-center"
    >
      <v-tooltip
        v-for="(item, index) in socialIcons"
        :key="index"
        top
      >
        <template
          v-if="index>0"
          v-slot:activator="{ on }"
        >
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
    </v-col>
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
      align="center"
    >
      <nuxt-link to="/advisory_board">
        Advisory Board
      </nuxt-link>&nbsp;-&nbsp;
      <nuxt-link to="/referents">
        Referents
      </nuxt-link>&nbsp;-&nbsp;
      <nuxt-link to="/institutions">
        Contributors' Institutions
      </nuxt-link>
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="6"
    >
      <v-card
        class="pa-6 mb-6"
        flat
      >
        <v-card-title class="justify-center font-weight-black text-uppercase">
          Press releases
        </v-card-title>
        <v-card-text>
          <v-list
            two-line
            subheader
          >
            <v-list-item
              href="/press_releases/launch_en.pdf"
              target="_blank"
            >
              <v-list-item-avatar>
                <v-icon>mdi-file-pdf</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Launching of WPRN.org (English)</v-list-item-title>
                <v-list-item-subtitle>2020-04-20</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1" />
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item
              href="/press_releases/launch_fr.pdf"
              target="_blank"
            >
              <v-list-item-avatar>
                <v-icon>mdi-file-pdf</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Lancement de WPRN.org (French version)</v-list-item-title>
                <v-list-item-subtitle>2020-04-20</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1" />
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="6"
    >
      <v-card
        class="pa-6"
        flat
      >
        <v-card-title class="justify-center font-weight-black text-uppercase">
          Contacts
        </v-card-title>
        <v-card-text
          class="subtitle-1"
          color="black"
        >
          <v-list
            three-line
            subheader
            align="left"
          >
            <v-list-item>
              <v-list-item-avatar>
                <v-icon large>
                  mdi-account-circle
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  Martine Savary
                  <v-chip
                    small
                    label
                    class="ml-2"
                  >
                    Mediathena
                  </v-chip>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-icon color="grey">
                    mdi-phone
                  </v-icon>
                  <span
                    v-html="
                      '&nbsp;&#051;&#051;&#032;(&#048;)&#054;&#032;&#054;&#052;&#032;&#050;&#053;&#032;&#054;&#054;&#032;&#053;&#057;'
                    "
                  />
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <v-icon color="grey">
                    mdi-email
                  </v-icon>&nbsp;&#109;&#097;&#114;&#116;&#105;&#110;&#101;&#064;&#103;&#101;&#099;&#107;&#111;&#116;&#111;&#109;&#046;&#099;&#111;&#109;
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-avatar>
                <v-icon large>
                  mdi-account-circle
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Claire Jeandel</v-list-item-title>
                <v-list-item-subtitle>
                  <v-icon color="grey">
                    mdi-phone
                  </v-icon>&nbsp;+&#051;&#051;&#032;(&#048;)&#049;&#032;&#053;&#054;&#032;&#056;&#049;&#032;&#048;&#057;&#032;&#050;&#048;
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <v-icon color="grey">
                    mdi-email
                  </v-icon>&nbsp;&#099;&#108;&#097;&#105;&#114;&#101;&#046;&#106;&#101;&#097;&#110;&#100;&#101;&#108;&#064;&#112;&#097;&#114;&#105;&#115;&#045;&#105;&#101;&#097;&#046;&#102;&#114;
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import BackButton from '~/components/navigation/BackButton'
import {socialIcons} from '~/assets/data'
export default {
  layout: 'page',
  components: {
    BackButton
  },
  data () {
    return {
      contact: false,
      socialIcons
    }
  }

}
</script>
