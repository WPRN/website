<template>
  <v-dialog
    v-model="open"
    max-width="800"
    persistent
  >
    <v-card>
      <v-card-title>
        Add a feedback for the WPRN referents (Optional)
      </v-card-title>

      <v-card-text class="white--text body-1">
        <v-textarea
          v-model="feedback"
          filled
          label="Your feedback text (Optional)"
          counter="1500"
          rows="10"
        />
      </v-card-text>

      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="accent"
          class="ma-2"
          @click="$emit('cancel')"
        >
          Cancel
        </v-btn>
        <v-btn
          color="success"
          class="ma-2"
          @click="updateProject()"
        >
          Edit this project &nbsp;<v-icon>mdi-send</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: true
    },
    project: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      // TODO add rules for feedback (length min max) + counters on the field
      feedback: ''
    }
  },
  methods: {
    async updateProject () {
      try {
        this.$emit('update', this.feedback)
      } catch (error) {
        console.log('error: ', error)
      }
    }
  }
}
</script>
