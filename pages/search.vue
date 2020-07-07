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
          <v-card>
            <v-card-text :class="$vuetify.breakpoint.mdAndUp ? 'px-3' : 'pl-3'">
              <ProjectList />
            </v-card-text>
          </v-card>
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
  },
  mounted () {},
  methods: {
  }
}
</script>
