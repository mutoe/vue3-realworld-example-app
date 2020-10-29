<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            Your Settings
          </h1>

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.image"
                  type="text"
                  class="form-control"
                  placeholder="URL of profile picture"
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.username"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Your name"
                >
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="form.bio"
                  class="form-control form-control-lg"
                  :rows="8"
                  placeholder="Short bio about you"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.email"
                  type="email"
                  class="form-control form-control-lg"
                  placeholder="Email"
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.password"
                  type="password"
                  class="form-control form-control-lg"
                  placeholder="New Password"
                >
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                :disabled="isButtonDisabled"
                type="submit"
              >
                Update Settings
              </button>
            </fieldset>
          </form>

          <hr>

          <button
            class="btn btn-outline-danger"
            @click="onLogout"
          >
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { putProfile, PutProfileForm } from '../services/profile/putProfile'
import { Store } from '../store'
import { MUTATION } from '../store/mutations'

export default defineComponent({
  name: 'Settings',
  setup () {
    const router = useRouter()
    const store = useStore<Store>()
    const user = computed<Store['user']>(() => store.state.user)

    const form = reactive<PutProfileForm>({})

    const onSubmit = async () => {
      const filteredForm = Object.entries(form).reduce((a, [k, v]) => (v === null ? a : { ...a, [k]: v }), {})
      const profile = await putProfile(filteredForm)
      store.commit(MUTATION.UPDATE_USER, profile)
    }

    const onLogout = () => {
      store.dispatch('logout')
    }

    onMounted(() => {
      if (!user.value) return router.push({ name: 'login' })

      form.image = user.value.image
      form.username = user.value.username
      form.bio = user.value.bio
      form.email = user.value.email
    })

    const isButtonDisabled = computed(() => (
      form.image === user.value?.image &&
      form.username === user.value?.username &&
      form.bio === user.value?.bio &&
      form.email === user.value?.email &&
      !form.password
    ))

    return { form, onSubmit, isButtonDisabled, onLogout }
  },
})
</script>
