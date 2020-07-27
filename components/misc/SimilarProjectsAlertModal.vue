<template>
  <v-dialog
    v-model="open"
    max-width="800"
    persistent
  >
    <v-card>
      <v-card-title>
        Subscribe to an email alert for similar projects
      </v-card-title>
      <v-divider />
      <v-card-text class="white--text body-1 mt-3">
        <v-alert
          type="warning"
          :value="errorFlag"
          border="left"
          class="mx-3"
        >
          An error occured while creating the alert. Please try again later. If this error persists, contact us at <a href="mailto:referents@wprn.org">referents@wprn.org</a>.
        </v-alert>
        <v-alert
          type="info"
          align="left"
          color="gray lighten-4"
        >
          Project similarity email alerts are always related to a reference project and can be edited or disabled on that project edit page.
        </v-alert>
        <p>
          What are the <b>similarities</b> with your project that we should consider when generating your email alerts?
        </p>
        <v-row no-gutters>
          <v-col
            cols="12"
            md="6"
            lg="4"
            xl="3"
          >
            <v-checkbox
              v-model="criterions.field"
              label="Disciplines"
              hint="e.g. History, Social Sciences..."
              persistent-hint
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
            lg="4"
            xl="3"
          >
            <v-checkbox
              v-model="criterions.thematics"
              label="Thematics"
              hint="e.g. Gender studies, Education..."
              persistent-hint
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
            lg="4"
            xl="3"
          >
            <v-checkbox
              v-model="criterions.types"
              label="Type"
              hint="e.g. Qualitative study, survey..."
              persistent-hint
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
            lg="4"
            xl="3"
          >
            <v-checkbox
              v-model="criterions.institution"
              label="Institution"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
            lg="4"
            xl="3"
          >
            <v-checkbox
              v-model="criterions.title"
              label="Title"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
            lg="4"
            xl="3"
          >
            <v-checkbox
              v-model="criterions.description"
              label="Description"
            />
          </v-col>
        </v-row>
        <v-divider class="mb-3" />
        <p>At which frequency do you want us to send you this alert emails? </p>
        <v-select
          v-model="frequency"
          :items="frequencies"
          label="Emails frequency"
          solo
          hint="Note that we will not send the alert email if no project matches your similarity settings in the timespan you chose."
          persistent-hint
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="accent"
          class="ma-2"
          @click="$emit('close')"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          class="ma-2"
          :loading="loading"
          :disabled="!frequency&&Object.values(criterions).every(x => (x === false || x === null))"
          @click="subscribe()"
        >
          Subscribe to this alert&nbsp;<v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: true
    },
    project: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      loading: false,
      errorFlag: false,
      criterions: {
        types: false,
        field: true,
        thematics: true,
        institution: false,
        description: false,
        title: false
      },
      frequencies: [
        'Daily',
        'Weekly',
        'Every 2 weeks',
        'Monthly'
      ],
      frequency: null
    }
  },
  methods: {
    async subscribe () {
      try {
        this.loading = true
        await this.$store.dispatch('project/updateProject',
          {
            mode: 'edit',
            id: this.project.pubId,
            text: this.feedback
          })

        this.loading = false
        this.$store.dispatch('toast', 'Your edit request has been sent.')
        if (this.$route.name === 'pending-id') {
          this.$router.push({ path: '/pending' })
        }
      } catch (error) {
        this.errorFlag = true
      }
    }
  }
}
</script>
