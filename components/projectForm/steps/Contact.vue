<template>
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
              v-model="contact_firstname"
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
              v-model="contact_lastname"
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
              v-model="contact_entity"
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
              v-model="contact_email"
              label="Contact Email*"
              solo
              :rules="emailRules"
              @keyup.enter="
                $refs.firstname &&
                  $refs.firstname.valid &&
                  $refs.lastname &&
                  $refs.lastname.valid &&
                  $refs.email &&
                  $refs.email.valid &&
                  $refs.entity &&
                  $refs.entity.valid &&
                  $store.commit('form/updateProject', {contact_firstname, contact_lastname, contact_email, contact_entity}) &&
                  $emit('nextStep', 5)
              "
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card>

    <v-btn
      text
      @click="$store.commit('form/updateProject', {contact_firstname, contact_lastname, contact_email, contact_entity});$emit('nextStep', 3)"
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
      @click="$store.commit('form/updateProject', {contact_firstname, contact_lastname, contact_email, contact_entity});$emit('nextStep', 5)"
    >
      Continue&nbsp;
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-stepper-content>
</template>
<script>
import { alpha, email } from '~/assets/regex'
export default {
  props: {
    projectInput: Object,
    editMode: Boolean
  },
  data () {
    return {
      contact_firstname: this.editMode ? this.projectInput.contact_firstname : '',
      contact_lastname: this.editMode ? this.projectInput.contact_lastname : '',
      contact_email: this.editMode ? this.projectInput.contact_email : '',
      contact_entity: this.editMode ? this.projectInput.contact_entity : '',
      requiredRules: [
        (value) => !!value || 'This field is required.',
        (value) =>
          value === undefined ||
          value === true ||
          !!value.length ||
          'This field is required.'
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
      emailRules: [
        (value) => !!value || 'Email address required.',
        (value) => (value || '').length <= 61 || 'Max 60 characters',
        (value) => {
          return email.test(value) || 'Invalid e-mail.'
        }
      ]
    }
  },
  methods: {
    capitalize (input) {
      return (this[input] = this[input].replace(/(?:^|[\s'-])\S/g, (a) => a.toUpperCase()))
    }
  }
}
</script>
