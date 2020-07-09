<template>
  <v-stepper-content step="2">
    <v-card
      flat
      min-height="320px"
      light
      color="transparent"
    >
      <v-form
        ref="detailsForm"
        lazy-validation
      >
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-combobox
              ref="field"
              v-model="field"
              :items="fields"
              label="Project discipline(s)*"
              solo
              clearable
              multiple
              :rules="requiredRules"
              @change="cleanModel('field')"
            >
              <template v-slot:selection="{ item, index }">
                <div
                  v-if="index < 3"
                  class="v-select__selection v-select__selection--comma"
                >
                  {{ item }}
                  <template v-if="index < 2 && index < field.length-1">
                    ,
                  </template>
                </div>
                <span
                  v-if="index === 3"
                  class="caption"
                >(+{{ field.length - 3 }} {{ field.length - 3 === 1 ?'other':'others' }})</span>
              </template>
            </v-combobox>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-select
              ref="thematics"
              v-model="selectedThematics"
              :items="thematics"
              label="Project Thematic(s)"
              solo
              clearable
              multiple
              @change="cleanModel('selectedThematics')"
            >
              <template v-slot:selection="{ item, index }">
                <div
                  v-if="index < 3"
                  class="v-select__selection v-select__selection--comma"
                >
                  {{ item }}
                  <template v-if="index < 2 && index < selectedThematics.length-1">
                    ,
                  </template>
                </div>
                <span
                  v-if="index === 3"
                  class="caption"
                >(+{{ selectedThematics.length - 3 }} {{ selectedThematics.length - 3 === 1 ?'other':'others' }})</span>
              </template>
            </v-select>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-select
              ref="state"
              v-model="selectedState"
              :items="state"
              label="Project Status*"
              solo
              :rules="requiredRules"
              :disabled="loading"
            />
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              ref="url"
              v-model="url"
              :label="extendedTypes.some(item => item.urlMandatory && $store.state.form.project.type.includes(item.name))?'Project URL*':'Project URL'"
              solo
              type="url"
              :rules="extendedTypes.some(item => item.urlMandatory && this.$store.state.form.project.type.includes(item.name))?mandatoryUrlRules:urlRules"
            />
          </v-col>
          <template v-if="isDateTime() && !isTimeInterval()">
            <v-col
              cols="12"
              md="6"
            >
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    ref="date"
                    v-model="date"
                    label="Project Date*"
                    prepend-inner-icon="mdi-calendar-check"
                    readonly
                    solo
                    :rules="requiredRules"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="date"
                  no-title
                  scrollable
                  color="primary"
                  show-current
                >
                  <v-spacer />
                  <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(date)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                ref="time"
                v-model="time"
                label="Project Time Info"
                prepend-inner-icon="mdi-clock-outline"
                solo
                type="text"
                counter="150"
                :rules="timeInformationsRules"
              />
            </v-col>
          </template>
          <template v-if="isTimeInterval()">
            <v-col
              cols="12"
              md="6"
            >
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                return-value.sync="dates"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    ref="dates"
                    v-model="dateRangeText"
                    label="Project Dates*"
                    prepend-inner-icon="mdi-calendar-check"
                    readonly
                    solo
                    :rules="requiredRules"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="dates"
                  range
                  no-title
                  scrollable
                  color="primary"
                  show-current
                >
                  <v-spacer />
                  <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(dates)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                ref="time"
                v-model="time"
                label="Project Time Info"
                prepend-inner-icon="mdi-clock-outline"
                solo
                type="text"
                counter="150"
                :rules="timeInformationsRules"
              />
            </v-col>
          </template>
        </v-row>
      </v-form>
    </v-card>
    <v-btn
      text
      @click="$store.commit('form/updateProject', {field, state: selectedState, thematics: selectedThematics, url, date, dates, time});$emit('nextStep', 1)"
    >
      Previous
    </v-btn>
    <v-btn
      color="primary"
      :disabled="!(
        $refs.field &&
        $refs.field.valid &&
        $refs.state &&
        $refs.state.valid &&
        $refs.url &&
        $refs.url.valid &&
        (isDateTime() && !isTimeInterval() ? $refs.date && $refs.date.valid : true) &&
        (isTimeInterval() ? $refs.dates && $refs.dates.valid : true) &&
        (isDateTime() || isTimeInterval() ? $refs.time && $refs.time.valid : true)
      )"
      x-large
      @click="$store.commit('form/updateProject', {field, state: selectedState, thematics: selectedThematics, url, date, dates, time});$emit('nextStep', 3)"
    >
      Continue&nbsp;
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-stepper-content>
</template>
<script>
import {
  fields,
  thematics,
  state,
  extendedTypes
} from '~/assets/data'
import { pattern } from '~/assets/regex'
export default {
  props: {
    projectInput: {
      type: Object,
      default: () => {}
    },
    editMode: Boolean,
    loading: Boolean
  },
  data () {
    return {
      fields,
      thematics,
      state,
      extendedTypes,
      field: this.editMode ? this.projectInput.field : '',
      selectedState: this.editMode ? this.projectInput.state : '',
      selectedThematics: this.editMode ? this.projectInput.thematics : '',
      url: this.editMode && this.projectInput.url ? this.projectInput.url : '',
      menu: false,
      date: this.editMode && this.projectInput.date ? this.projectInput.date : '',
      dates: this.editMode && this.projectInput.dates ? this.projectInput.dates : [],
      time: this.editMode && this.projectInput.time ? this.projectInput.time : '',
      requiredRules: [
        (value) => !!value || 'This field is required.',
        (value) =>
          value === undefined ||
          value === true ||
          !!value.length ||
          'This field is required.'
      ],
      urlRules: [
        (value) => !value || value.length === 0 || (value.length > 0 && pattern.test(value)) || 'Invalid URL.'
      ],
      mandatoryUrlRules: [
        (value) =>
          (value.length > 0 && pattern.test(value)) || 'Invalid URL.',
        (value) => (value && value.length > 0) || 'URL required.'
      ],
      timeInformationsRules: [
        (value) => value.length <= 150 || 'Max 150 characters'
      ]
    }
  },
  computed: {
    dateRangeText () {
      return this.dates.join(' ~ ')
    }
  },
  mounted () {
    this.editMode && this.$refs.detailsForm.validate()
  },
  updated () {
    this.editMode && this.$store.commit('form/setStepError', { id: 'details', value: !this.$refs.detailsForm.validate() })
  },
  methods: {
    cleanModel (model) {
      if (model === 'field') {
        return (this.field = this.field.filter((item) =>
          fields.includes(item)
        ))
      }
    },
    isDateTime () {
      return extendedTypes.some(item => item.dateTime && this.$store.state.form.project.type.includes(item.name))
    },
    isTimeInterval () {
      return extendedTypes.some(item => item.timeInterval && this.$store.state.form.project.type.includes(item.name))
    }
  }
}
</script>
<style>
.v-messages.theme--light:not(.error--text) + .theme--light.v-counter
{
 color: white;
}
</style>
