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
              v-for="[field, errors] in errors"
              :key="field"
            >
              {{ field }} {{ errors[0] }}
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

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { redirect } from '../router'

import { postLogin, PostLoginForm } from '../services/auth/postLogin'

import store from '../store/main'

export default defineComponent({
  name: 'Login',
  setup () {
    const { updateUser } = store.user

    const formRef = ref<HTMLFormElement | null>(null)
    const form = reactive<PostLoginForm>({
      email: '',
      password: '',
    })

    const login = async () => {
      if (!formRef.value?.checkValidity()) return

      try {
        const userData = await postLogin(form)
        updateUser(userData)
        redirect('global-feed')
      } catch (e) {
        // TODO: add error handling
        console.error(e)
      }
    }

    return {
      formRef,
      form,
      login,
      errors: [],
    }
  },
})
</script>
