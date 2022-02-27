<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            Sign in
          </h1>
          <p class="text-xs-center">
            <AppLink name="register">
              Need an account?
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
            @submit.prevent="login"
          >
            <fieldset
              class="form-group"
              aria-required="true"
            >
              <input
                v-model="form.email"
                class="form-control form-control-lg"
                type="email"
                required
                placeholder="Email"
              >
            </fieldset>
            <fieldset class=" form-group">
              <input
                v-model="form.password"
                class="form-control form-control-lg"
                type="password"
                required
                placeholder="Password"
              >
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="!form.email || !form.password"
              type="submit"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { routerPush } from 'src/router'
import { postLogin, PostLoginErrors, PostLoginForm } from 'src/services/auth/postLogin'
import { updateUser } from 'src/store/user'
import { reactive, ref } from 'vue'

const formRef = ref<HTMLFormElement | null>(null)
const form: PostLoginForm = reactive({
  email: '',
  password: '',
})

const errors = ref<PostLoginErrors>({})

const login = async () => {
  errors.value = {}

  if (!formRef.value?.checkValidity()) return

  const result = await postLogin(form)
  if (result.isOk()) {
    updateUser(result.value)
    await routerPush('global-feed')
  } else {
    errors.value = await result.value.getErrors()
  }
}

</script>
