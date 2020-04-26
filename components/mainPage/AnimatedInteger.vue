<template>
  <span v-intersect="onIntersect">{{ tweeningValue }}</span>
</template>
<script>
import TWEEN from '@tweenjs/tween.js'
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    delay: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      tweeningValue: 0
    }
  },
  watch: {
    value: function (newValue, oldValue) {
      this.tween(oldValue, newValue)
    }
  },
  mounted () {},
  methods: {
    async onIntersect (entries, observer) {
      setTimeout(() => {
        this.tween(0, this.value)
        /*  if (this.delay === 3200) {
          setTimeout(() => {
            console.log("finished");

            this.$emit("finished");
          }, 800);
        } */
      })
    },
    tween (startValue, endValue) {
      var vm = this

      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      new TWEEN.Tween({
        tweeningValue: startValue
      })
        .to(
          {
            tweeningValue: endValue
          },
          800
        )
        .onUpdate(function () {
          vm.tweeningValue = this._object.tweeningValue.toFixed(0)
        })
        .start()
      animate()
    }
  }
}
</script>
