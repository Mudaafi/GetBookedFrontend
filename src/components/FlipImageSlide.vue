<template>
  <div
    class="slide"
    id="z"
    :class="{ 'img-fullscreen': isFullscreen, 'is-flipping': isFlipping }"
    :style="`transform: rotateY(${flipAngle + deltaAngle}deg)`"
    @click="$emit('changeFullscreen', !isFullscreen)"
  >
    <img :src="frontUrl" alt="book cover" class="img front" />
    <img :src="backUrl || frontUrl" alt="book cover" class="img back" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'FlipImageSlide',
  props: {
    frontUrl: {
      type: String,
      required: true,
    },
    backUrl: {
      type: String,
    },
    isFullscreen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      touchState: {
        startX: 0,
        endX: 0,
      },
      isFlipping: false,
      flipAngle: 0,
      deltaAngle: 0,
    }
  },
  methods: {
    touchStart(event: TouchEvent) {
      this.touchState.startX = event.touches[0].clientX
      this.touchState.endX = 0
      this.isFlipping = true
    },
    touchMove(event: TouchEvent) {
      this.touchState.endX = event.touches[0].clientX
      this.deltaAngle = this.touchState.endX - this.touchState.startX
    },
    touchEnd() {
      // Precalculate
      let deltaAngle = this.deltaAngle
      let sensitivity = 60
      let flipDirection =
        Math.abs(deltaAngle) < sensitivity ? 0 : deltaAngle > 0 ? 1 : -1
      let noOfTurns = Math.floor(Math.abs(deltaAngle / 180)) + 1
      let finalAngle = this.flipAngle + flipDirection * noOfTurns * 180

      // Set the variables all at once to avoid janky transitions
      this.deltaAngle = 0
      this.flipAngle = finalAngle
      this.isFlipping = false
      this.$emit('isFrontPageActive', this.flipAngle % 360 == 0)
    },
  },
  mounted() {
    this.$el.addEventListener('touchstart', (event) =>
      this.touchStart(event as TouchEvent),
    )
    this.$el.addEventListener('touchmove', (event) =>
      this.touchMove(event as TouchEvent),
    )
    this.$el.addEventListener('touchend', () => this.touchEnd())
  },
})
</script>

<style scoped>
.slide {
  position: relative;
  height: 15rem;
  width: 15rem;
  transform-style: preserve-3d;
  transition: all 0.5s ease-in-out;
  display: inline-block;
  border-radius: 32px;
}

.slide .img {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 0;
  transform-style: preserve-3d;
  border-radius: 32px;
}

.slide .img.front {
  transform: translateZ(1px);
}

.slide .img.back {
  transform: scaleX(-1);
}

.slide.img-fullscreen {
  height: 70vh;
  width: 90vw;
  z-index: 10;
  transition: all 0.35s ease-in-out;
}

.slide.is-flipping {
  transition: none;
}
</style>
