import {computed, onMounted, onUnmounted, Ref, ref} from "vue";

type Point = {
  x: number,
  y: number
}
export const useSwipe = (element: Ref<HTMLElement | null>) => {
  const start = ref<Point | null>(null)
  const end = ref<Point | null>(null)
  const swiping = ref(false)
  const distance = computed(() => {
    if (!end.value || !start.value) {
      return null
    }
    return {
      x: end.value.x - start.value.x,
      y: end.value.y - start.value.y
    }
  })
  const direction = computed(() => {
    if (!distance.value) {
      return ''
    }
    const {x, y} = distance.value
    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? 'right' : 'left'
    } else {
      return y > 0 ? 'down' : 'up'
    }
  })
  const onStart = (e: TouchEvent) => {
    swiping.value = true
    end.value = start.value = {x: e.touches[0].screenX, y: e.touches[0].screenY}
  }
  const onMove = (e: TouchEvent) => {
    if (!start.value) {
      return
    }
    end.value = {x: e.touches[0].screenX, y: e.touches[0].screenY}
  }

  const onEnd = (e: TouchEvent) => {
    swiping.value = false
  }

  onMounted(() => {
    element.value?.addEventListener('touchstart', onStart)
    element.value?.addEventListener('touchmove', onMove)
    element.value?.addEventListener('touchend', onEnd)
  })

  onUnmounted(() => {
    element.value?.addEventListener('touchstart', onStart)
    element.value?.addEventListener('touchmove', onMove)
    element.value?.addEventListener('touchend', onEnd)
  })
  return {
    swiping,
    direction,
    distance
  }
}