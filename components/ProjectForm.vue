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
          <v-form v-model="step1Form" lazy-validation>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Project Name*"
                  solo
                  v-model="project.name"
                  type="text"
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Project URL"
                  solo
                  v-model="project.url"
                  type="url"
                  :rules="urlRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Description*"
                  solo
                  v-model="project.description"
                  type="text"
                  :rules="descriptionRules"
                  counter="500"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
        <v-btn color="accent" @click="formStep=2" x-large>
          Continue&nbsp;
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card flat min-height="320px" light color="#333333">
          <v-form v-model="step2Form" lazy-validation>
            <v-row>
              <v-col cols="12" md="6">
                <v-combobox
                  :items="fields"
                  label="Project field*"
                  solo
                  v-model="project.field"
                  clearable
                ></v-combobox>
              </v-col>
              <v-col cols="12" md="6">
                <v-select :items="types" label="Project type*" solo v-model="project.type"></v-select>
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
        <v-btn color="accent" @click="formStep = 3" x-large>
          Continue&nbsp;
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card min-height="320px" flat light color="#333333">
          <v-form v-model="step3Form" lazy-validation>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Contact firstname*"
                  solo
                  v-model="project.contact_firstname"
                  :rules="contactNameRules"
                  @blur="capitalize('contact_firstname')"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Contact lastname*"
                  solo
                  v-model="project.contact_lastname"
                  :rules="contactNameRules"
                  @blur="capitalize('contact_lastname')"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Contact Email*"
                  solo
                  :rules="emailRules"
                  hint="We will never disclose an Email address."
                  v-model="project.contact_email"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card>

        <v-btn text @click="formStep = 2">Previous</v-btn>
        <v-btn color="accent" @click="formStep = 4" x-large>
          Continue&nbsp;
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="4">
        <v-card min-height="320px" flat light color="#333333">
          <v-form v-model="step4Form" lazy-validation>
            <v-row>
              <v-col cols="12" md="6">
                <v-select :items="zones" label="Continent*" solo v-model="project.zone" clearable></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-combobox
                  :disabled="!project.zone"
                  :items="countries[project.zone]"
                  label="Country"
                  solo
                  v-model="project.country"
                  clearable
                ></v-combobox>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  :disabled="!project.zone"
                  label="Region, State or City"
                  solo
                  v-model="project.city"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
        <v-btn text @click="formStep = 3">Previous</v-btn>
        <v-btn color="success" x-large @click="onSubmit()" :disabled="!valid">
          Submit&nbsp;
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
const alpha = new RegExp("^[-' a-zA-Zàâéêèìôùûç]*$");
const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
export default {
  data() {
    return {
      formStep: 1,
      step1Form: false,
      step2Form: false,
      step3Form: false,
      step4Form: false,
      valid: true,
      nameRules: [
        value => !!value || "Required.",
        value =>
          value.length >= 5 ||
          "The description must have at least 4 characters",
        value => value.length <= 40 || "Max 40 characters",
        value => {
          return true;
        }
      ],
      contactNameRules: [
        value => !!value || "Contact lastname required.",
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
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
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
      types: ["Study", "Seminar", "Survey", "Design", "Organisation", "Other"],

      fields: [
        "Agricultural and Veterinary Science",
        "Astronomy, Astrophysics, Space",
        "Biological Sciences",
        "Built Environment and Design",
        "Chemistry",
        "Commerce, Management, Tourism and Marketing",
        "Earth and Environmental Science",
        "Engineering",
        "Health Sciences",
        "Humanities",
        "Information and Computing Sciences",
        "Language, Communication and Culture",
        "Mathematics",
        "Meta Science",
        "Psychology",
        "Physics",
        "Studies in Creative Arts and Design",
        "Studies in Human Society",
        "Technology",
        "Other"
      ],
      countries: {
        asia: [
          "Afghanistan",
          "Bahrain",
          "Bangladesh",
          "Bhutan",
          "Brunei",
          "Burma (Myanmar)",
          "Cambodia",
          "China",
          "East Timor",
          "India",
          "Indonesia",
          "Iran",
          "Iraq",
          "Israel",
          "Japan",
          "Jordan",
          "Kazakhstan",
          "Korea, North",
          "Korea, South",
          "Kuwait",
          "Kyrgyzstan",
          "Laos",
          "Lebanon",
          "Malaysia",
          "Maldives",
          "Mongolia",
          "Nepal",
          "Oman",
          "Pakistan",
          "Philippines",
          "Qatar",
          "Russian Federation",
          "Saudi Arabia",
          "Singapore",
          "Sri Lanka",
          "Syria",
          "Tajikistan",
          "Thailand",
          "Turkey",
          "Turkmenistan",
          "United Arab Emirates",
          "Uzbekistan",
          "Vietnam",
          "Yemen"
        ],
        sAfrica: [
          "Angola",
          "Benin",
          "Botswana",
          "Burkina",
          "Burundi",
          "Cameroon",
          "Cape Verde",
          "Central African Republic",
          "Chad",
          "Comoros",
          "Congo",
          "Congo, Democratic Republic of",
          "Djibouti",
          "Equatorial Guinea",
          "Eritrea",
          "Ethiopia",
          "Gabon",
          "Gambia",
          "Ghana",
          "Guinea",
          "Guinea-Bissau",
          "Ivory Coast",
          "Kenya",
          "Lesotho",
          "Liberia",
          "Madagascar",
          "Malawi",
          "Mali",
          "Mauritania",
          "Mauritius",
          "Mozambique",
          "Namibia",
          "Niger",
          "Nigeria",
          "Rwanda",
          "Sao Tome and Principe",
          "Senegal",
          "Seychelles",
          "Sierra Leone",
          "Somalia",
          "South Africa",
          "South Sudan",
          "Sudan",
          "Swaziland",
          "Tanzania",
          "Togo",
          "Uganda",
          "Zambia",
          "Zimbabwe"
        ],
        nAfrica: ["Algeria", "Egypt", "Libya", "Morocco", "Tunisia"],
        europe: [
          "Albania",
          "Andorra",
          "Armenia",
          "Austria",
          "Azerbaijan",
          "Belarus",
          "Belgium",
          "Bosnia and Herzegovina",
          "Bulgaria",
          "Croatia",
          "Cyprus",
          "Czech Republic",
          "Denmark",
          "Estonia",
          "Finland",
          "France",
          "Georgia",
          "Germany",
          "Greece",
          "Hungary",
          "Iceland",
          "Ireland",
          "Italy",
          "Latvia",
          "Liechtenstein",
          "Lithuania",
          "Luxembourg",
          "Macedonia",
          "Malta",
          "Moldova",
          "Monaco",
          "Montenegro",
          "Netherlands",
          "Norway",
          "Poland",
          "Portugal",
          "Romania",
          "San Marino",
          "Serbia",
          "Slovakia",
          "Slovenia",
          "Spain",
          "Sweden",
          "Switzerland",
          "Ukraine",
          "United Kingdom",
          "Vatican City"
        ],
        oceania: [
          "Australia",
          "Fiji",
          "Kiribati",
          "Marshall Islands",
          "Micronesia",
          "Nauru",
          "New Zealand",
          "Palau",
          "Papua New Guinea",
          "Samoa",
          "Solomon Islands",
          "Tonga",
          "Tuvalu",
          "Vanuatu"
        ],
        sAmerica: [
          "Argentina",
          "Bolivia",
          "Brazil",
          "Chile",
          "Colombia",
          "Ecuador",
          "Guyana",
          "Paraguay",
          "Peru",
          "Suriname",
          "Uruguay",
          "Venezuela"
        ],
        nAmerica: [
          "Antigua and Barbuda",
          "Bahamas",
          "Barbados",
          "Belize",
          "Canada",
          "Costa Rica",
          "Cuba",
          "Dominica",
          "Dominican Republic",
          "El Salvador",
          "Grenada",
          "Guatemala",
          "Haiti",
          "Honduras",
          "Jamaica",
          "Mexico",
          "Nicaragua",
          "Panama",
          "Saint Kitts and Nevis",
          "Saint Lucia",
          "Saint Vincent and the Grenadines",
          "Trinidad and Tobago",
          "United States"
        ]
      },

      showDateMenu: false,
      showTimeMenu: false,
      project: {
        name: "",
        description: "",
        type: "",
        city: "",
        zone: "",
        contact_email: "",
        contact_firstname: "",
        contact_lastname: "",
        url: "",
        date: "",
        time: ""
      }
    };
  },
  props: {
    zones: Array
  },
  methods: {
    capitalize(input) {
      return (this.project[input] = this.project[
        input
      ].replace(/(?:^|[\s'-])\S/g, a => a.toUpperCase()));
    }
  }
};
</script>
