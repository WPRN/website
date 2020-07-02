<template>
  <v-dialog
    v-model="open"
    width="700"
  >
    <template v-slot:activator="{ tooltip }">
      <v-tooltip bottom>
        <template
          v-slot:activator="{ on }"
          v-on="tooltip"
        >
          <v-btn
            outlined
            icon
            v-on="on"
            @click="open=true"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Click here if you want to remove your project</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-card-title>
        Remove your WPRN Project?
      </v-card-title>

      <v-card-text class="white--text body-1">
        <v-alert
          type="warning"
          :value="error"
          border="left"
          class="mx-3"
        >
          An error occured while removing your project. Please try again. If this error persists, contact us at <a href="mailto:contact@wprn.org">contact@wprn.org</a>.
        </v-alert>
        <p>
          If you remove your project from WPRN, it will be no longer available to the public.
        </p>
        <p>
          If you choose to proceed, your project will be immediatly removed for 2 weeks, then we will automatically delete it. During the first of those 2 weeks you can still contact us at <a href="mailto:contact@wprn.org">contact@wprn.org</a> if you changed your mind and wish to restore your project. <br>
        </p>  <p>
          Please type <i>remove</i> below to activate the remove project button.
        </p>
        <v-text-field
          v-model="deleteFlag"
          placeholder="remove"
          solo
          light
          class="my-2"
        />
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="accent"
          class="ma-3"
          @click="open=false"
        >
          Cancel
        </v-btn>
        <v-btn
          color="red"
          :loading="loading"
          :disabled="deleteFlag.trim().toLowerCase()!=='remove'"
          @click="removeThisProject()"
        >
          Remove my project from WPRN
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { removeProject } from '~/graphql/mutations'
import gql from 'graphql-tag'
import client from '~/plugins/amplify'

export default {
  data () {
    return {
      open: false,
      loading: false,
      error: false,
      deleteFlag: ''
    }
  },
  methods: {
    async removeThisProject () {
      try {
        this.loading = true
        const res = await client.mutate({
          mutation: gql(removeProject),
          variables: {
            id: this.$route.params.id,
            key: this.$route.params.key
          }
        })

        this.loading = false
        if (res && !res.errors) {
          this.$emit('projectRemoved')
        } else {
          this.error = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>
