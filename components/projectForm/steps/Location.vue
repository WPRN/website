<template>
  <v-stepper-content step="3">
    <v-card
      min-height="320px"
      flat
      light
      color="#333333"
    >
      <v-form
        ref="locationForm"
        lazy-validation
      >
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
              v-model="zone"
              :items="zones"
              label="Continent*"
              solo
              multiple
              :rules="requiredRules"
              :clearable="
                !(
                  zone.length === 1 &&
                  zone.includes('worldwide')
                )
              "
              :disabled="loading"
              @click:clear="
                country = []
                zone = ['worldwide']
              "
              @change="setCountries()"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-combobox
              v-model="country"
              :disabled="zone.length === 0 || loading"
              :items="countrySet"
              label="Country"
              solo
              multiple
              no-data-text="No country matching your search"
              clearable
              @change="cleanModel()"
            >
              <template v-slot:selection="{ item, index }">
                <div
                  v-if="index < 5"
                  class="v-select__selection v-select__selection--comma"
                >
                  {{ item }}
                  <template v-if="index < 4 && index < country.length-1">
                    ,
                  </template>
                </div>
                <span
                  v-if="index === 5"
                  class=" caption"
                >(+{{ country.length - 5 }} {{ country.length - 3 === 1 ?'other':'others' }})</span>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="location"
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
      @click="$store.commit('form/updateProject', {zone, continent, country, location});$emit('nextStep', 2)"
    >
      Previous
    </v-btn>
    <v-btn
      color="accent"
      :disabled="zone.length === 0"
      x-large
      @click="$store.commit('form/updateProject', {zone, continent, country, location});$emit('nextStep', 4)"
    >
      Continue&nbsp;
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-stepper-content>
</template>
<script>
import {
  zones,
  countries
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
      countries,
      zone: this.editMode ? this.projectInput.zone : '',
      continent: this.editMode ? this.projectInput.continent : '',
      country: this.editMode ? this.projectInput.country : '',
      location: this.editMode ? this.projectInput.location : '',
      countrySet: Object.keys(countries)
        .map((countryKey) => countries[countryKey])
        .flat()
        .sort(),
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
    this.editMode && this.$refs.locationForm.validate()
  },
  updated () {
    this.editMode && this.$store.commit('form/setStepError', { id: 'location', value: !this.$refs.locationForm.validate() })
  },
  methods: {
    setCountries () {
      let newCountrySet = []
      this.continent = []
      // Remove worldwide if a continent is selected
      if (
        this.zone.length > 1 &&
        this.zone.includes('worldwide')
      ) {
        if (this.zone[this.zone.length - 1] === 'worldwide') {
          // did we just add worlwide?
          this.zone = ['worldwide']
        } else {
          this.zone = this.zone.filter(
            (item) => item !== 'worldwide'
          )
        }
      }

      if (
        this.zone.length === 1 &&
        this.zone.includes('worldwide')
      ) {
        newCountrySet = Object.keys(this.countries)
          .map((countryKey) => this.countries[countryKey])
          .flat()
          .sort()
      } else {
        this.zone.forEach((zone) => {
          newCountrySet.push(this.countries[zone])
        })
      }
      newCountrySet = newCountrySet.flat().sort()
      if (this.country.length > 0) {
        this.country = this.country.filter((country) =>
          newCountrySet.includes(country)
        )
        if (
          this.zone.length === 1 &&
          this.zone.includes('worldwide')
        ) {
          this.country.forEach((country) => {
            Object.keys(this.countries).forEach((cont) => {
              if (this.countries[cont].includes(country) &&
              !this.continent.includes(cont)) {
                this.continent.push(cont)
              }
            })
          })
        } else if (this.zone.length > 1) {
          this.zone.forEach((zone) => {
            this.continent.push(zone)
          })
        }
      }
      this.countrySet = newCountrySet
    },
    cleanModel () {
      if (this.country.length > 0) {
        if (
          this.zone.length === 1 &&
          this.zone.includes('worldwide')
        ) {
          // prevent copy by reference from store
          this.continent = this.continent.slice()
          this.country.forEach((country) => {
            Object.keys(this.countries).forEach((cont) => {
              if (this.countries[cont].includes(country) &&
                !this.continent.includes(cont)) {
                this.continent.push(cont)
              }
            })
          })
        }
      }
      return (this.country = this.country.filter((item) =>
        this.countrySet.includes(item)
      ))
    }
  }
}
</script>
