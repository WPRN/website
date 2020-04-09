<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <template v-if="status==='FEATURED'">
        <v-icon v-on="on">mdi-star</v-icon>
      </template>
      <template v-else>
        <v-chip x-small dark :color="status==='PUBLISHED'?'red':'green'" v-on="on"></v-chip>
      </template>
    </template>
    <span v-if="status==='PUBLISHED'">This project has not been verified</span>
    <span v-if="status==='FEATURED'">This is a project featured by WPRN community</span>
    <span v-else>This project has been verified</span>
  </v-tooltip>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    status: String
  },
  methods: {},
  mounted() {}
};
</script>
