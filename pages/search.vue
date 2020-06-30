<template>
  <v-container
    v-scroll="onScroll"
    app
    fluid
    fill-height
    style="align-items: start;"
  >
    <NavigationDrawer
      :drawer="drawer"
      @close="drawer = false"
      @register="$router.push({ path: '/', hash: 'register' })"
      @about="$router.push({ path: '/', hash: 'about-us' })"
      @list="drawer = false"
    />
    <TopBar
      value="/search"
      app
      @closeDrawer="drawer=!drawer"
    />
    <v-main
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
    </v-main>
    <v-fab-transition>
      <v-btn
        v-if="$vuetify.breakpoint.mdAndUp"
        v-show="offsetTop > 600"
        color="accent"
        dark
        fixed
        bottom
        right
        contained
        fab
        @click="$vuetify.goTo(0)"
      >
        <v-icon color="primary">
          mdi-arrow-up
        </v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>
<script>
import { zones } from '~/assets/data'
import ProjectList from '~/components/projectList/ProjectList'
import NavigationDrawer from '~/components/navigation/NavigationDrawer'
import TopBar from '~/components/navigation/TopBar'
export default {
  components: {
    ProjectList,
    TopBar,
    NavigationDrawer
  },
  data () {
    return {
      zones,
      drawer: false,
      offsetTop: 0
    }
  },
  watch: {
    '$route.params' () {}
  },
  mounted () {},
  methods: {
    onScroll (e) {
      this.offsetTop = e.target.scrollingElement.scrollTop
    }
  }
}
</script>
