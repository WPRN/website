<template>
  <section
    id="about-us"
    style="background-color:#212121;"
  >
    <div class="py-12" />
    <v-container>
      <h2 class="display-2 font-weight-bold mb-3 text-center">
        ABOUT WPRN
      </h2>

      <v-responsive
        class="mx-auto my-6"
        width="56"
      >
        <v-divider class="mb-1" />
        <v-divider />
      </v-responsive>
      <v-row>
        <v-col
          cols="12"
        >
          <v-responsive
            v-intersect="onIntersect"
            class="d-flex align-center mx-auto title font-weight-regular mb-8 px-3"
            max-width="750"
            height="100%"
          >
            <p class="text-justify">
              <b>The World Pandemic Research Network (WPRN)</b> is a platform serving research communities. It maintains a searchable global directory of the scientific resources available on the societal and human impacts of the Covid-19 pandemic. It shows <a href="/search">who works on what, where</a>, in real time, at global level.
            </p>
            <p class="text-justify">
              Designed and maintained by researchers, WPRN is free, non-profit, public-funded, open (creative commons, open-source), GDPR compliant. It is steered by an international  <a
                href="/advisory_board"
              >
                Advisory Board</a>
              and supported by major <a
                href="/institutions"
              > scientific institutions and scientific networks</a> worldwide.
            </p>
            <p class="text-justify">
              WPRN is the product of a collective scientific intelligence, with validation by senior scholars who act as <a
                href="/referents"
              >
                referents</a>
              in their fields.
            </p>
            <p class="text-justify">
              <span
                class="blue--text"
                style="text-decoration:underline;cursor:pointer;"
                @click="$emit('goToRegister')"
              >
                Register your project</span>
              on the WPRN platform to get a time-stamped ID that will facilitate scientific collaboration and citation, even before publication.
            </p>
            <div class="text-center">
              <nuxt-link
                class="blue--text"
                to="/FAQ"
              >
                Frequently Asked Questions
              </nuxt-link>
            </div>
          </v-responsive>
        </v-col>
      </v-row>
    </v-container>
    <div class="py-12" />
  </section>
</template>
<script>
export default {
  methods: {
    onIntersect (entries, observer, isIntersecting) {
      this.$emit('intersect', 'ABOUT-US')
    }
  }
}
</script>
