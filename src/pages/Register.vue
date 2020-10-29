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
              v-for="[field, errors] in errors"
              :key="field"
            >
              {{ field }} {{ errors[0] }}
            </li>
          </ul>

          <form
            ref="formRef"
            @submit.prevent="onRegister"
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

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { redirect } from '../router'

import { postRegister, PostRegisterForm } from '../services/auth/postRegister'

import store from '../store/main'

export default defineComponent({
  name: 'Register',
  setup () {
    const { updateUser } = store.user

    const formRef = ref<HTMLFormElement | null>(null)
    const form = reactive<PostRegisterForm>({
      username: '',
      email: '',
      password: '',
    })

    const register = async () => {
      if (!formRef.value?.checkValidity()) return

      try {
        const userData = await postRegister(form)
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
      register,
      errors: [],
    }
  },
})
</script>
