<template>
  <PcSectionPanel section-id="about" :title="aboutTitle">
    <div class="video-shell">
      <template v-if="images.about_video_pc">
        <video
          ref="videoRef"
          class="video-card about-media"
          :poster="images.about_cover_pc || undefined"
          preload="metadata"
          playsinline
          @play="isPlaying = true"
          @pause="isPlaying = false"
          @click="toggleVideo"
        >
          <source :src="images.about_video_pc" />
        </video>
        <img
          v-if="images.about_cover_pc && !isPlaying"
          class="video-poster-cover"
          :src="images.about_cover_pc"
          alt=""
          @click="playVideo"
        />
      </template>
      <DynamicImage
        v-else
        :remote-src="images.about_cover_pc"
        alt="关于站点展示图"
        img-class="video-card about-image"
        label="关于站点图片 (待上传)"
        aspect-ratio="2 / 1"
        border-radius="20px"
      />
      <button
        v-if="images.about_video_pc && !isPlaying"
        class="play-button"
        type="button"
        aria-label="播放关于合兴视频"
        @click="playVideo"
      >
        <span class="play-triangle"></span>
      </button>
    </div>
  </PcSectionPanel>
</template>

<script setup>
import { computed, ref } from 'vue'
import DynamicImage from '@/components/common/DynamicImage.vue'
import PcSectionPanel from '@/components/pc/PcSectionPanel.vue'
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

<style scoped lang="scss">
.video-shell {
  position: relative;
  width: min(100%, 1140px);
  margin: 0 auto;
  border: 4px solid #A9713F;
  border-radius: 20px;
  background: #EEF4FF;
  box-shadow: 0 8px 16px rgba(163, 191, 222, 0.24);
  overflow: hidden;
}

.video-card {
  width: 100%;
  aspect-ratio: 2 / 1;
  border: 0;
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 252, 255, 0.96) 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

:deep(.about-media),
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
  border-radius: 16px;
  object-fit: cover;
  cursor: pointer;
}

.play-button {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 2;
  width: 80px;
  height: 80px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.45);
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

.play-button:hover {
  background: rgba(255, 255, 255, 0.58);
  transform: translate(-50%, -50%) scale(1.04);
}

.play-triangle {
  width: 0;
  height: 0;
  margin-left: 6px;
  border-top: 17px solid transparent;
  border-bottom: 17px solid transparent;
  border-left: 25px solid #FFFFFF;
}

:deep(.image-placeholder) {
  width: 100%;
  border: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 252, 255, 0.96) 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
}
</style>
