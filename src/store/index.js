import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userList : ['정지수', '홍길동'],
    currentUser : null,
    /**
     * diaryList : 일기Object 배열
     * {
     *    id: 일기내역 index,
     *    title: 일기제목,
     *    contents: 일기내용,
     *    regDate: 작성일(날짜,시간),
     *    user: 사용자
     * }
     */
    diaryList: [],
    // 일기내역 삭제 및 수정을 위해 id값으로 index를 부여하기 위한 목적
    diaryIndex : 0,
    listMode : 'card',
  },
  getters: {
    //일기장 목록 중 현재 사용자의 일기 목록만 불러온다.
    userDiary : state => state.diaryList.filter(diary => diary.user.match(state.currentUser)),
    //현재 사용자의 일기목록 중 검색키워드와 일치하는 일기목록을 불러온다.
    searchedDiary : (state) => (keyword) => {return state.diaryList.filter(diary => diary.user.match(state.currentUser)&&diary.title.includes(keyword))}
  },
  mutations: {
    //로그인 성공 시 현재 사용자에 입력한 사용자 이름을 반영한다. 
    login : (state, username) => { state.currentUser = username;},
    //로그아웃 시 현재 사용자를 초기화한다.
    logout : state => state.currentUser = null,
    writeOne : (state, diary) => {
      state.diaryIndex++;
      diary.id = state.diaryIndex;
      state.diaryList.push(diary);
    },
    //현재 사용자의 일기id와 일치하는 일기내역의 인덱스를 이용해 삭제한다. 
    deleteOne : function(state, id){
      const index = state.diaryList.findIndex(item => item.user === state.currentUser&&item.id === id);
      console.log(index);
      state.diaryList.splice(index, 1);
    }, 
    // 수정필요!!!!!!!!
    giveIndex : function(state){
      state.diaryList.forEach(item => item.id = state.diaryIndex++);
    },
    //현재 사용자의 일기id와 일치하는 일기내역을 수정한다.
    updateOne : function(state, updateDiary){
      const index = state.diaryList.findIndex((item) => item.user === state.currentUser && item.id === updateDiary.id);
      state.diaryList[index] = {...updateDiary};
    },
    changeListMode : (state, mode) => { state.listMode = mode },
  },
  actions: {
  },
  modules: {
  }
})
