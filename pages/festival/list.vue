<template>
  <div class="wrap">
    <div class="header">
      <div class="header-logo"></div>
      <button type="button" class="btn header-menu"></button>
    </div>
    <div class="content">
      <div class="search-top">
        <div class="left">
          <div class="search-wrap">
            <el-input v-model="search" placeholder="가고싶은 곳을 검색해보세요"></el-input>
            <button type="button" class="btn search-btn">
              <i class="el-icon-search"></i>
            </button>
          </div>
        </div>
        <div class="right">
          <button type="button" class="btn btn-filter">필터</button>
        </div>
      </div>
      <div class="list-option">
        <div class="left">
          <button type="button" class="btn btn-check">진행중인 축제만 보기</button>
        </div>
        <div class="right">
          <button type="button" class="btn btn-list"></button>
          <button type="button" class="btn btn-normal active"></button>
          <button type="button" class="btn btn-image"></button>
        </div>
      </div>
      <ul class="thumb-list">
        <li v-for="i in 9" :key="i" class="thumb-list--item">
          <div class="thumb">
              <img src="../../static/images/Thumbnail.png" alt="" />
            </div>
            <div class="text">
              <div class="tit">서울한강축제</div>
              <div class="info">
                <span>서울</span>
                <span>축제</span>
              </div>
            </div>
        </li>
      </ul>
      <el-backtop target=".wrap"></el-backtop>
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
    }
  },
  computed: {

  },
  mounted() {
  },
}
</script>

<style lang="scss" ></style>
