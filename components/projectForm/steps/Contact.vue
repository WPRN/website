<template>
  <v-stepper-content step="4">
    <v-card
      min-height="320px"
      flat
      light
      color="transparent"
    >
      <v-form
        ref="contactForm"
        lazy-validation
      >
        <v-row>
          <v-col
            cols="12"
          >
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
          </v-col>

          <v-col
            cols="12"
          >
            <h3 class="white--text mb-3 text-uppercase text-center">
              Project Contact
            </h3>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              ref="firstname"
              v-model="contact_firstname"
              :label="isRequireName() ? 'Contact firstname*' : 'Contact firstname'"
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
              :label="isRequireName() ? 'Contact lastname*' : 'Contact lastname'"
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
              :label="isRequireName() ? 'Contact Email*' : 'Contact Email'"
              solo
              :rules="emailRules"
              @keyup.enter="/*
                $refs.firstname &&
                  $refs.firstname.valid &&
                  $refs.lastname &&
                  $refs.lastname.valid &&
                  $refs.email &&
                  $refs.email.valid &&
                  $refs.entity &&
                  $refs.entity.valid &&
                  $store.commit('form/updateProject', {contact_firstname, contact_lastname, contact_email, contact_entity, team}) &&
                  $emit('nextStep', 5)
              */"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
          >
            <v-divider />
            <h3 class="white--text mt-6 text-uppercase text-center">
              Project Team Members <span v-if="isTeamMandatory()">*</span>
            </h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              ref="firstname"
              v-model="firstname"
              :label="isTeamMandatory()?'Team member firstname*':'Team member firstname'"
              solo
              :rules="teamNameRules"
              @blur="capitalize('firstname')"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              ref="lastname"
              v-model="lastname"
              :label="isTeamMandatory()?'Team member lastname*':'Team member lastname'"
              solo
              :rules="teamNameRules"
              @blur="capitalize('lastname')"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              ref="entity"
              v-model="entity"
              :label="isTeamMandatory()?'Team member Institution* (University, Laboratory, freelance...)':'Team member Institution (University, Laboratory, freelance...)'"
              solo
              :rules="requiredTeamRules"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-btn
              color="accent"
              x-large
              block
              dark
              :disabled="
                !(
                  $refs.firstname &&
                  $refs.firstname.valid &&
                  $refs.lastname &&
                  $refs.lastname.valid &&
                  $refs.entity &&
                  $refs.entity.valid &&
                  firstname.length > 0 &&
                  lastname.length > 0 &&
                  entity.length > 0
                )
              "
              @click="addTeamMember({firstname, lastname, entity})"
            >
              <v-icon>mdi-account-plus</v-icon>&nbsp;
              Add Member
            </v-btn>
          </v-col>
        </v-row>
        <v-list
          v-if="team && team.length"
          two-line
          class="mb-3 py-0"
        >
          <template v-for="(item, index) in team">
            <v-list-item
              :key="index"
              :ripple="false"
            >
              <template>
                <v-list-item-content class="py-0">
                  <v-list-item-title
                    class="text-left"
                    v-text="item.firstname+' '+item.lastname"
                  />
                  <v-list-item-subtitle
                    class="text-left"
                    v-text="item.entity"
                  />
                </v-list-item-content>

                <v-list-item-action>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        icon
                        @click="team = team.filter((member, i) => index !== i)"
                        v-on="on"
                      >
                        <v-icon
                          color="black"
                        >
                          mdi-delete
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Remove this team member</span>
                  </v-tooltip>
                </v-list-item-action>

                <v-list-item-action class="my-0">
                  <v-btn
                    icon
                    :disabled="team.length<2||index===0"
                    @click="moveUp(index)"
                  >
                    <v-icon
                      color="black"
                    >
                      mdi-chevron-up
                    </v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    :disabled="team.length<2||index===team.length-1"
                    @click="moveDown(index)"
                  >
                    <v-icon
                      color="black"
                    >
                      mdi-chevron-down
                    </v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-list-item>
            <v-divider
              v-if="index < team.length-1"
              :key="'divider' + index"
              inset
            />
          </template>
        </v-list>
      </v-form>
    </v-card>

    <v-btn
      text
      @click="$store.commit('form/updateProject', {contact_firstname, contact_lastname, contact_email, contact_entity});$emit('nextStep', 3)"
    >
      Previous
    </v-btn>
    <v-btn
      color="primary"
      :disabled="
        !(
          $refs.firstname &&
          $refs.firstname.valid &&
          $refs.lastname &&
          $refs.lastname.valid &&
          (editMode ? true : $refs.email && $refs.email.valid) &&
          $refs.entity &&
          $refs.entity.valid &&
          (isTeamMandatory()? $store.state.form.project.team.length >0:true)
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
import {
  extendedTypes
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
      extendedTypes,
      contact_firstname: this.editMode ? this.projectInput.contact_firstname : '',
      contact_lastname: this.editMode ? this.projectInput.contact_lastname : '',
      contact_email: this.editMode ? this.projectInput.contact_email : '',
      contact_entity: this.editMode ? this.projectInput.contact_entity : '',
      firstname: '',
      lastname: '',
      entity: '',
      requiredRules: [
        (value) => !!value || 'This field is required.',
        (value) =>
          value === undefined ||
          value === true ||
          !!value.length ||
          'This field is required.'
      ],
      contactNameRules: [
        (value) => !!value || !this.isRequireName() || 'Required.',
        (value) =>
          alpha.test(value) ||
          "No digits or special characters (except ' and -) allowed",
        (value) => ((!!value && value.length <= 80) || (!value && !this.isRequireName())) || 'Max 80 characters'
      ],
      emailRules: [
        (value) => !!value || !this.isRequireName() || 'Email address required.',
        (value) => (value || '').length <= 60 || 'Max 60 characters',
        (value) => {
          return value.length === 0 || email.test(value) || 'Invalid e-mail.'
        }
      ],
      teamNameRules: [
        (value) => !!value || value.length === 0 || 'Required.',
        (value) =>
          alpha.test(value) ||
          "No digits or special characters (except ' and -) allowed",
        (value) => (value.length <= 80) || 'Max 80 characters'
      ],
      requiredTeamRules: [
        (value) => !!value || value.length === 0 || 'This field is required.',
        (value) => (value.length <= 80) || 'Max 80 characters'
      ]
    }
  },
  computed: {
    team: {
      get () {
        return this.$store.state.form.project.team
      },
      set (newValue) {
        return this.$store.commit('form/setTeam', newValue)
      }
    }
  },
  mounted () {
    if (this.editMode) {
      this.team = this.projectInput.team || [{firstname: this.contact_firstname, lastname: this.contact_lastname, entity: this.contact_entity}]
    } else {
      this.team = []
    }
    this.editMode && this.$refs.contactForm.validate()
  },
  updated () {
    this.editMode && this.$store.commit('form/setStepError', { id: 'contact', value: !this.$refs.contactForm.validate() || (this.isTeamMandatory() && !this.team.length) })
  },
  methods: {
    capitalize (input, index) {
      if (index !== undefined) return (this.team[index][input] = this.team[index][input].replace(/(?:^|[\s'-])\S/g, (a) => a.toUpperCase()))
      return (this[input] = this[input].replace(/(?:^|[\s'-])\S/g, (a) => a.toUpperCase()))
    },
    isRequireName () {
      return extendedTypes.some(item => item.requireName && this.$store.state.form.project.type.includes(item.name))
    },
    isTeamMandatory () {
      return extendedTypes.some(item => item.teamMandatory && this.$store.state.form.project.type.includes(item.name))
    },
    addTeamMember (member) {
      this.team = this.team ? [...this.team, member] : [member]
      this.firstname = ''
      this.lastname = ''
      this.entity = ''
    },
    moveUp (index) {
      this.moveItem(index, index - 1)
    },
    moveDown (index) {
      this.moveItem(index, index + 1)
    },
    moveItem (from, to) {
      let newTeam = this.team.slice()
      let f = newTeam.splice(from, 1)[0]
      newTeam.splice(to, 0, f)
      this.team = newTeam
    }
  }
}
</script>
