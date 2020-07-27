<template>
  <v-navigation-drawer
    v-if="$vuetify.breakpoint.smAndDown"
    v-model="drawer"
    app
    right
    bottom
    disable-resize-watcher
    @click:outside="$emit('close')"
  >
    <div class="d-flex flex-row-reverse">
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn
            class="ma-3"
            large
            icon
            @click="$emit('close')"
            v-on="on"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
        <span>Close the menu</span>
      </v-tooltip>
    </div>
    <v-divider />
    <v-list nav>
      <v-list-item-group active-class="text--accent-4">
        <v-list-item @click="$emit('about')">
          <v-list-item-title>About WPRN</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$emit('register')">
          <v-list-item-title>Register your project</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$emit('list')">
          <v-list-item-title>
            Browse projects
          </v-list-item-title>
        </v-list-item>
        <v-divider />
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
  .base-divider .v-divider {
    border-width: 3px 0 0 0 !important;
}
</style>
