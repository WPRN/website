<template>
  <v-stepper v-model="formStep" dark alt-labels>
    <v-stepper-header>
      <v-stepper-step :complete="formStep > 1" step="1">General info</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="formStep > 2" step="2">Project details</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="formStep > 3" step="3">Contact</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="4">Location</v-stepper-step>
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
                <v-text-field
                  label="Project URL"
                  solo
                  v-model="project.url"
                  type="url"
                  :rules="urlRules"
                  ref="url"
                ></v-text-field>
              </v-col>
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
          :disabled="!($refs.name&&$refs.name.valid&&$refs.url&&$refs.url.valid&&$refs.description&&$refs.description.valid)"
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
                  label="Project field*"
                  solo
                  v-model="project.field"
                  clearable
                  multiple
                  :rules="requiredRules"
                  ref="field"
                ></v-combobox>
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
            </v-row>
            <v-row v-if="['Seminar'].includes(project.type)">
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
            </v-row>
          </v-form>
        </v-card>
        <v-btn text @click="formStep = 1">Previous</v-btn>
        <v-btn
          color="accent"
          @click="formStep = 3"
          :disabled="!($refs.field&&$refs.field.valid&&$refs.type&&$refs.type.valid)"
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
                  label="Contact organism (institution, university, freelance...)"
                  solo
                  v-model="project.contact_entity"
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

        <v-btn text @click="formStep = 2">Previous</v-btn>
        <v-btn
          color="accent"
          @click="formStep = 4"
          :disabled="!($refs.firstname&&$refs.firstname.valid&&$refs.lastname&&$refs.lastname.valid&&$refs.email&&$refs.email.valid)"
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
              >The location of the project refers to where it takes place and is about, regardless of the contact geographical position.</v-alert>
              <v-col cols="12" md="6">
                <v-select
                  :items="zones"
                  label="Continent*"
                  solo
                  v-model="project.zone"
                  :rules="requiredRules"
                  clearable
                  ref="zone"
                  :disabled="loading"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-combobox
                  :disabled="!project.zone|| loading"
                  :items="countries[project.zone]"
                  label="Country"
                  solo
                  multiple
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
        <v-btn text @click="formStep = 3">Previous</v-btn>
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
          $refs.zone&&$refs.zone.valid)"
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
import newProject from "~/graphql/mutations/new.gql";
export default {
  data() {
    return {
      zones,
      countries,
      types,
      fields,
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
      requiredRules: [value => !!value || "This field is required."],
      showDateMenu: false,
      showTimeMenu: false,
      project: {
        name: "gesrgergs",
        description: "gresg er resg eg eg rege ersgesrg erg gesrg esrge",
        type: "regegs",
        field: ["gergesge"],
        country: "",
        zone: "gersgesrgs",
        contact_email: "gersgersges@gtesgs.fr",
        city: "",
        contact_firstname: "gregersges",
        contact_lastname: "egregersg",
        contact_entity: "",
        url: "",
        date: "",
        time: ""
      }
    };
  },
  async mounted() {
    await this.$recaptcha.init();
  },
  props: {},
  methods: {
    capitalize(input) {
      return (this.project[input] = this.project[
        input
      ].replace(/(?:^|[\s'-])\S/g, a => a.toUpperCase()));
    },
    async onSubmit() {
      try {
        this.loading = true;
        let args = this.project;
        Object.keys(this.project).forEach(key => {
          console.log(key);
          console.log(this.project[key]);
          if (!args[key] || args[key].length === 0) delete args[key];
        });
        const token = await this.$recaptcha.execute("login");
        console.log(token);
        console.log(args);
        const res = await API.graphql(graphqlOperation(newProject, args));
        console.log(res);
        if (res && !res.errors) {
          console.log("YEAAAAAAH", res);
          this.$emit("complete");
        } else {
          console.log("YEAAAAAAH");
          this.error = true;
        }
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.error = true;
        this.loading = false;
      }
    }
  }
};
</script>
