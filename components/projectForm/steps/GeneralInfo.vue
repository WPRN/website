<template>
  <v-stepper-content step="1">
    <v-card
      flat
      min-height="320px"
      light
      color="#333333"
    >
      <v-form ref="step1">
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              ref="name"
              v-model="name"
              required
              label="Project Name*"
              solo
              type="text"
              :rules="nameRules"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              ref="url"
              v-model="url"
              label="Project URL"
              solo
              type="url"
              :rules="urlRules"
            />
          </v-col>

          <v-col cols="12">
            <v-expand-transition>
              <v-alert
                v-show="description.length > 0"
                type="error"
                align="left"
                color="white"
                width="100%"
                outlined
              >
                Please be specific in your Project and Team description. E.g. make explicit the project goal, research question, methods, data set, expected outcomes, team. Mention if you are looking for partners.
              </v-alert>
            </v-expand-transition>
            <v-textarea
              ref="description"
              v-model="description"
              required
              label="Project and Team description*"
              solo
              type="text"
              :rules="descriptionRules"
              counter="2000"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-btn
      color="accent"
      :disabled="
        editMode
          ? false
          : !(
            $refs.name &&
            $refs.name.valid &&
            $refs.url &&
            $refs.url.valid &&
            $refs.description &&
            $refs.description.valid
          )
      "
      x-large
      @click="$store.commit('form/updateProject', {name, url, description});$emit('nextStep', 2)"
    >
      Continue&nbsp;
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-stepper-content>
</template>
<script>
import { pattern } from '~/assets/regex'
export default {
  props: {
    projectInput: Object,
    editMode: Boolean
  },
  data () {
    return {
      name: this.editMode ? this.projectInput.name : '',
      url: this.editMode ? this.projectInput.url : '',
      description: this.editMode ? this.projectInput.description : '',
      nameRules: [
        (value) => !!value || 'Required.',
        (value) =>
          value.length >= 5 ||
        'The project name  must have at least 4 characters',
        (value) => value.length <= 140 || 'Max 140 characters',
        (value) => {
          return true
        }
      ],
      urlRules: [
        (value) => {
          return (
            !value ||
            value.length === 0 ||
            (value.length > 0 && pattern.test(value)) ||
            'Invalid URL.'
          )
        }
      ],
      descriptionRules: [
        (value) => !!value || 'A description is required.',
        (value) =>
          value.length >= 500 ||
        'The description must have at least 500 characters',
        (value) => value.length <= 2000 || 'Max 2000 characters'
      ]
    }
  }
}
</script>
