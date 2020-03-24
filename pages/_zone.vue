<template>
  <v-container fluid fill-height>
    <v-row align-self-start>
      <v-col cols="12">
        Country Screen {{$route.params.zone}}
        <ProjectList />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { zones, countries, types, fields } from "~/assets/data";
import ProjectList from "~/components/projectList/ProjectList";
export default {
  components: {
    ProjectList
  }
};
</script>
