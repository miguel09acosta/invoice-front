<template>
  <div>
    <FormulateForm  v-model="user" @submit="saveUser">
      <h2 class="text-2xl mb-2">{{titleForm}} : {{idBuy}}</h2>
      <div class="mb-6 sm:grid sm:gap-4 sm:grid-cols-1">
        <div  v-for="e in userSchema" :key="e.name">
          <FormulateInput v-if="e.name === 'pay_type'" @input="showType = user.pay_type"
            :options="e.opt"
            :value="e.val"
            :type="e.typeInput"
            :name="e.name"
            :label="e.label"
            :validation="e.validation"
            :outer-class="e.classOut"
            :input-class="'rounded-none relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'"
            :error-class="e.errorClass"
          />
          <FormulateInput v-else
            :options="e.opt"
            :value="e.val"
            :type="e.typeInput"
            :name="e.name"
            :label="e.label"
            :validation="e.validation"
            :outer-class="e.classOut"
            :input-class="'rounded-none relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'"
            :error-class="e.errorClass"
          />
        </div>

        <div v-if="showType == 1" v-for="e in creditSchema" :key="e.name">
          <FormulateInput
            :options="e.opt"
            :value="e.val"
            :type="e.typeInput"
            :name="e.name"
            :label="e.label"
            :validation="e.validation"
            :outer-class="e.classOut"
            :input-class="'rounded-none relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'"
            :error-class="e.errorClass"
          />
        </div>

        <div v-if="showType == 2" v-for="e in debitSchema" :key="e.name">
          <FormulateInput
            :options="e.opt"
            :value="e.val"
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
import * as BuysApi from "@/utils/buysApi";

const classDef = 'form-input rounded-md shadow-sm w-full';
const classOut = 'w-full';
const errorClass='text-sm text-red-600';
const styl = {classOut,errorClass};
const optGender = {'': 'Seleccione', 1:'Crédito',2:'Débito'};

export default {
  props : ['idBuy'],
  name: "PayForm",
  data() {
    return {
      titleForm : 'Datos para envío y pago',
      showType : 0,
      user: {},
      userSchema: [
        {name: 'adress',typeInput : 'text', label:'Dirección Completa', validation: 'required', inpClass:classDef, ...styl },
        {name: 'pay_type',typeInput : 'select', label:'Método de pago', val: '' , opt : optGender, validation: 'required', inpClass:classDef, ...styl },
      ],
      creditSchema: [
        {name: 'number_card',typeInput : 'number', label:'Número Tarjeta', validation: 'required', inpClass:classDef, ...styl },
        {name: 'titular_card',typeInput : 'text', label:'Titular Tarjeta', validation: 'required', inpClass:classDef, ...styl },
        {name: 'dues_card',typeInput : 'number', label:'Número Cuotas', validation: 'required', inpClass:classDef, ...styl },
        {name: 'cvv_card',typeInput : 'number', label:'CCV', validation: 'required', inpClass:classDef, ...styl },
        {name: 'state',typeInput : 'radio', label:'Acepta realizar la compra',opt:{2:''},validation: 'required', inpClass:classDef, ...styl },
      ],
      debitSchema: [
        {name: 'debit_bank',typeInput : 'text', label:'Nombre del Banco', validation: 'required', inpClass:classDef, ...styl },
        {name: 'debit_document',typeInput : 'number', label:'Número Documento', validation: 'required', inpClass:classDef, ...styl },
        {name: 'state',typeInput : 'radio', label:'Acepta realizar la compra',opt:{2:''},validation: 'required', inpClass:classDef, ...styl },
      ]
    };
  },
  methods: {
    async saveUser(){
      if (this.idBuy) {
        const response = await BuysApi.update(this.idBuy,{data:this.user})
        alert(response.data.code === 200 ? ' Felicitaciones compra aprobada, pronto recibirá su pedido' : response.data.message + ' Se presentó un problema, intente más tarde')
        window.location.replace('/')
      }

    }
  },
  mounted() {
  }
};
</script>
