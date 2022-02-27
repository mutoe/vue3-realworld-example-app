<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            Sign up
          </h1>
          <p class="text-xs-center">
            <AppLink name="login">
              Have an account?
            </AppLink>
          </p>

          <ul class="error-messages">
            <li
              v-for="(error, field) in errors"
              :key="field"
            >
              {{ field }} {{ error ? error[0] : '' }}
            </li>
          </ul>

          <form
            ref="formRef"
            @submit.prevent="register"
          >
            <fieldset class="form-group">
              <input
                v-model="form.username"
                class="form-control form-control-lg"
                type="text"
                required
                placeholder="Your Name"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="form.email"
                class="form-control form-control-lg"
                type="email"
                required
                placeholder="Email"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="form.password"
                class="form-control form-control-lg"
                type="password"
                :minLength="8"
                required
                placeholder="Password"
              >
            </fieldset>
            <button
              type="submit"
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="!(form.email && form.username && form.password)"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { routerPush } from 'src/router'
import { postRegister, PostRegisterErrors, PostRegisterForm } from 'src/services/auth/postRegister'
import { updateUser } from 'src/store/user'
import { reactive, ref } from 'vue'

const formRef = ref<HTMLFormElement | null>(null)
const form: PostRegisterForm = reactive({
  username: '',
  email: '',
  password: '',
})

const errors = ref<PostRegisterErrors>({})

const register = async () => {
  errors.value = {}

  if (!formRef.value?.checkValidity()) return

  const result = await postRegister(form)
  if (result.isOk()) {
    updateUser(result.value)
    await routerPush('global-feed')
  } else {
    errors.value = await result.value.getErrors()
  }
}
</script>
