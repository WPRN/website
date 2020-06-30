<template>
  <v-stepper
    v-model="formStep"
    v-intersect="onIntersect"
    dark
    alt-labels
  >
    <v-stepper-header>
      <v-stepper-step
        :complete="editMode || formStep > 1"
        step="1"
        :editable="editMode"
        :color="editMode && formStep === 1 ? 'light-blue accent-2' : 'primary'"
      >
        <span
          v-if="editMode && formStep === 1"
          style="text-decoration: underline;"
        >General info</span>
        <template v-else>
          General info
        </template>
      </v-stepper-step>
      <v-divider />
      <v-stepper-step
        :complete="editMode || formStep > 2"
        step="2"
        :editable="editMode"
        :color="editMode && formStep === 2 ? 'light-blue accent-2' : 'primary'"
      >
        <span
          v-if="editMode && formStep === 2"
          style="text-decoration: underline;"
        >Project details</span>
        <template v-else>
          Project details
        </template>
      </v-stepper-step>
      <v-divider />
      <v-stepper-step
        :complete="editMode || formStep > 3"
        step="3"
        :editable="editMode"
        :color="editMode && formStep === 3 ? 'light-blue accent-2' : 'primary'"
      >
        <span
          v-if="editMode && formStep === 3"
          style="text-decoration: underline;"
        >Location</span>
        <template v-else>
          Location
        </template>
      </v-stepper-step>
      <v-divider />
      <v-stepper-step
        :complete="editMode || formStep > 4"
        step="4"
        :editable="editMode"
        :color="editMode && formStep === 4 ? 'light-blue accent-2' : 'primary'"
      >
        <span
          v-if="editMode && formStep === 4"
          style="text-decoration: underline;"
        >Contact</span>
        <template v-else>
          Contact
        </template>
      </v-stepper-step>
      <v-divider />
      <v-stepper-step step="5">
        Confirmation
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items align="center">
      <!--  PROJECT GENERAL INFO (NAME, URL, DESCRIPTION) -->
      <general-info
        :editMode="editMode"
        :projectInput="projectInput"
        @nextStep="formStep = $event"
      />
      <!--  PROJECT DETAILS (FIELDS, TYPES, THEMATICS, STATE AND POSSIBLY DATE & TIME) -->
      <project-details
        :editMode="editMode"
        :projectInput="projectInput"
        :loading="loading"
        @nextStep="formStep = $event"
      />
      <!--  PROJECT LOCATION (ZONES, COUNTRIES, REGION) -->
      <project-location
        :editMode="editMode"
        :projectInput="projectInput"
        :loading="loading"
        @nextStep="formStep = $event"
      />
      <!--   CONTACT INFO -->
      <project-contact
        :editMode="editMode"
        :projectInput="projectInput"
        @nextStep="formStep = $event"
      />
      <!-- SUMMARY -->
      <project-summary
        :editMode="editMode"
        :projectInput="projectInput"
        :loading="loading"
        @nextStep="formStep = $event"
        @feedBackModal="FeedbackModal = true"
        @onSubmit="onsubmit()"
      />
      <feedback-modal
        :open="FeedbackModal"
        @cancel="FeedbackModal= false"
        @update="FeedbackModal= false;$store.commit('form/updateProject', {feedback: $event}); onSubmit()"
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
    projectInput: Object,
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
      /*       this.$emit("WorkInProgressDialogToggle"); */
      try {
        this.loading = true
        let args = this.$store.state.form.project

        args.recaptcha = await this.$recaptcha.getResponse()
        let res = {}
        if (this.editMode) {
          console.log('EDIT MODE', {
            ...args,
            pubId: this.$route.params.id,
            key: this.$route.params.key
          })

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
          res = await client.mutate({
            mutation: gql(newProject),
            variables: { input: args }
          })
        }

        if (res && !res.errors) {
          this.$emit('complete')
        } else {
          this.error = true
        }
        this.loading = false
        await this.$recaptcha.reset()
      } catch (error) {
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
