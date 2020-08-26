<template>
  <ProjectList />
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
