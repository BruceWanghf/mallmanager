<template>
    <div class="login-wrap">
        <el-form class="login-form" label-position="top" label-width="80px" :model="formData">
            <h2>用户登录</h2>
            <el-form-item label="名称">
                <el-input v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="formData.password"></el-input>
            </el-form-item>
            <el-button class="login-button"  type="primary" @click.prevent="handleLogin()">登录</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
      return {
        formData: {
          username: '',
          password: ''
        }
      };
    },
    methods: {
      //登录请求
      async handleLogin(){
        // this.$http.post('login',this.formData)
        // .then(res => {
        //   const {
        //     data,
        //     meta:{ msg, status}
        //   } = res.data

        //   if(status===200){
        //     this.$router.push({name:'home'})
        //     this.$message.success(msg)
        //   }
        //   else{
        //     this.$message.warning(msg);
        //   }
        // })
        // .catch(err => {
        //   console.error(err); 
        // })
        //下面是通过 async+await 把异步代码改成同步代码的样子
        const res = await this.$http.post('login',this.formData)
        const {
            data,
            meta:{ msg, status}
        } = res.data

        if(status===200){
          
          localStorage.setItem('token',data.token)

          this.$router.push({name:'home'})
          this.$message.success(msg)
        }
        else{
          this.$message.warning(msg);
        }
      }
    }
}
</script>
<style >
.login-wrap{
  height: 100%;
  background-color: #324152;

  display:flex;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-form {
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding:30px;

}
.login-wrap .login-button {
  width: 100%;
}
</style>