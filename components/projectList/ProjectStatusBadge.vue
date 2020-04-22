<template>
  <span>
    <template v-if="status==='xFEATURED'">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on">mdi-star</v-icon>
        </template>
        <span>This is a project featured by WPRN community</span>
      </v-tooltip>
    </template>
    <template v-else>
      <template v-if="status==='PUBLISHED'">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-sheet style="height:18px;width:18px; border-radius:12px" color="red" v-on="on"></v-sheet>
          </template>
          <span>This project has not been verified</span>
        </v-tooltip>
      </template>
      <template v-else>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-sheet style="height:18px;width:18px; border-radius:12px" color="green" v-on="on"></v-sheet>
          </template>
          <span>This project has been verified</span>
        </v-tooltip>
      </template>
    </template>
  </span>
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
