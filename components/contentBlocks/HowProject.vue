<template>
  <v-sheet>
    <ul>
      <li>
        Fill out the
        <!-- eslint-disable-next-line vue/singleline-html-element-content-newline, vue/max-attributes-per-line-->
        <nuxt-link to="/#register" @click="$emit('register')">project register form</nuxt-link> with basic information + an abstract under 2000 characters. To ensure visibility to your project, carefully select keywords for disciplines, themes and types of project.
      </li>
      <li>
        Verify your contact email and get your secure url to manage your project. There is no complex account system but a simple and secured token based process, fully GDPR/ePR compliant
      </li>
      <li>Mention if you welcome collaboration and for what, and build bridges between projects - <i>coming soon</i>. </li>
    </ul>
  </v-sheet>
</template>
