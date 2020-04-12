<template>
  <div>
    <v-form lazy-validation color="#333333">
      <v-col cols="12">
        <v-text-field
          v-model="contact.name"
          label="Name*"
          @blur="capitalize('name')"
          solo
          :rules="contactNameRules"
          ref="name"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field v-model="contact.email" label="Email*" solo :rules="emailRules" ref="email"></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="contact.subject"
          label="Subject*"
          solo
          :rules="subjectRules"
          ref="subject"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-textarea
          counter="1000"
          v-model="contact.message"
          label="Message*"
          solo
          :rules="messageRules"
          ref="message"
        ></v-textarea>
      </v-col>
      <div class="text-center white--text">
        <div class="mb-8">
          <small>
            This site is protected by reCAPTCHA and the Google
            <a
              href="https://policies.google.com/privacy"
            >Privacy Policy</a> and
            <a href="https://policies.google.com/terms">Terms of Service</a> apply.
          </small>
        </div>
        <v-btn
          color="success"
          x-large
          @click="onSubmit()"
          :loading="sending"
          :disabled="!(
          $refs.name&&$refs.name.valid&&
          $refs.message&&$refs.message.valid&&
          $refs.subject&&$refs.subject.valid&&
          $refs.email&&$refs.email.valid)"
        >
          Submit&nbsp;
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </div>
    </v-form>
  </div>
</template>
<script>
import { alpha, pattern, email } from "~/assets/regex";
import { newContact } from "../../../backend/src/graphql/mutations";
import gql from "graphql-tag";
import client from "~/plugins/amplify";
export default {
  data() {
    return {
      sending: false,
      contact: {
        name: "",
        email: "",
        subject: "",
        message: ""
      },
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
      emailRules: [
        value => !!value || "Email address required.",
        value => (value || "").length <= 61 || "Max 60 characters",
        value => {
          return email.test(value) || "Invalid e-mail.";
        }
      ],
      subjectRules: [
        value => !!value || "Required.",
        value =>
          value.length >= 5 ||
          "Your message subjects must have at least 4 characters",
        value => value.length <= 40 || "Max 40 characters",
        value => {
          return true;
        }
      ],

      messageRules: [
        value => !!value || "A message is required.",
        value =>
          value.length >= 20 ||
          "The message text must have at least 20 characters",
        value => value.length <= 1000 || "Max 1000 characters"
      ]
    };
  },
  async mounted() {
    /*    await this.$recaptcha.init();
     */
  },
  methods: {
    capitalize(input) {
      return (this.contact[input] = this.contact[
        input
      ].replace(/(?:^|[\s'-])\S/g, a => a.toUpperCase()));
    },
    async onSubmit() {
      /*  this.$emit("WorkInProgressDialogToggle"); */
      try {
        this.sending = true;
        let args = this.contact;

        if (this.id) args.relatedProjectId = this.id;
        Object.keys(this.contact).forEach(key => {
          if (!args[key] || args[key].length === 0) delete args[key];
        });

        args.recaptcha = await this.$recaptcha.getResponse();
        const res = await client.mutate({
          mutation: gql(newContact),
          variables: { input: args }
        });

        if (res && !res.errors) {
          this.$emit("complete");
        } else {
          this.error = true;
        }
        this.sending = false;
        await this.$recaptcha.reset();
      } catch (error) {
        this.error = true;
        this.sending = false;
        await this.$recaptcha.reset();
      }
    }
  },
  props: {
    id: String
  }
};
</script>
