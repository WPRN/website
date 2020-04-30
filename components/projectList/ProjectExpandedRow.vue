<template>
  <v-card
    v-show="expanded.includes(project)"
    class="pb-3"
    flat
    :max-width="$vuetify.breakpoint.width - 40"
    style="background-color:rgb(45, 45, 45);"
  >
    <v-card-text
      class="pb-0 white--text"
    >
      <v-row no-gutters>
        <!-- CONTACT -->
        <v-col
          cols="12"
          class="subtitle-1"
        >
          <span class="overline">CONTACT :</span>
          <br>
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
            <template v-else>
              ({{ project.contact_entity }})
            </template>
          </template>
          <v-btn
            color="primary"
            icon
          >
            text
          </v-btn>
        </v-col>
        <!-- DESCRIPTION -->
        <v-col
          cols="12"
          class="subtitle-1"
        >
          <span class="overline">Team and Project description</span>
          <br>
          <template v-if="project.description.length > 400">
            <template v-if="filters.search && filters.search.length">
              <p
                class="mb-0"
                v-html="
                  $options.filters.nl2br(
                    $options.filters.highlight(
                      $options.filters.truncate(
                        project.description,
                        400,
                        '(read more)',
                        '/item/' + project.pubId
                      ),
                      filters.search.split(' ')
                    )
                  )
                "
              />
            </template>
            <template v-else>
              <p
                class="mb-0"
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
          </template>
          <template v-else>
            <p
              class="mb-0"
              v-html="
                $options.filters.nl2br(
                  $options.filters.highlight(
                    project.description,
                    filters.search.split(' ')
                  )
                )
              "
            />
          </template>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        class="mr-6"
        :href="'/item/' + project.pubId"
        :small="$vuetify.breakpoint.smAndDown"
      >
        PROJECT PAGE
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>

export default {
  components: {
  },
  props: {
    project: Object,
    filters: Object,
    expanded: Array
  },
  data () {
    return {}
  },
  mounted () {},
  methods: {
  }
}
</script>
