<template>
    <div class="wrapper">
        <div class="write-bar">
            <i class="el-icon-edit"></i>
            <strong>일기 {{ this.$route.params.formMode }}</strong>
        </div>
        <el-divider></el-divider>
        <el-form :model = "diaryForm" class="demo-ruleForm" :rules = "rules" ref="diaryForm">
            <el-form-item label="제목" prop="title">
                <el-input v-model = "diaryForm.title"></el-input>
            </el-form-item>
            <el-form-item label="날씨" prop="weather">
                <el-radio-group v-model = "diaryForm.weather" >
                    <el-radio-button label="sunny"><i class="el-icon-sunny"></i></el-radio-button>
                    <el-radio-button label="cloudy"><i class="el-icon-cloudy"></i></el-radio-button>
                    <el-radio-button label="rain"><i class="el-icon-heavy-rain"></i></el-radio-button>
                    <el-radio-button label="snow"><i class="el-icon-light-rain"></i></el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="기분" prop="emotion">
                <el-select v-model = "diaryForm.emotion" placeholder="오늘의 기분">
                    <el-option label = "기쁨" value="기쁨"></el-option>
                    <el-option label = "우울" value="우울"></el-option>
                    <el-option label = "화남" value="화남"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="내용" prop="contents">
                <el-input type = "textarea" v-model = "diaryForm.contents" :rows = "20"></el-input>
            </el-form-item>
                <el-button @click = "save('diaryForm')">{{ this.$route.params.formMode === '작성' ? '저장' : '수정'}}</el-button>
                <el-button @click = "cancel(diaryForm.id)">취소</el-button>
        </el-form>
    </div>
</template>
<script>
export default ({
    name: 'DiaryForm',
     data() {
        return {
            diaryForm: {
                user: '',
                id: '',
                title: '',
                weather: 'sunny',
                emotion: '기쁨',
                contents: '',
                regDate: '',
                upDate: '',
            },
            updateDiary : null,
            rules: {
                title: [
                    { required: true, message: '제목을 입력하세요.', trigger: 'blur' },
                    { min: 3, max: 30, message: '3~30자 이내로 제목을 입력하세요.', trigger: 'blur' }
                ],
                weather: [
                    { required: true, message: '오늘의 날씨를 선택하세요.', trigger: 'change' }
                ],
                emotion: [
                    { required: true, message: '오늘의 기분을 선택하세요.', trigger: 'change' }
                ],
                contents: [
                    { required: true, message: '내용을 입력하세요', trigger: 'blur' },
                    { min: 10, max: 1000, message: '10~1000자 이내로 제목을 입력하세요.', trigger: 'blur' }
                ]
            },
            no: this.$route.params.no || null,
        };
    },
    // 인자값으로 넘어온 글번호(no)가 있다면 수정화면을 보여주기 위해 저장소에서 글번호를 이용해 일기내역을 불러온다.
    mounted() {
        if(this.no){
            this.diaryForm =  {...this.$store.state.diaryList.filter(item => item.user === this.$store.state.currentUser&&item.id === this.no)[0]};        
        }   
    },
    methods: {
        //
        save(formName) {
           this.$refs[formName].validate((valid) => {
               
               //유효성 검사 성공한 경우 글 작성 또는 글 수정을 한다.
               if(valid) {

                   const formMode = this.$route.params.formMode;

                    // 글을 수정하는 경우
                   if(this.no) {
                        this.updateDiary = Object.assign({},this.diary);
                        this.$store.commit('updateOne', this.updateDiary);
                   }else 
                   // 글을 새롭게 작성하는 경우
                   {
                       this.diaryForm.user = this.$store.state.currentUser;
                       this.diaryForm.regDate = new Date();
                       this.$store.commit('writeOne', this.diaryForm);
                   }

                    //글을 작성 및 수정 후 목록화면으로 돌아가고 작업이 완료됐다는 메세지창을 띄운다.
                    this.$router.push("/diary/list");
                    this.$message({
                        message: '글이 '+formMode+'되었습니다.',
                        type: 'success'
                    });

               // 유효성 검사 실패한 경우 경고창을 띄운다.
               }else{
                    this.$message({
                        message: '내용을 다시 확인해주세요.',
                        type: 'warning'
                    });
                    return false;
               }
           });
        },
        // 취소버튼 클릭 시 글번호(id)로 수정/작성 여부를 판단하고, 
        // 수정중일 때는 글상세화면으로 넘어가고, 작성중 일때는 글목록화면으로 넘어간다.
        cancel(id) {
            if(!id) {
                this.$router.push('/diary/list');
            } else {
                this.$router.push({ name: "DiaryDetailByNo", params: { no : id}});
            }
        },
    }
})
</script>
<style scoped>
   .wrapper {
        margin: 50px auto;
        width: 60%;
    }
    .write-bar{
        text-align: left;
        font-size: 18px;
    }
    .el-form {
        padding-right: 50px;
    }
    .el-form-item{
        text-align: left;
    }
    .el-button {
        background : gold;
        box-shadow: none;
        color: white;
        font-size: 16px;
    }
</style>
