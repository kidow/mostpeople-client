<template>
  <div class="form__container">
    <a-form :form="form" class="login-form" @submit.prevent="handleSubmit">
      <a-form-item>
        <a-input v-decorator="rules.email" placeholder="이메일">
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-decorator="rules.password" type="password" placeholder="패스워드">
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          }
        ]"
        >Remember me</a-checkbox>
        <a class="login-form-forgot" href>Forgot password</a>
        <a-button type="primary" html-type="submit" class="login-form-button">Log in</a-button>Or
        <a href>register now!</a>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'AuthSignup',
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  methods: {
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  },
  data: _ => ({
    rules: {
      email: [
        'email',
        { rules: [{ required: true, message: '이메일을 입력해주세요' }] }
      ],
      password: [
        'password',
        { rules: [{ required: true, message: '패스워드를 입력해주세요' }] }
      ]
    }
  })
}
</script>

<style lang="scss" scoped>
.form__container {
  width: 100%;
}
</style>