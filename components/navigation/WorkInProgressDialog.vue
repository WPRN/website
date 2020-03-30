<template>
  <v-dialog
    v-model="dialog"
    transition="fade-transition"
    :max-width="$vuetify.breakpoint.mdAndUp?'60vw':'90vw'"
    @click:outside="$emit('close')"
  >
    <v-card dark>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="text-center pa-6">
        <Logo />
        <h2 class="display-2 text--uppercase my-3">Welcome</h2>
        <div class="title my-3">
          The
          <span class="font-italic">World Pandemic Research Network</span> website is still under development.
          <br />We are working hard to release it on April 6, 2020.
          <br />Meanwhile, you can browse it to discover our initiative and the project registering process that will be online soon.
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import Logo from "~/components/navigation/Logo";
export default {
  props: {
    dialog: Boolean
  },
  components: {
    Logo
  }
};
</script>
