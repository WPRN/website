<script>
export default {
  fetch ({ params, redirect }) {
    redirect(301, '/search?verified=true&featured=true')
  }
}
</script>
