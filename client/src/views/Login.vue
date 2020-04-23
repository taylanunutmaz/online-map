<template>
  <div>
    <div class="sidenav">
      <div class="login-main-text">
        <h2>
          Online Map
          <br />Wellcome
        </h2>
        <p>Enter your name to access map.</p>
      </div>
    </div>
    <div class="main">
      <div class="col-md-6 col-sm-12">
        <div class="login-form">
          <div class="form-group">
            <label>User Name</label>
            <input v-model="userName" type="text" class="form-control" placeholder="User Name" />
            <div v-if="error" class="invalid-feedback d-block">{{this.error}}</div>
          </div>
          <button @click="login" class="btn btn-black">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      regex: /^[a-zA-Z0-9.\-_$@*!]{3,30}$/,
      userName: localStorage.userName
    }
  },
  methods: {
    login() {
      if (this.regex.test(this.userName)) {
        localStorage.userName = this.userName;
        this.$router.push("/map");
      }
      else{
          this.error = 'Please enter a valid username and minimum 3 characters.';
      }
    }
  }
};
</script>

<style scoped>
body {
  font-family: "Lato", sans-serif;
}

.main-head {
  height: 150px;
  background: #fff;
}

.sidenav {
  height: 100%;
  background-color: #000;
  overflow-x: hidden;
  padding-top: 20px;
}

.main {
  padding: 0px 10px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
}

@media screen and (max-width: 450px) {
  .login-form {
    margin-top: 10%;
  }
}

@media screen and (min-width: 768px) {
  .main {
    margin-left: 40%;
  }

  .sidenav {
    width: 40%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
  }

  .login-form {
    margin-top: 80%;
  }
}

.login-main-text {
  margin-top: 20%;
  padding: 60px;
  color: #fff;
}

.login-main-text h2 {
  font-weight: 300;
}

.btn-black {
  background-color: #000 !important;
  color: #fff;
}
</style>
