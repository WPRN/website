<template>
  <v-navigation-drawer v-model="drawer" app bottom right temporary>
    <v-list nav class="mt-6">
      <v-list-item-group active-class="text--accent-4">
        <v-list-item @click="$vuetify.goTo('#about-us', {offset:100});$emit('closed')">
          <v-list-item-title>About us</v-list-item-title>
        </v-list-item>

        <v-list-item @click="$vuetify.goTo('#missions', {offset:100});$emit('closed')">
          <v-list-item-title>Our missions</v-list-item-title>
        </v-list-item>

        <v-list-item @click="$vuetify.goTo('#branches', {offset:100});$emit('closed')">
          <v-list-item-title>Continental branches</v-list-item-title>
        </v-list-item>

        <v-list-item @click="$vuetify.goTo('#meetings', {offset:100});$emit('closed')">
          <v-list-item-title>Next meetings</v-list-item-title>
        </v-list-item>

        <v-list-item @click="$vuetify.goTo('#featured', {offset:100});$emit('closed')">
          <v-list-item-title>Featured projects</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$vuetify.goTo('#contact', {offset:100});$emit('contact', false)">
          <v-list-item-title>Register your project</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$vuetify.goTo('#contact', {offset:100});$emit('contact', true)">
          <v-list-item-title>Contact us</v-list-item-title>
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
};
</script>
