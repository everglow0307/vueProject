<!-- 이 프로그램은 사용자명 입력 후 일기 목록/ 작성/ 상세/ 수정/ 삭제화면으로 구성된다.
사용자와 일치하는 일기내역만 볼 수 있으며, 일기정보와 사용자정보는 vuex에서 관리한다. -->
<template>
  <div id="app">
    <!-- Header : 로고, 로그인 시 사용자이름과 로그아웃버튼 --> 
    <layout-component>
      <template v-slot:header>
      </template>
      <router-view />
      <!-- <chart-component></chart-component> -->
    </layout-component>
  </div>
</template>
<script>
import Layout from './components/common/Layout.vue'
// import Chart from './components/diary/chartTest.vue'

export default ({
  components: {
   'layout-component': Layout,
  //  'chart-component' : Chart,
  },
  data() {
    return {
      chartOptions: {
        series: [{
          data: [1,2,3] 
        }]
      }
    }
  }
})
</script>

<style>
*{
  padding:0;
  margin:0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

button {
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
}

</style>
