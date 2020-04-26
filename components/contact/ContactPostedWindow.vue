<template>
  <v-card flat min-height="320px" class="pa-4 text-center" align="center" :dark="dark">
    <v-icon x-large color="success" class="py-6">mdi-check-outline</v-icon>
    <h3 class="headline font-weight-heavy mb-2">YOUR CONTACT REQUEST HAS BEEN SENT!</h3>

    <br />
    <!--     <v-card-actions>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn class large color="acent" @click="$emit('reset')" v-on="on" align="right">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </template>
        <span>Register another project</span>
      </v-tooltip>
    </v-card-actions>-->
  </v-card>
</template>
<script>
export default {
  props: {
    dark: Boolean
  }
}
</script>
