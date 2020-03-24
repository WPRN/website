<template>
  <v-card flat min-height="320px" class="pa-4 text-center" align="center">
    <v-icon x-large color="success" class="py-6">mdi-check-outline</v-icon>
    <h3 class="headline font-weight-heavy mb-2">YOUR PROJECT HAS BEEN SUCCESSFULLY REGISTERED!</h3>
    <div class="subtitle-1">
      You should receive an email confirming your project registering shortly. It will be displayed in the
      <nuxt-link to>project list</nuxt-link>&nbsp;as "not validated" until it is validated by a WPRN moderator.
      <br />You might be contacted by the moderator to correct some of your project information.
    </div>
    <br />
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn class large color="acent" @click="$emit('reset')" v-on="on" align="right">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </template>
        <span>Register another project</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>
