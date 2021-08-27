<template>
    <div class="wrapper">
        <table v-if = "diary"> 
            <tr>
                <th id="title">{{diary.title}}</th>
                <td>{{diary.regDate}}</td>
                <td><button @click = "showList">목록</button></td>
                <td><button @click = "showUpdate(diary.id)">수정</button></td>
                <td><button @click = "remove(diary.id)">삭제</button></td>
            </tr>
            <tr>
                <td colspan="5" id="contents">
                {{diary.contents}}
                </td>
            </tr>
        </table>
    </div>
</template>
<script>

export default ({
    name: 'DiaryDetail',
    computed: {
        //현재 사용자의 일기내역 중 요청한 일기id와 일치하는 일기내용을 반환한다.
        diary() {
            return this.$store.state.diaryList.filter(item => item.user === this.$store.state.currentUser&&item.id === this.$route.params.no)[0];            
        },
    },
    methods: {
        showList() {
            this.$router.push('/diary/list');
        }, 
        showUpdate(id) {
            this.$router.push({name: 'DiaryUpdateByNo', params: { no : id}});
        },
        remove(id) {
            if(confirm('작성하신 글을 삭제하시겠습니까?')){
                this.$store.commit('deleteOne',id);
                this.$router.push('/diary/list');
                alert('글이 삭제되었습니다.');
            }
        }
    }
})
</script>
<style scoped>
    /* 전체 비율 조정 */
    .wrapper {
        width: 60%;
        margin: 0 auto;
    }
    table {
        width : 100%;
        margin : 50px 0;
        border-bottom: 1px solid #cccc;
    }
    table tr:first-of-type {
        background: gold;
    }
    #title {
        width:60%;
    }
    #contents {
        height: 500px;
    }    
    button {
        background: white;
        box-shadow: none;
        margin: 5px 0;
    }
    button:hover {
        color: #cccc;
    }

</style>
