<template>
  <signin>
    <form-login></form-login>
  </signin>
</template>

<script>
import FormLogin from "@/components/FormLogin";
import Footer from "@/components/Books/Layout/Components/Footer";
import HeaderLand from "@/components/Books/Layout/Components/HeaderLand";
import Signin from "@/components/Books/Layout/Signin";
export default {
  name: "login",
  components: {Signin, HeaderLand, Footer, FormLogin},

  data() {
    return {
    }
  },

  methods: {
  }
}
</script>
