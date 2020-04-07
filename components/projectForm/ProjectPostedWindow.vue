<template>
  <v-card flat min-height="320px" class="pa-4 text-center" align="center">
    <v-icon x-large color="success" class="py-6">mdi-check-outline</v-icon>
    <h3 class="headline font-weight-heavy mb-2">YOUR PROJECT HAS BEEN SUCCESSFULLY REGISTERED!</h3>
    <div class="subtitle-1">
      You will receive a confirmation email shortly
      <b>with a link to check that your email address is a real one</b>.
      <br />Once you verify your email, your project will be displayed in the
      <nuxt-link to="/worldwide">project list</nuxt-link>&nbsp;as "not verified" until it is validated by a WPRN moderator.
      <br />You might be contacted by the moderator to correct some of your project information.
      <br />Thank you again for your contribution.
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
