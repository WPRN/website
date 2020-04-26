<template>
  <v-card flat min-height="320px" class="pa-4 text-center" align="center">
    <v-icon x-large color="success" class="py-6">mdi-check-outline</v-icon>
    <h3 class="headline font-weight-heavy mb-2">YOUR PROJECT HAS BEEN SUCCESSFULLY REGISTERED!</h3>
    <div class="subtitle-1">
      You will receive a confirmation email shortly
      <b>with a link to ensure that your email address is valid</b>.
      <br />Once
      your email is validated, your project will be displayed in the
      <nuxt-link to="/search">project list</nuxt-link>&nbsp;as "not verified"
      until it is checked by a WPRN Referent.
      <br />You may be contacted by the
      referent to correct some of your project information.
      <br />Thank you
      again for your contribution.
    </div>
    <br />
    <!--     <v-card-actions>
      <v-spacer></v-spacer>e
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
