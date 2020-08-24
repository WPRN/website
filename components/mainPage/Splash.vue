<template>
  <section
    id="hero"
  >
    <span
      v-intersect="onIntersect"
    />
    <v-row no-gutters>
      <!-- TODO make a better responsive version -->
      <v-img
        class="px-6"
        height="100vh"
        srcset="splash_sm.jpg 480w, splash_lg.jpg 600w, splash_xl.jpg 800w"
        src="/splash_lg.jpg"
        :contain="$vuetify.breakpoint.mdAndUp"
        lazy-src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAgAB8DASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABwYIBf/EACkQAAIBAwIFBAIDAAAAAAAAAAECAwQFEQAGEhMhMUEHIlFhFDIjQvD/xAAWAQEBAQAAAAAAAAAAAAAAAAADAQX/xAAiEQABBAEDBQEAAAAAAAAAAAABAAIDERIEITETQVFhcfD/2gAMAwEAAhEDEQA/AMlWW2Vt4uUVvoITLPJkgDwAMkn6A/2dOFj9Kdo2qzULbjFdWXKrLGUyymCmgVRklVX3sfHUgE57Y1EejFRR2msa7VqQFHl5QMgLZCqWMeFIYcZKrxeM+caUp6KPcV5kittytkNXVUytb+VV+2Bf25TKTlT1ZeED40x0krg1zTTd72v977oXycgcqL3RtX0uuFJcH27cqi0VVLHxQxVErSfkEY4hwni8k44XPRScHRDWU8lLUNDIVJHZlOQw8EfWk/d21a21yvDw86QJluBWGMDJAB+B8fGoa+yRTWul9kCzQSMhKKQ7K3X3dMHBB+9JKyEszhdYUikJNFdn0vojequayQ1FJHXSfyUkdQxTnNjBRX/UOcDAbAPbIPe12lfJNvXeOWqRoY6WrAlR4CJ42XIJVsFkdcYPbv8AZ0MQSyQTJNC7RyIcqynqDpg2t61wwWdbXujatHdf1V6tAvMkReg4lcEFsYHFkdABjoMJDrMY+k4WFXRW7IK+v1wtwNXemhqK2kg5c0siqHlCSgdTGWz5Iz2B7kaz1vKsoay8zzW4VAp5HMiioVRKmf6sV9rY+QBnVnvr1Sp7mlVT7atVZa4qs5qGqasSlugGFUKAq4AwMkDRiSSck5OsyCEQtPkpfgX/2Q=="
      >
        <v-container
          fill-height
          :class="{'px-0' : $vuetify.breakpoint.smAndDown}"
        >
          <v-row
            align="center"
            class="white--text mx-auto"
            justify="center"
            :no-gutters="$vuetify.breakpoint.smAndDown"
            @click="$vuetify.goTo('#about-us', { offset: 100 })"
          >
            <v-col
              class="white--text d-flex justify-center flex-column align-center "
              cols="12"
              :class="$vuetify.breakpoint.name"
            >
              <div
                class="mission pa-9"
                :class="$vuetify.breakpoint.name"
              >
                <h1
                  class="main_title mb-6"
                >
                  World Pandemic Research Network
                </h1>
                <div
                  class="main_subtitle pa-2 d-flex justify-center text-center"
                >
                  Societal Impacts and Aftermath of Covid-19: <br>
                  A Global Searchable Directory
                </div>
              </div>
            </v-col>
            <v-btn
              large
              class="align-self-end"
              fab
              outlined
              color="white"
              style="background-color:#272727;"
              @click="$vuetify.goTo('#about-us', { offset: 100 })"
            >
              <v-icon large>
                mdi-arrow-down
              </v-icon>
            </v-btn>
          </v-row>
        </v-container>
      </v-img>
    </v-row>
  </section>
</template>
<script>
export default {
  methods: {
    onIntersect (entries, observer, isIntersecting) {
      this.$emit('intersect', 'TOP')
    }
  }
}
</script>
