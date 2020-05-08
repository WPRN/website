<template>
  <section id="shareProject">
    <div class="py-12" />

    <v-container>
      <h2
        class="display-2 font-weight-bold mb-3 text-uppercase text-center"
      >
        Share a project or resource
      </h2>

      <v-responsive
        class="mx-auto mb-12"
        width="56"
      >
        <v-divider
          class="mb-1"
        />

        <v-divider />
      </v-responsive>

      <v-row>
        <v-col
          cols="12"
          md="6"
          class="pa-3"
        >
          <v-hover
            v-slot:default="{ hover }"
          >
            <v-card
              class="pa-6 text-center"
              flat
              :elevation="hover ? 12 : 2"
            >
              <div class="text-center">
                <v-avatar
                  color="primary"
                  size="88"
                >
                  <v-icon x-large>
                    mdi-bullseye-arrow
                  </v-icon>
                </v-avatar>
              </div>
              <v-card-title class="justify-center font-weight-black text-uppercase headline">
                Why?
              </v-card-title>
              <v-card-text
                class="subtitle-1 white--text title font-weight-regular text-left"
                color="black"
              >
                <WhyProject />
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col
          cols="12"
          md="6"
          class="pa-3"
        >
          <v-hover
            v-slot:default="{ hover }"
          >
            <v-card
              :elevation="hover ? 12 : 2"
              class="pa-6 white--text"
              flat
            >
              <div class="text-center">
                <v-avatar
                  color="primary"
                  size="88"
                >
                  <v-icon x-large>
                    mdi-pencil-circle
                  </v-icon>
                </v-avatar>
              </div>
              <v-card-title class="justify-center font-weight-black text-uppercase headline">
                How?
              </v-card-title>
              <v-card-text
                class="subtitle-1  white--text title font-weight-regular"
                color="black"
              >
                <HowProject @register="$emit('register')" />
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>

    <div class="py-12" />
  </section>
</template>

<script>
import HowProject from '~/components/contentBlocks/HowProject'
import WhyProject from '~/components/contentBlocks/WhyProject'

export default {
  components: {
    HowProject,
    WhyProject
  }
}
</script>
<style lang="scss">
    .delimiter {
        width: 30px;
        border-bottom: 5px solid $primary
    }
</style>
