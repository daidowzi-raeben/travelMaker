<template>
  <div class="wrap">
    <div class="content">
      <div class="detail-wrap">
        <div class="detail-img">
          <el-carousel>
            <el-carousel-item v-for="item in 4" :key="item">
              <h3 class="small">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="detail-info">
          <div class="tit">서울한강축제</div>
          <div class="info">
            <p class="line">
              <span class="text">서울</span> /
              <span class="text">축제</span>
            </p>
            <p class="line">
              <span class="text">축제 개요 설명</span>
              <el-skeleton :rows="3" />
            </p>
          </div>
        </div>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">기본정보</el-menu-item>
          <el-menu-item index="2">이용안내</el-menu-item>
          <el-menu-item index="3">상세정보</el-menu-item>
        </el-menu>
        <div class="">
          <el-skeleton :rows="10" />
        </div>
        <div class="">
          <el-skeleton :rows="10" />
        </div>
        <div class="">
          <el-skeleton :rows="10" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'MainPage',
  layout: 'index',
  data() {
    return {
      search: '',
      activeIndex: '1',
    }
  },
  computed: {},
  mounted() {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>

<style lang="scss"></style>
