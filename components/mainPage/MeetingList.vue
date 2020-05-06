<template>
  <v-row>
    <v-col cols="12">
      <v-list
        subheader
        light
      >
        <v-list-item
          v-for="(item, index) in events"
          :key="index"
        >
          <v-list-item-avatar>
            <v-img :src="item.avatar" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.name" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    /* events: Array, */
  }
}
</script>
