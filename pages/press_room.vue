<template>
  <div>
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
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="6"
      >
        <v-card
          :class="{'pa-6 mb-6':$vuetify.breakpoint.mdAndUp}"
          flat
        >
          <v-card-title class="justify-center font-weight-black text-uppercase">
            Press releases
          </v-card-title>
          <v-card-text
            :class="{'pa-2':$vuetify.breakpoint.smAndDown}"
          >
            <v-list
              two-line
              subheader
            >
              <v-list-item
                href="/press_releases/launch_en.pdf"
                target="_blank"
                :class="{'pl-2':$vuetify.breakpoint.smAndDown}"
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
                :class="{'pl-2':$vuetify.breakpoint.smAndDown}"
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
        <v-card
          :class="{'pa-6 mb-6':$vuetify.breakpoint.mdAndUp}"
          flat
        >
          <v-card-title class="justify-center font-weight-black text-uppercase">
            Contact
          </v-card-title>
          <v-card-text
            :class="{'pa-2':$vuetify.breakpoint.smAndDown}"

            class="subtitle-1"
            color="black"
          >
            <v-list
              three-line
              subheader
              align="left"
            >
              <!--  <v-list-item
                :class="{'pl-2':$vuetify.breakpoint.smAndDown}"
              >
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
                      href="http://mediathena.fr/"
                      target="_blank"
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
              </v-list-item>-->
              <v-list-item
                :class="{'pl-2':$vuetify.breakpoint.smAndDown}"
              >
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
      <v-col
        cols="12"
        sm="12"
        md="6"
      >
        <v-card
          :class="{'pa-6 mb-6':$vuetify.breakpoint.mdAndUp}"
          flat
        >
          <v-card-title class="justify-center font-weight-black text-uppercase">
            Press Review
          </v-card-title>
          <v-card-text
            :class="{'pa-2':$vuetify.breakpoint.smAndDown}"
          >
            <v-list
              two-line
              subheader
            >
              <v-list-item
                href="https://www.eurekalert.org/pub_releases/2020-05/idad-low050420.php"
                target="_blank"
                :class="{'pl-2':$vuetify.breakpoint.smAndDown}"
              >
                <v-list-item-content>
                  <v-list-item-title>Eurekalert</v-list-item-title>
                  <v-list-item-subtitle>Launching of World Pandemic Research Network (WPRN) - 2020-04-20</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon>
                    <v-icon color="grey lighten-1" />
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-list-item
                href="https://www.researchprofessionalnews.com/rr-news-world-2020-5-social-researchers-push-global-collaboration-amidst-covid-19/"
                target="_blank"
                :class="{'pl-2':$vuetify.breakpoint.smAndDown}"
              >
                <v-list-item-content>
                  <v-list-item-title>Research Professional News</v-list-item-title>
                  <v-list-item-subtitle>Social researchers push global collaboration amidst Covid-19 - 2020-14-20</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon>
                    <v-icon color="grey lighten-1" />
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-list-item
                href="https://www.gazettelabo.fr/breves/9755Lancement-wprn-org-Covid19.html"
                target="_blank"
                :class="{'pl-2':$vuetify.breakpoint.smAndDown}"
              >
                <v-list-item-content>
                  <v-list-item-title>La Gazette du Labo</v-list-item-title>
                  <v-list-item-subtitle>Lancement de wprn.org, 1er répertoire mondial de recherches et ressources de recherche sur les impacts sociétaux et humains du Covid-19 - 2020-04-22</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon>
                    <v-icon color="grey lighten-1" />
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-list-item
                href="https://www.aefinfo.fr/acces-depeche/626458"
                target="_blank"
                :class="{'pl-2':$vuetify.breakpoint.smAndDown}"
              >
                <v-list-item-content>
                  <v-list-item-title>AEF Info</v-list-item-title>
                  <v-list-item-subtitle>Comment s’organise la réponse scientifique à la pandémie (2/2) : mise en réseau et partage des informations - 2020-04-28</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon>
                    <v-icon color="grey lighten-1" />
                  </v-btn>
                </v-list-item-action>
              </v-list-item>

              <v-list-item
                href="http://www.scienceeurope.org/our-priorities/covid-19/other-resources/"
                target="_blank"
                :class="{'pl-2':$vuetify.breakpoint.smAndDown}"
              >
                <v-list-item-content>
                  <v-list-item-title>Science Europe.org</v-list-item-title>
                  <v-list-item-subtitle>Other European and Global Resources - 2020-05-01</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon>
                    <v-icon color="grey lighten-1" />
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-list-item
                href="https://ec.europa.eu/jrc/communities/en/community/city-science-initiative/news/world-pandemic-research-network-wprn-global-real-time"
                target="_blank"
                :class="{'pl-2':$vuetify.breakpoint.smAndDown}"
              >
                <v-list-item-content>
                  <v-list-item-title>JCR Science Hub Communities - The European Commission’s science and Knowledge Newsletter</v-list-item-title>
                  <v-list-item-subtitle>World Pandemic Research Network (WPRN) A global, real-time directory of research & research resources on the impacts of the Covid-19 pandemic - 2020-05-19</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon>
                    <v-icon color="grey lighten-1" />
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-list-item
                href="http://www.cnrs.fr/fr/cnrsinfo/les-shs-doivent-eclairer-la-decision-publique-en-cette-periode-de-crise"
                target="_blank"
                :class="{'pl-2':$vuetify.breakpoint.smAndDown}"
              >
                <v-list-item-content>
                  <v-list-item-title>CNRS</v-list-item-title>
                  <v-list-item-subtitle>« Les SHS doivent éclairer la décision publique en cette période de crise » - 2020-05-19</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon>
                    <v-icon color="grey lighten-1" />
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-list-item
                href="https://education.newstank.fr/fr/tour/news/184099/comment-iea-paris-suscite-premier-reseau-collaboration-mondiale-shs.html"
                target="_blank"
                :class="{'pl-2':$vuetify.breakpoint.smAndDown}"
              >
                <v-list-item-content>
                  <v-list-item-title>Newstank</v-list-item-title>
                  <v-list-item-subtitle>Comment l’IEA de Paris a suscité le premier réseau de collaboration mondiale en SHS sur la pandémie - 2020-06-23</v-list-item-subtitle>
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
    </v-row>
  </div>
</template>
<script>
import BackButton from '~/components/navigation/BackButton'
import { socialIcons } from '~/assets/data'
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
  },
  mounted () {
    this.$store.commit('setTab', null)
  }

}
</script>
