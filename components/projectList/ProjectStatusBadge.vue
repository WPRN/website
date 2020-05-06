<template>
  <span :class="{'pt-1 pr-3':!details}">
    <template v-if="status === 'xFEATURED'">
      <v-icon>mdi-star</v-icon>
    </template>
    <template v-else>
      <template v-if="status === 'PUBLISHED'">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-sheet
              style="height: 16px; width: 16px; border-radius: 12px;"
              color="grey"
              v-on="on"
            />
          </template>
          <span>This project has not been verified</span>
        </v-tooltip>
      </template>
      <template v-else>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-sheet
              style="height: 16px; width: 16px; border-radius: 12px;"
              color="green"
              v-on="on"
            />
          </template>
          <span>This project has been verified</span>
        </v-tooltip>
      </template>
    </template>
  </span>
</template>
<script>
export default {
  props: {
    status: {
      type: String,
      default: 'PUBLISHED'
    },
    details: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  mounted () {},
  methods: {}
}
</script>
