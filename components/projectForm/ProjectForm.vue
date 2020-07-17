<template>
  <v-stepper
    v-model="formStep"
    v-intersect="onIntersect"
    dark
    alt-labels
  >
    <v-stepper-header>
      <v-stepper-step
        :complete="editMode || +formStep > 1"
        step="1"
        :color="editMode && +formStep === 1 ? 'light-blue accent-2' : 'primary'"
        :rules="[v => !$store.state.form.errors.general || 'Error']"
      >
        <span
          v-if="editMode && +formStep === 1"
          style="text-decoration: underline;"
        >General info</span>
        <template v-else>
          General info
        </template>
      </v-stepper-step>
      <v-divider />
      <v-stepper-step
        :complete="editMode || +formStep > 2"
        step="2"
        :color="editMode && +formStep === 2 ? 'light-blue accent-2' : 'primary'"
        :rules="[v => !$store.state.form.errors.details || 'Error']"
      >
        <span
          v-if="editMode && +formStep === 2"
          style="text-decoration: underline;"
        >Project details</span>
        <template v-else>
          Project details
        </template>
      </v-stepper-step>
      <v-divider />
      <v-stepper-step
        :complete="editMode || +formStep > 3"
        step="3"
        :color="editMode && +formStep === 3 ? 'light-blue accent-2' : 'primary'"
        :rules="[v => !$store.state.form.errors.location || 'Error']"
      >
        <span
          v-if="editMode && +formStep === 3"
          style="text-decoration: underline;"
        >Location</span>
        <template v-else>
          Location
        </template>
      </v-stepper-step>
      <v-divider />
      <v-stepper-step
        :complete="editMode || +formStep > 4"
        step="4"
        :color="editMode && +formStep === 4 ? 'light-blue accent-2' : 'primary'"
        :rules="[v => !$store.state.form.errors.contact || 'Error']"
      >
        <span
          v-if="editMode && +formStep === 4"
          style="text-decoration: underline;"
        >Contact &amp; Team</span>
        <template v-else>
          Contact &amp; Team
        </template>
      </v-stepper-step>
      <v-divider />
      <v-stepper-step
        step="5"
        :rules="[v => !$store.state.form.errors.summary || 'Error']"
      >
        Confirmation
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items align="center">
      <!--  PROJECT GENERAL INFO (NAME, URL, DESCRIPTION) -->
      <general-info
        :edit-mode="editMode"
        :project-input="projectInput"
        @nextStep="formStep = $event"
      />
      <!--  PROJECT DETAILS (FIELDS, TYPES, THEMATICS, STATE AND POSSIBLY DATE & TIME) -->
      <project-details
        :edit-mode="editMode"
        :project-input="projectInput"
        :loading="loading"
        @nextStep="formStep = $event"
      />
      <!--  PROJECT LOCATION (ZONES, COUNTRIES, REGION) -->
      <project-location
        :edit-mode="editMode"
        :project-input="projectInput"
        :loading="loading"
        @nextStep="formStep = $event"
      />
      <!--   CONTACT INFO -->
      <project-contact
        :edit-mode="editMode"
        :project-input="projectInput"
        @nextStep="formStep = $event"
      />
      <!-- SUMMARY -->
      <project-summary
        :edit-mode="editMode"
        :project-input="projectInput"
        :loading="loading"
        @nextStep="formStep = $event"
        @feedbackModal="FeedbackModal = true"
        @onSubmit="onSubmit()"
      />
      <feedback-modal
        :open="FeedbackModal"
        @cancel="FeedbackModal= false"
        @update="FeedbackModal= false;$store.commit('form/updateProject', {feedback: $event || ''}); onSubmit()"
      />
    </v-stepper-items>
  </v-stepper>
</template>
<script>
import { newProject, editProject } from '~/graphql/mutations'
import gql from 'graphql-tag'
import client from '~/plugins/amplify'
import GeneralInfo from '~/components/projectForm/steps/GeneralInfo'
import ProjectDetails from '~/components/projectForm/steps/Details'
import ProjectLocation from '~/components/projectForm/steps/Location'
import ProjectContact from '~/components/projectForm/steps/Contact'
import ProjectSummary from '~/components/projectForm/steps/Summary'
import FeedbackModal from '~/components/projectForm/FeedbackModal'
export default {
  components: {
    GeneralInfo,
    ProjectDetails,
    ProjectLocation,
    ProjectContact,
    ProjectSummary,
    FeedbackModal
  },
  props: {
    projectInput: {
      type: Object,
      default: () => {}
    },
    editMode: Boolean
  },
  data () {
    return {
      loading: false,
      FeedbackModal: false,
      formStep: 1
    }
  },
  async mounted () {
    await this.$recaptcha.init()
  },
  methods: {
    async onSubmit () {
      console.log('onSubmit: ')
      /*       this.$emit("WorkInProgressDialogToggle"); */
      // TODO move this into a store action
      try {
        this.loading = true
        const args = this.$store.state.form.project
        console.log('args: ', args)

        args.recaptcha = await this.$recaptcha.getResponse()
        let res = {}
        if (args.date && args.date.length === 0) delete args.date
        if (args.dates && args.dates.length === 0) delete args.dates
        if (args.time && args.time.length === 0) delete args.time
        if (args.team && args.team.length) {
          args.team.forEach(item => delete item.__typename)
        }
        if (this.editMode) {
          console.log('args: ', JSON.stringify({
            ...args,
            pubId: this.$route.params.id,
            key: this.$route.params.key
          }))
          res = await client.mutate({
            mutation: gql(editProject),
            variables: {
              input: {
                ...args,
                pubId: this.$route.params.id,
                key: this.$route.params.key
              }
            }
          })
        } else {
          delete args.feedback
          console.log('args: ', JSON.stringify(args))
          res = await client.mutate({
            mutation: gql(newProject),
            variables: { input: args }
          })
        }
        console.log(res)

        if (res && !res.errors) {
          this.$emit('complete')
        } else {
          this.error = true
        }
        this.loading = false
        await this.$recaptcha.reset()
      } catch (error) {
        console.log('error: ', error)
        this.error = true
        this.loading = false
        await this.$recaptcha.reset()
      }
    },
    onIntersect (entries, observer, isIntersecting) {
      this.$emit('intersect', 'REGISTER')
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    }
  }
}
</script>
<style scoped>
>>>.v-stepper__step
{
  flex-basis: 140px;
}
>>>.v-stepper__header .v-divider
{
  margin: 35px -65px 0;
}
>>>.v-stepper__label {
  text-align: center !important;
}
>>>.error--text .v-stepper__label {
  color: #dd2c00 !important;
  text-shadow: none !important;
}
</style>
