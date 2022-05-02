<template>
  <div>
    <FormulateForm  v-model="user" @submit="userLogin">
      <h2 class="text-2xl mb-2">{{titleForm}}</h2>
      <div class="mb-6 sm:grid sm:gap-4 sm:grid-cols-1">
        <div  v-for="e in userSchema" :key="e.name">
          <FormulateInput
            :options="e.opt"
            :type="e.typeInput"
            :name="e.name"
            :label="e.label"
            :validation="e.validation"
            :outer-class="e.classOut"
            :input-class="'rounded-none relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'"
            :error-class="e.errorClass"
          />
        </div>
      </div>

      <FormulateInput
        input-class="w-full flex py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="submit"
      />
      <!--<pre class="mt-8 p-2 bg-gray-200 whitespace-pre text-sm">{{ user }}</pre>-->
    </FormulateForm>
  </div>
</template>

<script>
const classDef = 'form-input rounded-md shadow-sm w-full';
const classOut = 'w-full';
const errorClass='text-sm text-red-600';
const styl = {classOut,errorClass};

export default {
  name: "FormLogin",
  data() {
    return {
      titleForm : 'Login',
      categories: {},
      cities: {},
      deptos : {},
      user: {},
      userSchema: [
        {name: 'email',typeInput : 'email', label:'Correo', validation: 'required|email', inpClass:classDef, ...styl },
        {name: 'password',typeInput : 'password', label:'Contraseña', validation: 'required|min:8', inpClass:classDef, ...styl },
      ]
    };
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local', { data: {'user': this.user} })
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted() {
  }
};
</script>
