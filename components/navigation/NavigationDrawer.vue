<template>
  <v-navigation-drawer
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
          <v-btn class="ma-3" large icon @click="$emit('close')" v-on="on">
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
        <v-list-item @click="$emit('featured')">
          <v-list-item-title>Featured projects</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$emit('register')">
          <v-list-item-title>Register your project</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$emit('contact')">
          <v-list-item-title>Contact us</v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item class="mt-3 px-0">
          <v-list-item-title>
            <v-btn color="white" outlined block large @click="$emit('list')">Browse projects</v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    drawer: Boolean
  }
}
</script>
