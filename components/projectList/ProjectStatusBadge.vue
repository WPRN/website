<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-chip x-small dark :color="status==='new'?'red':'green'" v-on="on"></v-chip>
    </template>
    <span v-if="status==='new'">This project has not been verified</span>
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
  mounted() {
    console.log(status);
  }
};
</script>
