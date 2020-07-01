<template>
  <v-stepper-content step="2">
    <v-card
      flat
      min-height="320px"
      light
      color="#333333"
    >
      <v-form lazy-validation>
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
              ref="type"
              v-model="type"
              :items="types"
              label="Project type(s)*"
              solo
              clearable
              multiple
              :rules="requiredRules"
              @change="cleanModel('type')"
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
          <!--  <template v-if="project.type.includes('Conference / Webinar')">
            <v-col cols="12" md="6">
              <v-menu
                ref="dateMenu"
                v-model="showDateMenu"
                :close-on-content-click="false"
                :return-value.sync="project.date"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="project.date"
                    label="Date"
                    prepend-inner-icon="mdi-calendar-check"
                    readonly
                    v-on="on"
                    solo
                  ></v-text-field>
                </template>
                <v-date-picker v-model="project.date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.dateMenu.save(project.date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <v-menu
                ref="timeMenu"
                v-model="showTimeMenu"
                :close-on-content-click="false"
                :return-value.sync="project.time"
                transition="scale-transition"
                min-width="290px"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="project.time"
                    label="Time"
                    prepend-inner-icon="mdi-clock"
                    readonly
                    solo
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="showDateMenu"
                  v-model="project.time"
                  no-title
                  scrollable
                  @click:minute="$refs.timeMenu.save(project.time)"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </template>-->
        </v-row>
      </v-form>
    </v-card>
    <v-btn
      text
      @click="$store.commit('form/updateProject', {field, state: selectedState, thematics: selectedThematics, type});$emit('nextStep', 1)"
    >
      Previous
    </v-btn>
    <v-btn
      color="accent"
      :disabled="
        !(
          $refs.field &&
          $refs.field.valid &&
          $refs.state &&
          $refs.state.valid &&
          $refs.type &&
          $refs.type.valid
        )
      "
      x-large
      @click="$store.commit('form/updateProject', {field, state: selectedState, thematics: selectedThematics, type});$emit('nextStep', 3)"
    >
      Continue&nbsp;
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-stepper-content>
</template>
<script>
import {
  types,
  fields,
  thematics,
  state
} from '~/assets/data'
export default {
  props: {
    projectInput: Object,
    editMode: Boolean,
    loading: Boolean
  },
  data () {
    return {
      types,
      fields,
      thematics,
      state,
      field: this.editMode ? this.projectInput.field : '',
      selectedState: this.editMode ? this.projectInput.state : '',
      selectedThematics: this.editMode ? this.projectInput.thematics : '',
      type: this.editMode ? this.projectInput.type : '',
      requiredRules: [
        (value) => !!value || 'This field is required.',
        (value) =>
          value === undefined ||
          value === true ||
          !!value.length ||
          'This field is required.'
      ],
      showDateMenu: false,
      showTimeMenu: false
    }
  },
  methods: {
    cleanModel (model) {
      if (model === 'field') {
        return (this.field = this.field.filter((item) =>
          fields.includes(item)
        ))
      }
    }
  }
}
</script>
