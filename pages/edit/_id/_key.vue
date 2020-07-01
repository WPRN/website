<template>
  <v-row>
    <v-col cols="12">
      <v-overlay
        :value="checking"
        class="text-center headline"
      >
        <v-progress-circular
          class="mb-4"
          indeterminate
          size="64"
        />
        <br>Verifying your credentials
      </v-overlay>
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
          mdi-alert-circle-outline
        </v-icon>
        <br>An error happened during the verification. <br>You can try
        again and refresh this page or
        <nuxt-link to="/#contact">
          contact WPRN
        </nuxt-link>.
      </v-overlay>
      <v-fade-transition mode="out-in">
        <v-card
          flat
          min-height="320px"
          class="pa-4 text-left"
        >
          <v-card
            class="ml-3 mt-3 pb-3"
            flat
          >
            <v-card-title class=" headline">
              Edit your project
              <v-spacer />
              <delete-project-modal :project="project" />
            </v-card-title>
            <v-divider />
            <v-card-text
              class="pb-0 white--text align-center"
              justify="center"
            >
              <v-expand-transition v-if="ready">
                <v-row
                  no-gutters
                  justify="center"
                >
                  <v-col cols="12">
                    <ProjectForm
                      v-if="project && !done"
                      edit-mode
                      :project-input="project"
                      @complete="done = true"
                    />
                    <ProjectUpdatedWindow v-else />
                  </v-col>
                </v-row>
              </v-expand-transition>
            </v-card-text>
            <v-card-actions />
            <v-divider class="mt-3" />
          </v-card>
        </v-card>
      </v-fade-transition>
    </v-col>
  </v-row>
</template>
<script>
import ProjectForm from '~/components/projectForm/ProjectForm'
import ProjectUpdatedWindow from '~/components/projectForm/ProjectUpdatedWindow'
import DeleteProjectModal from '~/components/projectList/DeleteProjectModal'
import * as queries from '~/graphql/queries'
import gql from 'graphql-tag'
import client from '~/plugins/amplify'

export default {
  layout: 'page',
  components: {
    ProjectForm,
    ProjectUpdatedWindow,
    DeleteProjectModal
  },
  data () {
    return {
      project: false,
      ready: false,
      checking: true,
      error: false,
      done: false,
      deleting: false
    }
  },
  async mounted () {
    try {
      const res = await client.query({
        query: gql(queries.getProjectForEdit),
        variables: {
          id: this.$route.params.id,
          key: this.$route.params.key
        }
      })

      if (res && res.data && res.data.getProjectForEdit && !res.errors) {
        this.project = res.data.getProjectForEdit
        console.log('this.project: ', this.project)
        this.checking = false
        this.ready = true
      } else {
        this.ready = true
      }
    } catch (error) {
      this.error = true
      this.ready = true
    }
  },
  methods: {}
}
</script>
