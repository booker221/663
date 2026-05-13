<template>
  <H5SectionPanel section-id="about" :title="aboutTitle">
    <div class="video-shell">
      <template v-if="images.about_video_h5">
        <video
          ref="videoRef"
          class="video-card about-media"
          :poster="images.about_cover_h5 || undefined"
          autoplay
          :muted="isMuted"
          preload="metadata"
          playsinline
          @play="isPlaying = true"
          @pause="isPlaying = false"
          @click="toggleVideo"
        >
          <source :src="images.about_video_h5" />
        </video>
        <img
          v-if="images.about_cover_h5 && !isPlaying"
          class="video-poster-cover"
          :src="images.about_cover_h5"
          alt=""
          @click="playVideo"
        />
      </template>
      <DynamicImage
        v-else
        :remote-src="images.about_cover_h5"
        alt="关于站点展示图"
        img-class="video-card about-image"
        label="关于站点图片 (待上传)"
        aspect-ratio="351 / 172"
        border-radius="20px"
      />
      <div
        v-if="images.about_video_h5 && !isPlaying"
        class="play-button"
        role="button"
        tabindex="0"
        aria-label="播放关于合兴视频"
        @click="playVideo"
        @keydown.enter.prevent="playVideo"
        @keydown.space.prevent="playVideo"
      >
        <div class="play-triangle"></div>
      </div>
    </div>
  </H5SectionPanel>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import DynamicImage from '@/components/common/DynamicImage.vue'
import H5SectionPanel from '@/components/h5/H5SectionPanel.vue'
import { images, remoteSiteMeta } from '@/stores/siteConfig.js'

const aboutTitle = computed(() => remoteSiteMeta.value?.name ? `关于${Array.from(remoteSiteMeta.value.name).slice(0, 2).join('')}` : '关于合兴')

const videoRef = ref(null)
const isPlaying = ref(false)
const isMuted = ref(true)

function playVideo() {
  const video = videoRef.value
  if (!video) return

  enableSound(video)
  video.play()
}

function toggleVideo() {
  const video = videoRef.value
  if (!video) return

  if (isMuted.value || video.muted) {
    enableSound(video)
    if (video.paused) video.play()
    return
  }

  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
}

function enableSound(video) {
  isMuted.value = false
  video.muted = false
  if (video.volume === 0) video.volume = 1
}

watch(
  () => images.about_video_h5,
  async (videoSrc) => {
    if (!videoSrc) {
      isPlaying.value = false
      isMuted.value = true
      return
    }

    await nextTick()

    const video = videoRef.value
    if (!video) return

    isMuted.value = true
    video.muted = true
    await video.play().catch(() => {
      isPlaying.value = false
    })
  },
  { immediate: true }
)
</script>

<style scoped>
.video-shell {
  position: relative;
  width: 100%;
  height: 178px;
  border: 1px solid #a9713f;
  border-radius: 12px;
  background: #eef4ff;
  box-shadow: 0 2.34px 4.68px rgba(163, 191, 222, 0.24);
  overflow: hidden;
}

.video-card {
  display: block;
  width: 100%;
  height: 100%;
  aspect-ratio: auto;
  border: 0;
  border-radius: 12px;
  background: #060606;
  box-shadow: inset 0 1px 0 rgba(255, 220, 105, 0.18);
}

:deep(.about-image) {
  display: block;
  object-fit: cover;
}

.about-media {
  display: block;
  object-fit: cover;
}

.video-poster-cover {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;
}

.play-button {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 2;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #44413C;
  box-shadow: 0 0 18px rgba(68, 65, 60, 0.22);
  transform: translate(-50%, -50%);
}

.play-triangle {
  width: 0;
  height: 0;
  margin-left: 4px;
  border-top: 11px solid transparent;
  border-bottom: 11px solid transparent;
  border-left: 16px solid #FFFFFF;
}

:deep(.image-placeholder) {
  width: 100%;
  height: 100%;
  border: 0;
  background: #060606;
  box-shadow: inset 0 1px 0 rgba(255, 220, 105, 0.18);
}

</style>
