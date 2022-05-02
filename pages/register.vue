<template>
  <signin>
    <user-form :new-user="false"></user-form>
  </signin>
</template>

<script>
import FormLogin from "@/components/FormLogin";
import Footer from "@/components/Books/Layout/Components/Footer";
import HeaderLand from "@/components/Books/Layout/Components/HeaderLand";
import Signin from "@/components/Books/Layout/Signin";
import UserForm from "@/components/Books/Layout/Components/forms/UserForm";
export default {
  route: "register",
  components: {UserForm, Signin, HeaderLand, Footer, FormLogin},

  data() {
    return {
    }
  },

  methods: {
  }
}
</script>
