<template>
  <v-stepper v-model="formStep" dark alt-labels>
    <v-stepper-header>
      <v-stepper-step :complete="formStep > 1" step="1">General info</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="formStep > 2" step="2">Project details</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="formStep > 3" step="3">Location</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="formStep > 4" step="4">Contact</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="5">Confirmation</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card flat min-height="320px" light color="#333333">
          <v-form lazy-validation>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  required
                  label="Project Name*"
                  solo
                  v-model="project.name"
                  type="text"
                  :rules="nameRules"
                  ref="name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  :items="types"
                  label="Project type*"
                  solo
                  v-model="project.type"
                  :rules="requiredRules"
                  ref="type"
                ></v-select>
              </v-col>
              <template v-if="['Conference / Webinar'].includes(project.type)">
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
              </template>
              <v-col cols="12">
                <v-textarea
                  required
                  label="Description*"
                  solo
                  v-model="project.description"
                  type="text"
                  :rules="descriptionRules"
                  counter="500"
                  ref="description"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
        <v-btn
          color="accent"
          @click="formStep=2"
          :disabled="!($refs.name&&$refs.name.valid&&$refs.type&&$refs.type.valid&&$refs.description&&$refs.description.valid)"
          x-large
        >
          Continue&nbsp;
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card flat min-height="320px" light color="#333333">
          <v-form lazy-validation>
            <v-row>
              <v-col cols="12" md="6">
                <v-combobox
                  :items="fields"
                  label="Project discipline(s)*"
                  solo
                  v-model="project.field"
                  clearable
                  multiple
                  @change="cleanModel('field')"
                  :rules="requiredRules"
                  ref="field"
                ></v-combobox>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Project URL"
                  solo
                  v-model="project.url"
                  type="url"
                  :rules="urlRules"
                  ref="url"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
        <v-btn text @click="formStep = 1">Previous</v-btn>
        <v-btn
          color="accent"
          @click="formStep = 3"
          :disabled="!($refs.field&&$refs.field.valid&&$refs.url&&$refs.url.valid)"
          x-large
        >
          Continue&nbsp;
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card min-height="320px" flat light color="#333333">
          <v-form lazy-validation>
            <v-row>
              <v-alert
                type="info"
                align="left"
                color="gray lighten-4"
                width="100%"
              >The location of the project refers to where it takes place and is about, regardless of the contact geographical position.</v-alert>
              <v-col cols="12" md="6">
                <v-select
                  :items="zones"
                  label="Continent*"
                  solo
                  v-model="project.zone"
                  :rules="requiredRules"
                  :clearable="project.zone!=='worldwide'"
                  @click:clear="project.country=[]"
                  ref="zone"
                  :disabled="loading"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-combobox
                  :disabled="!project.zone|| loading"
                  :items="project.zone!=='worldwide'?countries[project.zone]:Object.keys(countries).map(countryKey=>countries[countryKey]).flat().sort()"
                  label="Country"
                  solo
                  @change="cleanModel('country')"
                  multiple
                  no-data-text="No country matching your search"
                  v-model="project.country"
                  clearable
                ></v-combobox>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Region, State or City"
                  solo
                  v-model="project.city"
                  :disabled="loading"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
        <v-btn text @click="formStep = 2">Previous</v-btn>
        <v-btn
          color="accent"
          @click="formStep = 4"
          :disabled="!($refs.zone&&$refs.zone.valid)"
          x-large
        >
          Continue&nbsp;
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="4">
        <v-card min-height="320px" flat light color="#333333">
          <v-form lazy-validation>
            <v-row>
              <v-alert
                type="info"
                align="left"
                color="gray lighten-4"
              >We will never disclose an Email address to anyone. Every contact request will be redirected by our servers to garantee that a project contact personnal data is not made public.</v-alert>

              <v-col cols="12" md="6">
                <v-text-field
                  label="Contact firstname*"
                  solo
                  v-model="project.contact_firstname"
                  :rules="contactNameRules"
                  @blur="capitalize('contact_firstname')"
                  ref="firstname"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Contact lastname*"
                  solo
                  v-model="project.contact_lastname"
                  :rules="contactNameRules"
                  @blur="capitalize('contact_lastname')"
                  ref="lastname"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Contact Institution* (University, Laboratory, freelance...)"
                  solo
                  :rules="requiredRules"
                  v-model="project.contact_entity"
                  ref="entity"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Contact Email*"
                  solo
                  :rules="emailRules"
                  ref="email"
                  v-model="project.contact_email"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card>

        <v-btn text @click="formStep = 3">Previous</v-btn>
        <v-btn
          color="accent"
          @click="formStep = 5"
          :disabled="!($refs.firstname&&$refs.firstname.valid&&$refs.lastname&&$refs.lastname.valid&&$refs.email&&$refs.email.valid&&$refs.entity&&$refs.entity.valid)"
          x-large
        >
          Continue&nbsp;
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="5">
        <v-card min-height="320px" flat dark color="#333333">
          <v-card-title primary-title>Review your project</v-card-title>
          <v-form lazy-validation>
            <v-card-text class="text-left pt-1 pb-2">
              <v-row no-gutters>
                <v-col cols="12" class="overline">
                  Project Information
                  <v-btn icon small @click="formStep=1">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="font-weight-light caption">Name</div>
                  <div class="subtitle-1">{{project.name}}</div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="font-weight-light caption">Type</div>
                  <div class="subtitle-1">{{project.type}}</div>
                </v-col>
                <v-col cols="12">
                  <div class="font-weight-light caption">Description</div>
                  <div class="subtitle-1">{{project.description}}</div>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider color="white"></v-divider>
            <v-card-text class="text-left pt-1 pb-2">
              <v-row no-gutters>
                <v-col cols="12" class="overline">
                  Project details
                  <v-btn icon small @click="formStep=2">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" md="6">
                  <div
                    class="font-weight-light caption"
                  >{{project.field.length>1?'Disciplines':'Discipline'}}</div>
                  <v-chip
                    class="subtitle-1 ma-1"
                    v-for="(item, index) in project.field"
                    :key="index"
                  >{{item}}</v-chip>
                </v-col>
                <v-col cols="12" md="6" v-if="project.url">
                  <div class="font-weight-light caption">Url</div>
                  <div class="subtitle-1">{{project.url}}</div>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider color="white"></v-divider>
            <v-card-text class="text-left pt-1 pb-2">
              <v-row no-gutters>
                <v-col cols="12" class="overline">
                  Project location
                  <v-btn icon small @click="formStep=3">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="font-weight-light caption">Continent</div>
                  <div class="subtitle-1">{{project.zone}}</div>
                </v-col>
                <v-col cols="12" md="6" v-if="project.country&&project.country.length">
                  <div
                    class="font-weight-light caption"
                  >{{project.country.length>1?'Countries':'Country'}}</div>
                  <v-chip
                    class="subtitle-1 ma-1"
                    v-for="(item, index) in project.country"
                    :key="index"
                    label
                  >{{item}}</v-chip>
                </v-col>
                <v-col cols="12" md="6" v-if="project.city">
                  <div class="font-weight-light caption">Region, state or city</div>
                  <div class="subtitle-1">{{project.city}}</div>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider color="white"></v-divider>
            <v-card-text class="text-left pt-1 pb-2">
              <v-row no-gutters>
                <v-col cols="12" class="overline">
                  Project contact
                  <v-btn icon small @click="formStep=4">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="font-weight-light caption">Firstname</div>
                  <div class="subtitle-1">{{project.contact_firstname}}</div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="font-weight-light caption">Lastname</div>
                  <div class="subtitle-1">{{project.contact_lastname}}</div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="font-weight-light caption">Institution</div>
                  <div class="subtitle-1">{{project.contact_entity}}</div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="font-weight-light caption">Email</div>
                  <div class="subtitle-1">{{project.contact_email}}</div>
                </v-col>
              </v-row>
              <v-checkbox :rules="requiredRules" v-model="agreed" ref="agreedRef">
                <template v-slot:label>
                  <div>
                    I confirm that I provided exact information and agree with the
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <a
                          target="_blank"
                          href="http://vuetifyjs.com"
                          @click.stop
                          v-on="on"
                        >terms & conditions</a>
                      </template>
                      Opens in new window to WPRN terms & conditions
                    </v-tooltip>&nbsp;of WPRN
                  </div>
                </template>
              </v-checkbox>
            </v-card-text>
          </v-form>
        </v-card>
        <div class="my-4">
          <small>
            This site is protected by reCAPTCHA and the Google
            <a
              href="https://policies.google.com/privacy"
            >Privacy Policy</a> and
            <a href="https://policies.google.com/terms">Terms of Service</a> apply.
          </small>
        </div>
        <v-btn text @click="formStep = 4">Previous</v-btn>
        <v-btn
          color="success"
          x-large
          @click="onSubmit()"
          :loading="loading"
          :disabled="!(
          $refs.name&&$refs.name.valid&&
          $refs.url&&$refs.url.valid&&
          $refs.description&&$refs.description.valid&&
          $refs.field&&$refs.field.valid&&
          $refs.type&&$refs.type.valid&&
          $refs.firstname&&$refs.firstname.valid&&
          $refs.lastname&&$refs.lastname.valid&&
          $refs.email&&$refs.email.valid&&
          $refs.entity&&$refs.entity.valid&&
          $refs.zone&&$refs.zone.valid&&
          $refs.agreedRef&&$refs.agreedRef.valid)"
        >
          Submit&nbsp;
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { zones, countries, types, fields } from "~/assets/data";
import { alpha, pattern, email } from "~/assets/regex";
import { newProject } from "../../../backend/src/graphql/mutations";
export default {
  data() {
    return {
      zones,
      countries,
      types,
      fields,
      agreed: false,
      loading: false,
      formStep: 1,
      nameRules: [
        value => !!value || "Required.",
        value =>
          value.length >= 5 ||
          "The project name  must have at least 4 characters",
        value => value.length <= 40 || "Max 40 characters",
        value => {
          return true;
        }
      ],
      contactNameRules: [
        value => !!value || "Required.",
        value =>
          alpha.test(value) ||
          "No digits or special characters (except ' and -) allowed",
        value => value.length <= 40 || "Max 40 characters",
        value => {
          return true;
        }
      ],
      urlRules: [
        value => {
          return (
            !value ||
            value.length === 0 ||
            (value.length > 0 && pattern.test(value)) ||
            "Invalid URL."
          );
        }
      ],
      emailRules: [
        value => !!value || "Email address required.",
        value => (value || "").length <= 61 || "Max 60 characters",
        value => {
          return email.test(value) || "Invalid e-mail.";
        }
      ],
      descriptionRules: [
        value => !!value || "A description is required.",
        value =>
          value.length >= 20 ||
          "The description must have at least 20 characters",
        value => value.length <= 500 || "Max 500 characters"
      ],
      requiredRules: [
        value => !!value || "This field is required.",
        value =>
          value === undefined ||
          value === true ||
          !!value.length ||
          "This field is required."
      ],
      showDateMenu: false,
      showTimeMenu: false,
      project: {
        name: "",
        description: "",
        type: "",
        field: [],
        country: [],
        zone: "worldwide",
        contact_email: "",
        city: "",
        contact_firstname: "",
        contact_lastname: "",
        contact_entity: "",
        url: "",
        date: "",
        time: ""
      }
    };
  },
  async mounted() {
    console.log("mounted");
    await this.$recaptcha.init();
  },
  props: {},
  methods: {
    cleanModel(model) {
      console.log("CHANGE", model);
      if (model === "field") {
        return (this.project.field = this.project.field.filter(item =>
          fields.includes(item)
        ));
      }
      if (model === "country") {
        return (this.project.country = this.project.country.filter(item =>
          this.project.zone === "worldwide"
            ? Object.keys(countries)
                .map(countryKey => countries[countryKey])
                .flat()
                .includes(item)
            : countries[this.project.zone].includes(item)
        ));
      }
    },
    capitalize(input) {
      return (this.project[input] = this.project[
        input
      ].replace(/(?:^|[\s'-])\S/g, a => a.toUpperCase()));
    },
    async onSubmit() {
      try {
        /*         this.$emit("WorkInProgressDialogToggle"); */
        this.loading = true;
        let args = this.project;
        Object.keys(this.project).forEach(key => {
          console.log(key);
          console.log(this.project[key]);
          if (!args[key] || args[key].length === 0) delete args[key];
        });
        args.recaptcha = await this.$recaptcha.getResponse();

        console.log(args);
        const res = await API.graphql(
          graphqlOperation(newProject, { input: args })
        );
        console.log(res);
        if (res && !res.errors) {
          console.log("YEAAAAAAH", res);
          this.$emit("complete");
        } else {
          console.log("YEAAAAAAH");
          this.error = true;
        }
        this.loading = false;
        await this.$recaptcha.reset();
      } catch (error) {
        console.log(error);
        this.error = true;
        this.loading = false;
        await this.$recaptcha.reset();
      }
    }
  }
};
</script>
