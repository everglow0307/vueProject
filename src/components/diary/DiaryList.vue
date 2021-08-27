<template>
    <div>
        <div id="diary-wrapper">
            <table class="diaryList-Menu">
                <tr>
                    <td class="post"><button @click = "write" ><b>글쓰기</b></button></td>
                    <td class="search">
                        <input type="text" v-model = "search">
                        <button type="reset" @click = "searchReset" ><b>초기화</b></button>
                    </td>
                </tr>
            </table>
            <!--============================================================ 일기장 목록 ==========================================================-->
            <table class="list-contents" v-show = "diaryList">
                <tr>
                    <th>작성일</th>
                    <th colspan="2">제목</th>
                </tr>
                <tr v-for = "diary in diaryList" :key = "diary.id" >
                    <td>{{ diary.regDate.split(' ')[0] }}</td>
                    <td @mouseover = "showDelete" @mouseout = "hideDelete">
                        <span @click = "showDetail(diary.id)" >{{diary.title}}</span>
                        <button :class = "{'toggleDelete' : !deleteFlag}" @click = "remove(diary.id)">삭제</button>
                    </td>
                </tr>
            </table>
            <div class="no-list" v-show = "diaryList.length == 0">
                작성된 글이 없습니다. 
            </div>
            <!--====================================================================================================================================-->
        </div>
    </div>
</template>
<script>
export default ({
    data(){
        return {
            deleteFlag : null,
            search : '',
        };
    },
    mounted(){
       this.giveIndex();
    },
    computed: {
        /**
         * 검색키워드가 입력되면 현재사용자의 일기목록 중 키워드와 일치하는 일기목록을 반환해주고,
         * 검색키워드가 없을경우 현재사용자의 모든 일기목록을 반환한다.
        */
        diaryList() {
            if(this.search){
                return this.$store.state.diaryList.filter(diary => diary.user.match(this.$store.state.currentUser)&&diary.title.includes(this.search));
            }else{
                return this.$store.getters.userDiary;
            }
        }
    },
    methods: {
        write() {
            this.$router.push('/diary/write')
        },
        remove(id) {
            this.$store.commit('deleteOne', id);
            alert('글이 삭제되었습니다.');
        },
        giveIndex(){
           this.$store.commit('giveIndex');
        },  
        /*** showDelete / hideDelete
         * 일기목록에 마우스를 올리면 class변수값을 바꿔 일기삭제버튼을 보여주고,
         * 마우스가 벗어나면 일기삭제버튼이 사라진다.
         *  */ 
        showDelete() {
            this.deleteFlag = true;
        },
        hideDelete() {
            this.deleteFlag = false;
        },
        showDetail(id) {
            console.log('글목록누름');
            this.$router.push({ name: "DiaryDetailByNo", params: { no : id}});
        },
        searchReset(){
            this.search = '';
        }
    }
})
</script>
<style scoped>
    #diary-wrapper {
        width: 60%;
        margin: 0 auto;
    }
    /* 글쓰기, 검색창 메뉴 */
    .diaryList-Menu {
        width : 100%;
        padding : 5px 20px;
        margin: 20px 0;
    }
    /* 글작성 */
    .post {
        width: 20%;
        text-align: left;
    }
    /* 검색창 */
    .search{
        text-align: right;
    }
    button {
        background : gold;
        color: white;
        box-shadow: none;
    }
    input {
        border: 1px solid gold;
        margin : 10px;
        height: 25px;
    }

    /* 글목록 비율 조정 */
    .list-contents {
        width : 100%;
        border-bottom: 1px solid #cccc;
    }
    .list-contents td:nth-of-type(2) {
        width : 80%;
    }
    .list-contents td:nth-of-type(2):hover {
        text-decoration: underline;
    }
    
    /* 글제목 */
    .list-contents th {
        background: #cccc;
        padding: 10px 0;
    }
    .toggleDelete {
        visibility: hidden;
    }
    /* 작성글이 없을 때 */
    .no-list {
        height: 500px;
        line-height: 500px;
    }
    button:hover {
        color: #cccc;
    }
</style>
