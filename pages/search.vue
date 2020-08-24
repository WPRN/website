<template>
  <v-container
    app
    fluid
    fill-height
    style="align-items: start;"
  >
    <v-content
      class="pt-3"
    >
      <v-row
        no-gutters
      >
        <v-col cols="12">
          <ProjectList />
        </v-col>
      </v-row>
    </v-content>
  </v-container>
</template>
<script>
import { zones } from '~/assets/data'
import ProjectList from '~/components/projectList/ProjectList'
export default {
  components: {
    ProjectList
  },
  data () {
    return {
      zones
    }
  },
  watch: {
    '$store.state.tab': function () {
      if ([0, 1].includes(this.$store.state.tab)) {
        this.$router.push('/')
      }
    }
  },
  mounted () {},
  methods: {
  }
}
</script>
