<template>
  <v-col
    cols="1"
    align="center"
  >
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <nuxt-link
          :to="url"
          style="text-decoration:none;"
        >
          <v-btn
            fab
            icon
            large
            class="mr-2"
            v-on="on"
          >
            <v-icon large>
              mdi-arrow-left
            </v-icon>
          </v-btn>
        </nuxt-link>
      </template>
      <span>Back to the main page</span>
    </v-tooltip>
  </v-col>
</template>
<script>
export default {
  props: {
    url: {
      type: String,
      default: '/'
    }
  }
}
</script>
