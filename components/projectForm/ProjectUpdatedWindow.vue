<template>
  <v-card
    :flat="$vuetify.theme.isDark"
    min-height="320px"
    class="pa-4 text-center"
    align="center"
  >
    <v-icon
      x-large
      color="success"
      class="py-6"
    >
      mdi-check-outline
    </v-icon>
    <h3 class="headline font-weight-heavy mb-2">
      YOUR PROJECT HAS BEEN SUCCESSFULLY UPDATED!
    </h3>
    <div class="subtitle-1">
      Thank you again for your contribution.
    </div>
    <br>
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
