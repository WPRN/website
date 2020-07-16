<template>
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
        <!-- eslint-disable-next-line vue/singleline-html-element-content-newline -->
        <nuxt-link to="/#contact">contact WPRN</nuxt-link>.
      </v-overlay>
    </template>
    <template v-else>
      <v-col
        v-if="ready && project"
        cols="12"
        lg="10"
        offset-lg="1"
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
    <ContactDialog
      :id="project.pubId"
      :open="contact"
      @close="contact = false"
    />
  </v-row>
</template>
<script>
import * as queries from '~/graphql/queries'
import ContactDialog from '~/components/contact/ContactDialog'
import ProjectDetails from '~/components/projectList/ProjectDetails'
import gql from 'graphql-tag'
import client from '~/plugins/amplify'
import {
  zones
} from '~/assets/data'
export default {
  layout: 'page',
  components: {
    ContactDialog,
    ProjectDetails
  },
  data () {
    return {
      zones,
      error: false,
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
