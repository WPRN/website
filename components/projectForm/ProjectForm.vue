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
                  v-model="project.name"
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
                  v-model="project.url"
                  label="Project URL"
                  solo
                  type="url"
                  :rules="urlRules"
                />
              </v-col>

              <v-col cols="12">
                <v-expand-transition>
                  <v-alert
                    v-show="project.description.length > 0"
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
                  v-model="project.description"
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
          @click="formStep = 2"
        >
          Continue&nbsp;
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-stepper-content>
      <!--  PROJECT DETAILS (FIELDS, TYPES, THEMATICS, STATE AND POSSIBLY DATE & TIME) -->
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
                  v-model="project.field"
                  :items="fields"
                  label="Project discipline(s)*"
                  solo
                  clearable
                  multiple
                  :rules="requiredRules"
                  @change="cleanModel('field')"
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-select
                  ref="state"
                  v-model="project.state"
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
                  v-model="project.thematics"
                  :items="thematics"
                  label="Project Thematic(s)"
                  solo
                  clearable
                  multiple
                  @change="cleanModel('thematics')"
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-select
                  ref="type"
                  v-model="project.type"
                  :items="types"
                  label="Project type(s)*"
                  solo
                  clearable
                  multiple
                  :rules="requiredRules"
                  @change="cleanModel('type')"
                />
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
          @click="formStep = 1"
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
          @click="formStep = 3"
        >
          Continue&nbsp;
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-stepper-content>
      <!--  PROJECT LOCATION (ZONES, COUNTRIES, REGION) -->
      <v-stepper-content step="3">
        <v-card
          min-height="320px"
          flat
          light
          color="#333333"
        >
          <v-form lazy-validation>
            <v-row>
              <v-alert
                type="info"
                align="left"
                color="gray lighten-4"
                width="100%"
              >
                The location of the project refers to where it takes place and
                is about, regardless of the contact geographical position.
              </v-alert>
              <v-col
                cols="12"
                md="6"
              >
                <v-select
                  ref="zone"
                  v-model="project.zone"
                  :items="zones"
                  label="Continent*"
                  solo
                  multiple
                  :rules="requiredRules"
                  :clearable="
                    !(
                      project.zone.length === 1 &&
                      project.zone.includes('worldwide')
                    )
                  "
                  :disabled="loading"
                  @click:clear="
                    project.country = []
                    project.zone = ['worldwide']
                  "
                  @change="setCountries()"
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-combobox
                  v-model="project.country"
                  :disabled="!project.zone || loading"
                  :items="countrySet"
                  label="Country"
                  solo
                  multiple
                  no-data-text="No country matching your search"
                  clearable
                  @change="cleanModel('country')"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="project.location"
                  label="Region, State or location"
                  solo
                  :disabled="loading"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card>
        <v-btn
          text
          @click="formStep = 2"
        >
          Previous
        </v-btn>
        <v-btn
          color="accent"
          :disabled="!($refs.zone && $refs.zone.valid)"
          x-large
          @click="formStep = 4"
        >
          Continue&nbsp;
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-stepper-content>
      <!--   CONTACT INFO -->
      <v-stepper-content step="4">
        <v-card
          min-height="320px"
          flat
          light
          color="#333333"
        >
          <v-form lazy-validation>
            <v-row>
              <v-alert
                type="info"
                align="left"
                color="gray lighten-4"
              >
                <template v-if="editMode">
                  Your email address is the only element of your project that
                  you cannot change.
                </template>
                <template v-else>
                  WPRN will not disclose online nor transfer or sell
                  contributors’ or referents’ email addresses to any third
                  party. Potential contact requests will be redirected by our
                  servers to guarantee that their personal data is not made
                  public.
                </template>
              </v-alert>

              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  ref="firstname"
                  v-model="project.contact_firstname"
                  label="Contact firstname*"
                  solo
                  :rules="contactNameRules"
                  @blur="capitalize('contact_firstname')"
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  ref="lastname"
                  v-model="project.contact_lastname"
                  label="Contact lastname*"
                  solo
                  :rules="contactNameRules"
                  @blur="capitalize('contact_lastname')"
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  ref="entity"
                  v-model="project.contact_entity"
                  label="Contact Institution* (University, Laboratory, freelance...)"
                  solo
                  :rules="requiredRules"
                  @keyup.enter="next()"
                />
              </v-col>
              <v-col
                v-if="!editMode"
                cols="12"
                md="6"
              >
                <v-text-field
                  ref="email"
                  v-model="project.contact_email"
                  label="Contact Email*"
                  solo
                  :rules="emailRules"
                  @keyup.enter="next()"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card>

        <v-btn
          text
          @click="formStep = 3"
        >
          Previous
        </v-btn>
        <v-btn
          color="accent"
          :disabled="
            !(
              $refs.firstname &&
              $refs.firstname.valid &&
              $refs.lastname &&
              $refs.lastname.valid &&
              (editMode ? true : $refs.email && $refs.email.valid) &&
              $refs.entity &&
              $refs.entity.valid
            )
          "
          x-large
          @click="formStep = 5"
        >
          Continue&nbsp;
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-stepper-content>
      <!-- SUMMARY -->
      <v-stepper-content step="5">
        <v-card
          min-height="320px"
          flat
          dark
          color="#333333"
        >
          <v-card-title primary-title>
            Review your project
          </v-card-title>
          <v-alert
            v-if="editMode"
            type="info"
            align="left"
            color="gray lighten-4"
          >
            Please note that if your project is already verified or featured,
            you are responsible for the updated content.
          </v-alert>
          <v-form lazy-validation>
            <v-card-text class="text-left pt-1 pb-2">
              <v-row no-gutters>
                <v-col
                  cols="12"
                  class="overline"
                >
                  Project Information
                  <v-btn
                    icon
                    small
                    @click="formStep = 1"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-col>
                <v-col
                  cols="12"
                  :md="project.url ? '6' : '12'"
                  class="pl-3"
                >
                  <div class="font-weight-light caption">
                    Name
                  </div>
                  <div class="subtitle-1">
                    {{ project.name }}
                  </div>
                </v-col>
                <v-col
                  v-if="project.url"
                  cols="12"
                  md="6"
                  :class="{ 'pl-3': $vuetify.breakpoint.mdAndDown }"
                >
                  <div class="font-weight-light caption">
                    Url
                  </div>
                  <div class="subtitle-1">
                    {{ project.url }}
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  class="pl-3"
                >
                  <div class="font-weight-light caption">
                    Project and Team description
                  </div>
                  <div class="subtitle-1">
                    <p v-html="$options.filters.nl2br(project.description)" />
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider color="white" />
            <v-card-text class="text-left pt-1 pb-2">
              <v-row no-gutters>
                <v-col
                  cols="12"
                  class="overline"
                >
                  Project details
                  <v-btn
                    icon
                    small
                    @click="formStep = 2"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  class="pl-3"
                >
                  <div class="font-weight-light caption">
                    {{
                      project.field.length > 1 ? "Disciplines" : "Discipline"
                    }}
                  </div>
                  <v-chip
                    v-for="(item, index) in project.field"
                    :key="index"
                    class="subtitle-1 ma-1"
                  >
                    {{ item }}
                  </v-chip>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  :class="{ 'pl-3': $vuetify.breakpoint.mdAndDown }"
                >
                  <div class="font-weight-light caption">
                    {{
                      project.type.length > 1 ? "Project Types" : "Project Type"
                    }}
                  </div>
                  <v-chip
                    v-for="(item, index) in project.type"
                    :key="index"
                    class="subtitle-1 ma-1"
                  >
                    {{ item }}
                  </v-chip>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  class="pl-3"
                >
                  <div class="font-weight-light caption">
                    {{
                      project.thematics && project.thematics.length > 1
                        ? "Thematics"
                        : "Thematic"
                    }}
                  </div>
                  <v-chip
                    v-for="(item, index) in project.thematics"
                    :key="index"
                    class="subtitle-1 ma-1"
                  >
                    {{ item }}
                  </v-chip>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  :class="{ 'pl-3': $vuetify.breakpoint.mdAndDown }"
                >
                  <div class="font-weight-light caption">
                    Project Status
                  </div>
                  <div class="subtitle-1">
                    {{ project.state }}
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider color="white" />
            <v-card-text class="text-left pt-1 pb-2">
              <v-row no-gutters>
                <v-col
                  cols="12"
                  class="overline"
                >
                  Project location
                  <v-btn
                    icon
                    small
                    @click="formStep = 3"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  class="pl-3"
                >
                  <div
                    class="font-weight-light caption"
                  >
                    {{ project.zone.length > 1 ? "Continents" : "Continent" }}
                  </div>
                  <v-chip
                    v-for="(item, index) in project.zone"
                    :key="index"
                    class="subtitle-1 ma-1"
                    label
                  >
                    {{ zones.find((zoneItem) => item === zoneItem.value).text }}
                  </v-chip>
                </v-col>
                <v-col
                  v-if="project.country && project.country.length"
                  cols="12"
                  md="6"
                  :class="{ 'pl-3': $vuetify.breakpoint.mdAndDown }"
                >
                  <div class="font-weight-light caption">
                    {{
                      project.country && project.country.length > 1
                        ? "Countries"
                        : "Country"
                    }}
                  </div>
                  <v-chip
                    v-for="(item, index) in project.country"
                    :key="index"
                    class="subtitle-1 ma-1"
                    label
                  >
                    {{ item }}
                  </v-chip>
                </v-col>
                <v-col
                  v-if="project.location"
                  cols="12"
                  md="6"
                  class="pl-3"
                >
                  <div class="font-weight-light caption">
                    Region, state or location
                  </div>
                  <div class="subtitle-1">
                    {{ project.location }}
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider color="white" />
            <v-card-text class="text-left pt-1 pb-2">
              <v-row no-gutters>
                <v-col
                  cols="12"
                  class="overline"
                >
                  Project contact
                  <v-btn
                    icon
                    small
                    @click="formStep = 4"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  class="pl-3"
                >
                  <div class="font-weight-light caption">
                    Firstname
                  </div>
                  <div class="subtitle-1">
                    {{ project.contact_firstname }}
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  :class="{ 'pl-3': $vuetify.breakpoint.mdAndDown }"
                >
                  <div class="font-weight-light caption">
                    Lastname
                  </div>
                  <div class="subtitle-1">
                    {{ project.contact_lastname }}
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  class="pl-3"
                >
                  <div class="font-weight-light caption">
                    Institution
                  </div>
                  <div class="subtitle-1">
                    {{ project.contact_entity }}
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  :class="{ 'pl-3': $vuetify.breakpoint.mdAndDown }"
                >
                  <div class="font-weight-light caption">
                    Email
                  </div>
                  <div class="subtitle-1">
                    {{ project.contact_email }}
                  </div>
                </v-col>
              </v-row>
              <span>
                <v-checkbox
                  ref="agreedRef"
                  v-model="agreed"
                  :rules="requiredRules"
                >
                  <template v-slot:label>
                    <span>
                      I certify that the information given in this form is true,
                      complete and accurate, and that I agree to
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <a
                            href="/privacy_policy"
                            target="_blank"
                            v-on="on"
                            @click.stop
                          >the privacy policy of WPRN</a>
                        </template>
                        Opens in new window to WPRN privacy policy
                      </v-tooltip>
                    </span>
                  </template>
                </v-checkbox>
              </span>
            </v-card-text>
          </v-form>
        </v-card>
        <div class="my-4">
          <small>
            This site is protected by reCAPTCHA and the Google
            <a
              href="https://policies.google.com/privacy"
            >Privacy Policy</a> and
            <a href="https://policies.google.com/terms">Terms of Service</a>
            apply.
          </small>
        </div>
        <v-btn
          text
          @click="formStep = 4"
        >
          Previous
        </v-btn>
        <v-btn
          color="success"
          x-large
          :loading="loading"
          :disabled="
            !(
              $refs.name &&
              $refs.name.valid &&
              $refs.url &&
              $refs.url.valid &&
              $refs.state &&
              $refs.state.valid &&
              $refs.description &&
              $refs.description.valid &&
              $refs.field &&
              $refs.field.valid &&
              $refs.type &&
              $refs.type.valid &&
              $refs.firstname &&
              $refs.firstname.valid &&
              $refs.lastname &&
              $refs.lastname.valid &&
              (editMode ? true : $refs.email && $refs.email.valid) &&
              $refs.entity &&
              $refs.entity.valid &&
              $refs.zone &&
              $refs.zone.valid &&
              $refs.agreedRef &&
              $refs.agreedRef.valid
            )
          "
          @click="project.withRequest?feedbackModal= true:onSubmit()"
        >
          Submit&nbsp;
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-stepper-content>
      <feedbackModal
        :open="feedbackModal"
        @cancel="feedbackModal= false"
        @update="feedbackModal= false;project.feedback=$event; onSubmit()"
      />
    </v-stepper-items>
  </v-stepper>
</template>
<script>
import {
  zones,
  countries,
  types,
  fields,
  thematics,
  state
} from '~/assets/data'
import { alpha, pattern, email } from '~/assets/regex'
import { newProject, editProject } from '~/graphql/mutations'
import gql from 'graphql-tag'
import client from '~/plugins/amplify'
import feedbackModal from '~/components/projectForm/feedbackModal'
export default {
  components: {
    feedbackModal
  },
  props: {
    projectInput: Object,
    editMode: Boolean
  },
  data () {
    return {
      zones,
      countries,
      types,
      fields,
      thematics,
      state,
      agreed: false,
      loading: false,
      feedbackModal: false,
      formStep: 1,
      countrySet: Object.keys(countries)
        .map((countryKey) => countries[countryKey])
        .flat()
        .sort(),
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
      contactNameRules: [
        (value) => !!value || 'Required.',
        (value) =>
          alpha.test(value) ||
          "No digits or special characters (except ' and -) allowed",
        (value) => value.length <= 80 || 'Max 80 characters',
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
      emailRules: [
        (value) => !!value || 'Email address required.',
        (value) => (value || '').length <= 61 || 'Max 60 characters',
        (value) => {
          return email.test(value) || 'Invalid e-mail.'
        }
      ],
      descriptionRules: [
        (value) => !!value || 'A description is required.',
        (value) =>
          value.length >= 500 ||
          'The description must have at least 500 characters',
        (value) => value.length <= 2000 || 'Max 2000 characters'
      ],
      requiredRules: [
        (value) => !!value || 'This field is required.',
        (value) =>
          value === undefined ||
          value === true ||
          !!value.length ||
          'This field is required.'
      ],
      showDateMenu: false,
      showTimeMenu: false,
      project: {
        name: this.editMode ? this.projectInput.name : '',
        description: this.editMode ? this.projectInput.description : '',
        type: this.editMode ? this.projectInput.type : [],
        field: this.editMode ? this.projectInput.field : [],
        state: this.editMode ? this.projectInput.state : '',
        country: this.editMode ? this.projectInput.country : [],
        thematics: this.editMode ? this.projectInput.thematics : [],
        zone: this.editMode ? this.projectInput.zone : [],
        contact_email: this.editMode ? this.projectInput.contact_email : '',
        location: this.editMode ? this.projectInput.location : '',
        contact_firstname: this.editMode
          ? this.projectInput.contact_firstname
          : '',
        contact_lastname: this.editMode
          ? this.projectInput.contact_lastname
          : '',
        contact_entity: this.editMode ? this.projectInput.contact_entity : '',
        url: this.editMode ? this.projectInput.url : '',
        feedback: this.editMode ? this.projectInput.feedback : '',
        withRequest: this.editMode ? this.projectInput.withRequest : false,
        date: this.editMode ? this.projectInput.date : '',
        time: this.editMode ? this.projectInput.time : ''
      }
    }
  },
  async mounted () {
    await this.$recaptcha.init()
    setTimeout(() => {
      this.$refs.step1.resetValidation()
    }, 1000)
  },
  methods: {
    next () {
      if (
        this.$refs.firstname &&
        this.$refs.firstname.valid &&
        this.$refs.lastname &&
        this.$refs.lastname.valid &&
        this.$refs.email &&
        this.$refs.email.valid &&
        this.$refs.entity &&
        this.$refs.entity.valid
      ) { this.formStep = 5 }
    },
    setCountries () {
      this.countrySet = []
      // Remove worldwide if a continent is selected
      if (
        this.project.zone.length > 1 &&
        this.project.zone.includes('worldwide')
      ) {
        if (this.project.zone[this.project.zone.length - 1] === 'worldwide') {
        // did we just add worlwide?
          this.project.zone = ['worldwide']
        } else {
          this.project.zone = this.project.zone.filter(
            (item) => item !== 'worldwide'
          )
        }
      }

      if (
        this.project.zone.length === 1 &&
        this.project.zone.includes('worldwide')
      ) {
        this.countrySet = Object.keys(this.countries)
          .map((countryKey) => this.countries[countryKey])
          .flat()
          .sort()
      } else {
        this.project.zone.forEach((zone) => {
          this.countrySet.push(this.countries[zone])
        })
      }
      this.project.country = this.project.country.filter((country) =>
        this.countrySet.includes(country)
      )
      this.countrySet = this.countrySet.flat().sort()
    },
    cleanModel (model) {
      if (model === 'field') {
        return (this.project.field = this.project.field.filter((item) =>
          fields.includes(item)
        ))
      }
      if (model === 'country') {
        return (this.project.country = this.project.country.filter((item) =>
          this.countrySet.includes(item)
        ))
      }
    },
    capitalize (input) {
      return (this.project[input] = this.project[input].replace(/(?:^|[\s'-])\S/g, (a) => a.toUpperCase()))
    },
    async onSubmit () {
      /*       this.$emit("WorkInProgressDialogToggle"); */
      try {
        this.loading = true
        let args = this.project

        Object.keys(this.project).forEach((key) => {
          if (!args[key] || args[key].length === 0) delete args[key]
        })
        args.recaptcha = await this.$recaptcha.getResponse()
        let res = {}
        if (this.editMode) {
          delete args.withRequest
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
