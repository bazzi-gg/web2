<template>
  <footer>
    <div class="container">
      <nav class="level is-align-items-flex-start is-flex">
        <div class="level-left">
          <div
            class="level-item is-flex-direction-column is-align-items-flex-start"
          >
            <div class="links">
              <nuxt-link to="/about" class="links-item">
                About BAZZI.GG
              </nuxt-link>
              <nuxt-link to="/private-policy" class="links-item">
                개인정보처리방침
              </nuxt-link>
              <nuxt-link to="/thanks" class="links-item"> Thanks </nuxt-link>
              <a
                href="mailto:contact@bazzi.gg"
                class="links-item has-text-black"
              >
                문의/피드백
              </a>
            </div>
            <p class="pt-1">
              © 2020-2022 BAZZI.GG, Data based on NEXON DEVELOPERS
            </p>
          </div>
        </div>
        <div class="level-right">
          <div class="external-links">
            <div class="external-links-box">
              <p>LINK</p>
              <a
                class="external-links-item"
                href="https://github.com/bazzi-gg"
                target="blank"
              >
                <Icon icon="ri-github-fill" color="#808080" /><span
                  >Github</span
                >
              </a>
              <a
                class="external-links-item"
                href="https://discord.gg/BXcwFpFSc7"
                target="blank"
              >
                <Icon icon="ri-discord-fill" color="#808080" /><span
                  >Discord</span
                >
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </footer>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Footer',
})
</script>
<style scoped>
footer {
  height: 130px;
  font-size: 12px;
}
footer,
.links-item,
.external-links-item:visited,
.external-links-item:link {
  color: #808080;
}
.level {
  padding-top: 16px;
  padding-left: 32px;
  padding-right: 32px;
}
.links-item {
  padding-right: 16px;
}
.external-links-item {
  display: flex;
  align-items: center;
}
.external-links-item > span {
  padding: 4px;
}
@media screen and (max-width: 768px) {
  .external-links {
    padding-bottom: 16px;
  }
  .level-left {
    margin-top: 1.5rem;
  }
  .level {
    padding-left: 16px;
    padding-right: 16px;
  }
}
@media screen and (max-width: 530px) {
  .level {
    flex-direction: column;
  }
}
</style>
