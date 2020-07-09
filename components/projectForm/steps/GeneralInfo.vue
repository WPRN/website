<template>
  <v-stepper-content step="1">
    <v-card
      flat
      min-height="320px"
      light
      color="transparent"
    >
      <v-form ref="generalForm">
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
            <v-select
              ref="type"
              v-model="type"
              :items="types"
              label="Project type(s)*"
              solo
              clearable
              multiple
              :rules="requiredRules"
            >
              <template v-slot:selection="{ item, index }">
                <div
                  v-if="index < 3"
                  class="v-select__selection v-select__selection--comma"
                >
                  {{ item }}
                  <template v-if="index < 2 && index < type.length-1">
                    ,
                  </template>
                </div>
                <span
                  v-if="index === 3"
                  class=" caption"
                >(+{{ type.length - 3 }} {{ type.length - 3 === 1 ?'other':'others' }})</span>
              </template>
            </v-select>
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
                Please be specific in your Project description. E.g. make explicit the project goal, research question, methods, data set, expected outcomes, team. Mention if you are looking for partners.
              </v-alert>
            </v-expand-transition>
            <v-textarea
              ref="description"
              v-model="description"
              required
              label="Project description*"
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
      color="primary"
      :disabled="
        editMode
          ? false
          : !(
            $refs.name &&
            $refs.name.valid &&
            $refs.type &&
            $refs.type.valid &&
            $refs.description &&
            $refs.description.valid
          )
      "
      x-large
      @click="$store.commit('form/updateProject', {name, type, description});$emit('nextStep', 2)"
    >
      Continue&nbsp;
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-stepper-content>
</template>
<script>
import {
  types
} from '~/assets/data'
export default {
  props: {
    projectInput: {
      type: Object,
      default: () => {}
    },
    editMode: Boolean
  },
  data () {
    return {
      types,
      name: this.editMode ? this.projectInput.name : '',
      type: this.editMode ? this.projectInput.type : '',
      description: this.editMode ? this.projectInput.description : '',
      nameRules: [
        (value) => !!value || 'Required.',
        (value) =>
          value.length >= 5 ||
        'The project name  must have at least 4 characters',
        (value) => value.length <= 140 || 'Max 140 characters'
      ],
      requiredRules: [
        (value) => !!value || 'This field is required.',
        (value) =>
          value === undefined ||
          value === true ||
          !!value.length ||
          'This field is required.'
      ],
      descriptionRules: [
        (value) => !!value || 'A description is required.',
        (value) =>
          value.length >= 500 ||
        'The description must have at least 500 characters',
        (value) => value.length <= 2000 || 'Max 2000 characters'
      ]
    }
  },
  mounted () {
    this.editMode && this.$refs.generalForm.validate()
  },
  updated () {
    this.editMode && this.$store.commit('form/setStepError', { id: 'general', value: !this.$refs.generalForm.validate() })
  }
}
</script>
<style scoped>
>>>.v-messages.theme--light:not(.error--text) + .theme--light.v-counter
{
  color: white;
}
</style>
