<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            Sign up
          </h1>
          <p class="text-xs-center">
            <RouterLink to="/login">
              Have an account?
            </RouterLink>
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
            :ref="formRef"
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

export default defineComponent({
  name: 'Register',
  setup () {
    const formRef = ref<HTMLFormElement | null>(null)
    const form = reactive({
      username: '',
      email: '',
      password: '',
    })

    const onRegister = () => {
      if (!formRef.value?.checkValidity()) return

      console.log(form)
    }

    return {
      formRef,
      form,
      errors: [],
      onRegister,
    }
  },
})
</script>
