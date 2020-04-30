<template>
  <v-container
    app
    fill-height
    :class="{ 'pr-0': $vuetify.breakpoint.smAndDown }"
    align-start
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
      <v-fab-transition>
        <v-btn
          v-show="!drawer"
          light
          absolute
          top
          right
          tile
          fab
          outlined
          class="mt-12 mr-0"
          x-large
          @click.stop="drawer = !drawer"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-app-bar>
    <NavigationDrawer
      :drawer="drawer"
      @close="drawer = false"
      @register="$router.push({ path: '/', hash: 'register' })"
      @about="$router.push({ path: '/', hash: 'about-us' })"
      @list="$router.push({ path: '/search' })"
    />
    <v-content>
      <v-row>
        <template
          v-if="
            ready &&
              (!project.status ||
                ['NEW', 'PENDING', 'REMOVED', 'BLOCKED'].includes(project.status))
          "
        >
          <v-overlay
            :value="error"
            class="text-center headline"
          >
            <div class="display-1">
              Sorry for the inconvenience!
            </div>
            <br>
            <v-icon
              x-large
              class="mb-3"
            >
              mdi-ladybug
            </v-icon>
            <br>This project is not available because its contact point email
            is not verified or because it has been removed.
            <br>Or it could
            just not be an existing project.
            <br>You can try again and refresh
            this page or
            <nuxt-link to="/#contact">
              contact WPRN
            </nuxt-link>.
          </v-overlay>
        </template>
        <template v-else>
          <v-col
            v-if="ready && project"
            cols="12"
          >
            <v-fade-transition mode="out-in">
              <ProjectDetails
                v-show="ready"
                :project="project"
                page-mode
                :filters="{ search: '' }"
                @contact="contact = true"
              />
            </v-fade-transition>
          </v-col>
        </template>
      </v-row>
    </v-content>
    <ContactDialog
      :id="project.pubId"
      :open="contact"
      @close="contact = false"
    />
  </v-container>
</template>
<script>
import * as queries from '~/graphql/queries'
import NavigationDrawer from '~/components/navigation/NavigationDrawer'
import ContactDialog from '~/components/contact/ContactDialog'
import ProjectDetails from '~/components/projectList/ProjectDetails'
import gql from 'graphql-tag'
import client from '~/plugins/amplify'
import {
  zones
} from '~/assets/data'
export default {
  components: {
    ContactDialog,
    NavigationDrawer,
    ProjectDetails
  },
  data () {
    return {
      zones,
      error: false,
      drawer: false,
      ready: false,
      project: false,
      contact: false
    }
  },
  async mounted () {
    try {
      const res = await client.query({
        query: gql(queries.getProject),
        variables: {
          pubId: this.$route.params.id
        }
      })

      if (res && res.data && res.data.getProject && !res.errors) {
        this.project = res.data.getProject
        this.ready = true
      } else {
        this.ready = true
      }
    } catch (error) {
      this.error = true
      this.ready = true
    }
  },
  methods: {},
  head () {
    return {
      meta: [
        {
          property: 'og:url',
          content: 'https://WPRN.org/item/' + this.project.pubId
        },
        { property: 'og:type', content: 'article' },
        {
          property: 'og:title',
          content: this.project.name
        },
        {
          property: 'og:description',
          content: this.project.description
        },
        { property: 'og:image', content: 'https://WPRN.org/logo.png' }
      ]
    }
  },
  jsonld () {
    return {
      '@context': 'http://schema.org',
      '@graph': [
        {
          '@id': 'WPRN-' + this.project.pubId,
          '@type': 'PublicationIssue',
          datePublished: this.project.createdAt,
          isPartOf: {
            '@id': '#wprn',
            '@type': ['Website', 'Organization'],
            name: 'World Pandemic Research Network',
            publisher: 'WPRN'
          }
        },
        {
          '@type': 'ScholarlyArticle',
          isPartOf: '#issue',
          description: this.project.description,
          sameAs: 'https://wprn.org/item/' + this.project.pubId,
          about: ['Works', 'Science', 'Virus'],
          name: this.project.name,
          author:
            this.project.contact_lastname +
            ', ' +
            this.project.contact_firstname
        }
      ]
    }
  }
}
</script>
