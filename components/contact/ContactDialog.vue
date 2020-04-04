<template>
  <v-dialog
    v-model="open"
    persistent
    max-width="600"
    light
    @click:outside="$emit('close')"
    style="background-color:#333333;"
  >
    <v-row justify="center" fluid>
      <v-col col="12">
        <v-card flat color="#333333" class="pa-6">
          <v-card-title class="white--text">
            {{ complete?'THANK YOU FOR YOUR INPUT':'GET IN TOUCH WITH A PROJECT CONTACT'}}
            <v-spacer></v-spacer>
            <v-btn icon color="white" @click="$emit('close')">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text v-if="!complete">
            <ContactForm :id="id" @complete="complete=true" />
          </v-card-text>
          <template v-else>
            <v-card-text class="d-flex align-center">
              <ContactPostedWindow dark />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="accent" @click="$emit('close')">Close</v-btn>
            </v-card-actions>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-dialog>
</template>
<script>
import ContactForm from "./ContactForm";
import ContactPostedWindow from "./ContactPostedWindow";
export default {
  data() {
    return {
      complete: false
    };
  },
  components: {
    ContactForm,
    ContactPostedWindow
  },
  props: {
    open: Boolean,
    id: String
  }
};
</script>
