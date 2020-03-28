<template>
  <v-row justify="center">
    <v-dialog v-model="open" persistent max-width="600" color="#333333">
      <ContactForm />
    </v-dialog>
  </v-row>
</template>
<script>
import ContactForm from "./ContactForm";
export default {
  components: {
    ContactForm
  },
  props: {
    open: Boolean
  }
};
</script>
