<template>
  <header @click="animation" class="relative cursor-pointer w-full">
    <div class="flex items-center justify-center px-2 py-2 bg-gray-200">
      <div class="w-full rounded-lg  p-2 md:p-2 mx-0">
        <div id="cont1" class="text-center">
          <h2 class="text-3xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-5xl">
            <span class="iconHead2">Invoice</span><span class="iconHead text-indigo-600">Sis </span>
            <img :class="(!showHead?'animate-bounce':'')+' float-right iconHead3'"  :src="iconsHead.iconDef"/>
          </h2>
        </div>

        <div v-if="showHead" class="flex flex-wrap mt-10 justify-center">
            <div v-for="(item, index) in socialMedia" class="m-3">
              <a :href="item.url"
                 :class="`rounded-none w-full px-3 py-2 border hover:shadow-md border-${index % 2 === 0? 'pink':'indigo'}-500 text-${index % 2 === 0? 'pink':'indigo'}-700 font-medium  hover:border-gray-500 hover:text-gray-700 rounded-b-md`">
                <span class="mx-auto">{{item.name}}</span>
              </a>
            </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderLand",
  data() {
    return {
      socialMedia : [{name:'Home',url:'/'},{name:'Facebook',url:'#'},{name:'Instagram',url:'#'},{name:'Youtube',url:'#'}],
      iconsHead: {
        iconDef: 'https://img.icons8.com/nolan/64/knowledge-sharing.png',
        icon1:'https://img.icons8.com/nolan/64/knowledge-sharing.png',
        icon2:'https://img.icons8.com/nolan/64/mind-map.png'},
      showHead: false,
    }
  },
  methods: {
    animation() {
      this.showHead = !(this.showHead)
      this.showHead? this.iconsHead.iconDef = this.iconsHead.icon2: this.iconsHead.iconDef = this.iconsHead.icon1
    }
  }
}
</script>

<style scoped>

#cont1 .iconHead {
  display:inline-block;
}

#cont1:hover .iconHead {
  animation: slide-bck-bl 0.45s cubic-bezier(0.470, 0.000, 0.745, 0.715) both;
}

#cont1 .iconHead2 {
  display:inline-block;
}

#cont1:hover .iconHead2 {
  animation: slide-bck-bl2 0.45s cubic-bezier(0.470, 0.000, 0.745, 0.715) both;
}

#cont1 .iconHead3 {
  display:inline-block;
}

#cont1:hover .iconHead3 {
  animation: slide-bck-bl3 1.5s cubic-bezier(0,1.54,.62,.1) both;
}


@keyframes slide-bck-bl {
  0% {
    transform: translateZ(0) translateY(0) translateX(0);
  }
  100% {
    transform: translateZ(-60px) translateY(45px) translateX(-20px);
  }
}

@keyframes slide-bck-bl2 {
  0% {
    transform: translateZ(0) translateY(0) translateX(0);
  }
  100% {
    transform: translateZ(0px) translateY(0px) translateX(20px);
  }
}

@keyframes slide-bck-bl3 {
  0% {
    transform: translateZ(0) translateY(0) translateX(0);
  }
  100% {
    transform: translateZ(0px) translateY(0px) translateX(-38vw);
  }
}

</style>
