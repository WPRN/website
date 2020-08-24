<template>
  <v-card
    v-show="expanded.includes(project)"
    class="pb-3"
    flat
    :max-width="$vuetify.breakpoint.width - 70"
    :style="$vuetify.theme.isDark?'background-color:rgb(45, 45, 45);':'background-color:#F5F5F5'"
  >
    <v-card-text
      class="pb-0  px-3"
      :class="$vuetify.theme.isDark?'white--text':'black--text'"
    >
      <v-row no-gutters>
        <!-- CONTACT -->
        <v-col
          cols="12"
          class="font-weight-medium body-1"
        >
          <span class="overline">CONTACT :</span>
          <br>
          <v-tooltip
            v-if="!isNotContactable()"
            bottom
          >
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                icon
                v-on="on"
                @click="$emit('contact')"
              >
                <v-icon>mdi-email</v-icon>
              </v-btn>
            </template>
            <span>Email this project contact</span>
          </v-tooltip>
          <template
            v-if="!isNotContactable()"
          >
            <span
              v-html="
                $options.filters.highlight(
                  project.contact_lastname,
                  filters.search.split(' ')
                )
              "
            />
            {{ ", " + project.contact_firstname }}
            <template
              v-if="project.contact_entity"
            >
              <template v-if="filters.search && filters.search.length">
                <span
                  v-html="
                    '(' +
                      $options.filters.highlight(
                        project.contact_entity,
                        filters.search.split(' ')
                      ) +
                      ')'
                  "
                />
              </template>
              <template
                v-else
              >
                ({{ project.contact_entity }})
              </template>
            </template>
          </template>
          <template v-else>
            <template
              v-if="project.contact_entity"
            >
              <template v-if="filters.search && filters.search.length">
                <span
                  v-html="
                    $options.filters.highlight(
                      project.contact_entity,
                      filters.search.split(' ')
                    )
                  "
                />
              </template>
              <template
                v-else
              >
                {{ project.contact_entity }}
              </template>
            </template>
          </template>
        </v-col>
        <!-- DESCRIPTION -->
        <v-col
          cols="12"
          class="font-weight-medium body-1"
        >
          <span class="overline">Team and Project description:</span>
          <br>
          <template v-if="filters.search && filters.search.length">
            <p
              class="font-weight-medium body-1 mb-0"
              v-html="
                $options.filters.nl2br(
                  $options.filters.highlightAndTruncate(
                    project.description,
                    filters.search.split(' '),
                    '/item/' + project.pubId,
                    '(read more)'
                  )
                )
              "
            />
          </template>
          <template v-else>
            <p
              class="font-weight-medium body-1mb-0"
              v-html="
                $options.filters.nl2br(
                  $options.filters.truncate(
                    project.description,
                    400,
                    '(read more)',
                    '/item/' + project.pubId
                  )
                )
              "
            />
          </template>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer v-if="$vuetify.breakpoint.mdAndUp" />
      <v-btn
        color="primary"
        class="mr-6"
        :href="'/item/' + project.pubId"
        :block="$vuetify.breakpoint.smAndDown"
      >
        PROJECT PAGE
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import {
  extendedTypes
} from '~/assets/data'
export default {
  components: {
  },
  props: {
    project: {
      type: Object,
      default: () => {}
    },
    filters: {
      type: Object,
      default: () => {}
    },
    expanded: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      extendedTypes
    }
  },
  mounted () {},
  methods: {
    computeRowColor (item, hover) {
      if (this.expanded.includes(item) &&
      hover &&
      this.$vuetify.theme.isDark
      ) return 'background-color:#616161'
      if (this.expanded.includes(item) &&
      !hover &&
      this.$vuetify.theme.isDark
      ) return 'background-color:rgb(45, 45, 45);'
      if (this.expanded.includes(item) &&
      hover &&
      !this.$vuetify.theme.isDark
      ) return 'background-color:#BDBDBD;'
      if (this.expanded.includes(item) &&
      !hover &&
      !this.$vuetify.theme.isDark
      ) return 'background-color:#F5F5F5;'
      return ''
    },
    isNotContactable () {
      return this.project.type.length === 1 && extendedTypes.some(item => !item.isContactable && this.project.type.includes(item.name))
    }
  }
}
</script>
