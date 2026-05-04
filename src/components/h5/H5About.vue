<template>
  <section class="section" id="about">
    <div class="section-header">
      <div class="section-title">
        <img class="title-dot" src="@/assets/images/webp/icon-title-dot-l.webp" alt="" />
        <div class="title-text">{{ aboutTitle }}</div>
      </div>
    </div>

    <div class="video-shell">
      <template v-if="images.about_video_h5">
        <video
          ref="videoRef"
          class="video-card about-media"
          :poster="images.about_cover_h5 || undefined"
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
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import DynamicImage from '@/components/common/DynamicImage.vue'
import { images, remoteSiteMeta } from '@/stores/siteConfig.js'

const aboutTitle = computed(() => {
  const siteName = (remoteSiteMeta.value?.name || '').trim()
  const brand = Array.from(siteName).slice(0, 2).join('') || '合兴'
  return `关于${brand}`
})

const videoRef = ref(null)
const isPlaying = ref(false)

function playVideo() {
  videoRef.value?.play()
}

function toggleVideo() {
  const video = videoRef.value
  if (!video) return
  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
}
</script>

<style scoped>
.section {
  margin-bottom: 14px;
}

.section-header {
  margin-bottom: 10px;
}

.section-title {
  margin: 0 0 0 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.title-dot {
  width: 14px;
  height: 14px;
  object-fit: contain;
  flex-shrink: 0;
}

.title-text {
  background: linear-gradient(180deg, #FFDC69 0%, #FFE280 13.47%, #B48735 50.12%, #FFE280 86.98%, #FFD466 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 16px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0;
}

.video-shell {
  position: relative;
  margin: 0 12px;
  padding: 4px;
  border-radius: 24px;
  background: linear-gradient(180deg, #ffdc69 0%, #a9713f 100%);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.36);
  overflow: hidden;
}

.video-card {
  display: block;
  width: 100%;
  aspect-ratio: 351 / 172;
  border: 4px solid rgba(0, 0, 0, 0.72);
  border-radius: 20px;
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
  inset: 4px;
  z-index: 1;
  display: block;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  border-radius: 20px;
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
  background: rgba(255, 220, 105, 0.26);
  box-shadow: 0 0 18px rgba(255, 220, 105, 0.22);
  transform: translate(-50%, -50%);
}

.play-triangle {
  width: 0;
  height: 0;
  margin-left: 4px;
  border-top: 11px solid transparent;
  border-bottom: 11px solid transparent;
  border-left: 16px solid #ffdc69;
}

:deep(.image-placeholder) {
  width: 100%;
  border: 4px solid rgba(0, 0, 0, 0.72);
  background: #060606;
  box-shadow: inset 0 1px 0 rgba(255, 220, 105, 0.18);
}

</style>
