<template>
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
      <v-form
        lazy-validation
        ref="summaryForm"
      >
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
                @click="$emit('nextStep', 1)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              :md="$store.state.form.project.url ? '6' : '12'"
              class="pl-3"
            >
              <div class="font-weight-light caption">
                Name
              </div>
              <div class="subtitle-1">
                {{ $store.state.form.project.name }}
              </div>
            </v-col>
            <v-col
              v-if="$store.state.form.project.url"
              cols="12"
              md="6"
              :class="{ 'pl-3': $vuetify.breakpoint.mdAndDown }"
            >
              <div class="font-weight-light caption">
                Url
              </div>
              <div class="subtitle-1">
                {{ $store.state.form.project.url }}
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
                <p v-html="$options.filters.nl2br($store.state.form.project.description)" />
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
                @click="$emit('nextStep', 2)"
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
                  $store.state.form.project.field.length > 1 ? "Disciplines" : "Discipline"
                }}
              </div>
              <v-chip
                v-for="(item, index) in $store.state.form.project.field"
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
                  $store.state.form.project.type.length > 1 ? "Project Types" : "Project Type"
                }}
              </div>
              <v-chip
                v-for="(item, index) in $store.state.form.project.type"
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
                  $store.state.form.project.thematics && $store.state.form.project.thematics.length > 1
                    ? "Thematics"
                    : "Thematic"
                }}
              </div>
              <v-chip
                v-for="(item, index) in $store.state.form.project.thematics"
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
                {{ $store.state.form.project.state }}
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
                @click="$emit('nextStep', 3)"
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
                {{ $store.state.form.project.zone.length > 1 ? "Continents" : "Continent" }}
              </div>
              <v-chip
                v-for="(item, index) in $store.state.form.project.zone"
                :key="index"
                class="subtitle-1 ma-1"
                label
              >
                {{ zones.find((zoneItem) => item === zoneItem.value).text }}
              </v-chip>
            </v-col>
            <v-col
              v-if="$store.state.form.project.country && $store.state.form.project.country.length"
              cols="12"
              md="6"
              :class="{ 'pl-3': $vuetify.breakpoint.mdAndDown }"
            >
              <div class="font-weight-light caption">
                {{
                  $store.state.form.project.country && $store.state.form.project.country.length > 1
                    ? "Countries"
                    : "Country"
                }}
              </div>
              <v-chip
                v-for="(item, index) in $store.state.form.project.country"
                :key="index"
                class="subtitle-1 ma-1"
                label
              >
                {{ item }}
              </v-chip>
            </v-col>
            <v-col
              v-if="$store.state.form.project.location"
              cols="12"
              md="6"
              class="pl-3"
            >
              <div class="font-weight-light caption">
                Region, state or location
              </div>
              <div class="subtitle-1">
                {{ $store.state.form.project.location }}
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
                @click="$emit('nextStep', 4)"
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
                {{ $store.state.form.project.contact_firstname }}
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
                {{ $store.state.form.project.contact_lastname }}
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
                {{ $store.state.form.project.contact_entity }}
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
                {{ $store.state.form.project.contact_email }}
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <template v-if="$store.state.form.project.team && $store.state.form.project.team.length">
          <v-divider color="white" />
          <v-card-text class="text-left pt-1 pb-2">
            <v-row no-gutters>
              <v-col
                cols="12"
                class="overline"
              >
                Project Team Members
                <v-btn
                  icon
                  small
                  @click="$emit('nextStep', 4)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row
              no-gutters
              class="mb-2"
            >
              <v-col
                cols="12"
                md="4"
                class="pl-3"
              >
                <div class="font-weight-light caption">
                  Firstname
                </div>
              </v-col>
              <v-col
                cols="12"
                md="4"
                class="pl-3"
              >
                <div class="font-weight-light caption">
                  Lastname
                </div>
              </v-col>
              <v-col
                cols="12"
                md="4"
                class="pl-3"
              >
                <div class="font-weight-light caption">
                  Institution
                </div>
              </v-col>
            </v-row>
            <v-row
              v-for="(item, index) in $store.state.form.project.team"
              :key="'team'+index"
              no-gutters
            >
              <v-col
                cols="12"
                md="4"
                class="pl-3"
              >
                <div class="subtitle-1">
                  {{ item.team_firstname }}
                </div>
              </v-col>
              <v-col
                cols="12"
                md="4"
                :class="{ 'pl-3': $vuetify.breakpoint.mdAndDown }"
              >
                <div class="subtitle-1">
                  {{ item.team_lastname }}
                </div>
              </v-col>
              <v-col
                cols="12"
                md="4"
                class="pl-3"
              >
                <div class="subtitle-1">
                  {{ item.team_entity }}
                </div>
              </v-col>
              <v-divider
                v-if="index < $store.state.form.project.team.length-1"
                :key="'divider' + index"
                inset
                class="mt-1 mb-2"
              />
            </v-row>
          </v-card-text>
        </template>
        <div class="ml-3">
          <v-checkbox
            ref="agreedRef"
            v-model="agreed"
            :rules="requiredRules"
          >
            <template v-slot:label>
              <span
                class="ml-1"
              >
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
        </div>
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
      @click="$emit('nextStep', 4)"
    >
      Previous
    </v-btn>
    <v-btn
      color="success"
      x-large
      :loading="loading"
      :disabled="
        !(
          /* $store.state.form.project.name &&
          $store.state.form.project.name.valid &&
          $store.state.form.project.url &&
          $store.state.form.project.url.valid &&
          $store.state.form.project.state &&
          $store.state.form.project.state.valid &&
          $store.state.form.project.description &&
          $store.state.form.project.description.valid &&
          $store.state.form.project.field &&
          $store.state.form.project.field.valid &&
          $store.state.form.project.type &&
          $store.state.form.project.type.valid &&
          $store.state.form.project.firstname &&
          $store.state.form.project.firstname.valid &&
          $store.state.form.project.lastname &&
          $store.state.form.project.lastname.valid &&
          (editMode ? true : $store.state.form.project.email && $store.state.form.project.email.valid) &&
          $store.state.form.project.entity &&
          $store.state.form.project.entity.valid &&
          $store.state.form.project.zone &&
          $store.state.form.project.zone.valid && */
          $refs.agreedRef &&
          $refs.agreedRef.valid
        )
      "
      @click="withRequest ? $emit('feedbackModal') : $emit('onSubmit')"
    >
      Submit&nbsp;
      <v-icon>mdi-send</v-icon>
    </v-btn>
  </v-stepper-content>
</template>
<script>
import {
  zones
} from '~/assets/data'
export default {
  props: {
    projectInput: Object,
    editMode: Boolean,
    loading: Boolean
  },
  data () {
    return {
      zones,
      agreed: false,
      withRequest: this.editMode ? this.projectInput.withRequest : false,
      requiredRules: [
        (value) => !!value || 'This field is required.',
        (value) =>
          value === undefined ||
          value === true ||
          !!value.length ||
          'This field is required.'
      ]
    }
  },
  mounted () {
    this.editMode && this.$refs.summaryForm.validate()
  },
  updated () {
    this.editMode && this.$store.commit('form/setStepError', { id: 'summary', value: !this.$refs.summaryForm.validate() })
  }
}
</script>
