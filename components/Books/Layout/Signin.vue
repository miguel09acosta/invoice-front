<template>
  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css">
    <svg width="50" height="0">
      <defs>
        <clipPath id="svgPath">
          <path transform="scale(1.9,1.6) translate(40,0)" style="fill:#ECEFF1;" d="M496,432.011H272c-8.832,0-16-7.168-16-16s0-311.168,0-320s7.168-16,16-16h224
            c8.832,0,16,7.168,16,16v320C512,424.843,504.832,432.011,496,432.011z"/>
          <path transform="scale(1.9,1.6) translate(0,0)" style="fill:#2E7D32;" d="M282.208,19.691c-3.648-3.04-8.544-4.352-13.152-3.392l-256,48C5.472,65.707,0,72.299,0,80.011v352
            c0,7.68,5.472,14.304,13.056,15.712l256,48c0.96,0.192,1.952,0.288,2.944,0.288c3.712,0,7.328-1.28,10.208-3.68
            c3.68-3.04,5.792-7.584,5.792-12.32v-448C288,27.243,285.888,22.731,282.208,19.691z"/>
        </clipPath>
      </defs>
    </svg>

    <div class="flex flex-col h-screen justify-between">
      <HeaderLand></HeaderLand>
      <section class=" w-full h-full text-gray-700 body-font flex md:flex-row flex-col items-center bg-white">
        <div
          class="transition duration-500 ease-in-out lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 class="w-3/4 w-3/4 mt-4 title-font sm:text-1xl text-3xl mb-4 font-medium text-gray-900">{{labels.labelMainH1}}</h1>
          <p class="text-lg	text-gray-700 font-mono w-3/4 my-4 leading-relaxed"><span id="typing">{{labels.labelMainP}}<span>&nbsp;</span></span>
            <br><span class="text-sm px-3 bg-indigo-100 text-gray-800 rounded-full">{{labels.labelMainAuthor}}</span>
          </p>

          <div class=" sm:1/2 w-3/4">
            <slot></slot>
          </div>


          <p class="text-sm mt-2 text-gray-500 mb-8 w-full">{{labels.labelKeep}}
            <span class="text-gray-700"><a :href="`${urapi}/`+($nuxt.$route.name === 'login'?`register`:`login`)">{{$nuxt.$route.name == 'login'?'Registrarse':'Iniciar Sesión'}}</a></span>
          </p>
          <div class="flex lg:flex-row md:flex-col">
            <a v-for="icon in media.iconsSocial" class="mx-2 text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
              <i :class="`fab ${icon.nameIcon}`"></i>
            </a>
          </div>
        </div>
        <div @mouseover="media.img = media.defaultImg2;" @mouseleave="media.img = media.defaultImg" class="imgbag transform  opacity-100 hover:opacity-80 md:w-5/6 ">
          <img class="rotate-leave-active shadow md:shadow-lg object-cover md:h-screen" alt="hero" :src="media.img">
        </div>
      </section>

      <div class="w-full">
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>

<script>
import FormLogin from "@/components/FormLogin";
import Footer from "@/components/Books/Layout/Components/Footer";
import HeaderLand from "@/components/Books/Layout/Components/HeaderLand";
import {confApi} from '@/utils/environments';

export default {
  name: "Signin",
  components: {HeaderLand, Footer, FormLogin},

  data() {
    return {
      urapi:confApi.URL_SPA,
      labels : {
        labelMainH1:'Bienvenido',
        labelMainP:'La verdadera medida del valor de cualquier líder y gerente es el rendimiento.',
        labelMainAuthor:'-Brian Tracy.',
        labelKeep: 'Enterate de lo que está pasando.'
      },
      media: {
        img : 'https://images.pexels.com/photos/3769697/pexels-photo-3769697.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        defaultImg: 'https://images.pexels.com/photos/3769697/pexels-photo-3769697.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        defaultImg2: 'https://images.pexels.com/photos/816527/pexels-photo-816527.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        iconsSocial: [{nameIcon:'fa-linkedin-in'},{nameIcon:'fa-facebook-f'},{nameIcon:'fa-twitter'},{nameIcon:'fa-youtube'}]
      },

    }
  },

  methods: {
  }
}
</script>

<style scoped>

@media (min-width: 800px){
  .imgbag {
    clip-path: url(#svgPath);
  }
}

.rotate-leave-active { animation: 4s spotlight cubic-bezier(0,1.09,.75,.1) ; animation-delay: 5s; animation-iteration-count: 2}

@keyframes spotlight {
  0% { clip-path: circle(100% at 50% 50%); }
  25% { clip-path: circle(10% at 50% 50%); }
  50% { clip-path: circle(15% at 12% 84%); }
  75% { clip-path: circle(20% at 93% 51%); }
  100% { clip-path: circle(20% at -30% 20%); }
}

/* Basic styles */
#typing {
  position: relative;
  float: left;
}
#typing span{
  position: absolute;
  top: 0;
  right: 0;
  background: #ffffff;
  border-left: .1em solid transparent;
  animation: typing .6s steps(20) forwards,
  cursor 1s infinite;
}
/* Animation */
@keyframes typing{
  0%{ width: 100%;height: 200%;}
  100%{ width: 0; height:180%;}

}
@keyframes cursor{
  50% { border-color: black;}
}

</style>
