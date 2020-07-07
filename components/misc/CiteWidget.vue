<template>
  <v-col
    cols="12"
    class="subtitle-1"
  >
    <span class="overline">To cite this project in your research</span>
    <br>
    <v-sheet
      light
      elevation="3"
      class="pa-3 mt-3"
    >
      <v-row no-gutters>
        <v-col class="align-self-center">
          {{ project.contact_lastname }}, {{ project.contact_firstname }}.
          <b>&ldquo;{{ project.name }}&rdquo;</b>.
          <em>World Pandemic Research Network</em>
          . WPRN-{{ project.pubId }},
          {{ project.createdAt.split("T")[0] }} at
          {{ project.createdAt.split("T")[1].split(":")[0] }}h{{
            project.createdAt.split("T")[1].split(":")[1]
          }}
          (GMT):
          <a
            :href="'https://wprn.org/item/' + project.pubId"
            target="_blank"
            rel="noopener noreferrer"
          >https://wprn.org/item/{{ project.pubId }}</a>
          <input
            id="cite"
            type="hidden"
            :value="
              project.contact_lastname +
                ', ' +
                project.contact_firstname +
                '.“' +
                project.name +
                '”. World Pandemic Research Network. WPRN-' +
                project.pubId +
                ', ' +
                project.createdAt.split('T')[0] +
                ' at ' +
                project.createdAt.split('T')[1].split(':')[0] +
                'h' +
                project.createdAt.split('T')[1].split(':')[1] +
                ' (GMT):'
            "
          >
        </v-col>
        <v-col
          cols="auto"
          class="align-self-center mx-auto text-centered"
        >
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                large
                tile
                v-on="on"
                @click="copyToClipBoard()"
              >
                <v-icon large>
                  mdi-content-copy
                </v-icon>
              </v-btn>
            </template>
            <span>Copy to clipboard</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-sheet>
  </v-col>
</template>
<script>
export default {
  props: {
    project: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    copyToClipBoard () {
      const copyNode = document.querySelector('#cite')
      copyNode.setAttribute('type', 'text')
      copyNode.select()
      try {
        document.execCommand('copy')
        this.$emit('copied')
      } catch (err) {
        //
      }
      /* unselect the range */
      copyNode.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
    }
  }

}
</script>
