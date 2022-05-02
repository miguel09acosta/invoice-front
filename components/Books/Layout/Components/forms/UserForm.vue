<template>
    <div>
        <FormulateForm  v-model="uservalues" @submit="saveUser">
            <h2 class="text-2xl mb-2">{{titleForm}}</h2>
            <div class="mb-6 sm:grid sm:gap-4 sm:grid-cols-1">
                <div  v-for="e in userSchema" :key="e.name">
                    <FormulateInput v-if="e.name === 'departament'" @input="changeCities(uservalues.departament)"
                                    :options="deptos"
                                    :type="e.typeInput"
                                    :name="e.name"
                                    :label="e.label"
                                    :validation="e.validation"
                                    :outer-class="e.classOut"
                                    :input-class="e.inpClass"
                                    :error-class="e.errorClass"
                    />
                    <FormulateInput v-else-if="e.name === 'city'"
                                    :options="cities"
                                    :type="e.typeInput"
                                    :name="e.name"
                                    :label="e.label"
                                    :validation="e.validation"
                                    :outer-class="e.classOut"
                                    :input-class="e.inpClass"
                                    :error-class="e.errorClass"
                    />
                    
                    <FormulateInput v-else-if="e.name === 'password' && !newUser"
                                    :options="categories"
                                    :type="e.typeInput"
                                    :name="e.name"
                                    :label="e.label"
                                    :validation="e.validation"
                                    :outer-class="e.classOut"
                                    :input-class="e.inpClass"
                                    :error-class="e.errorClass"
                    />
                    <FormulateInput v-else-if="e.name === 'rol' && !newUser && $nuxt.$auth.loggedIn"
                                    :options="e.opt"
                                    :type="e.typeInput"
                                    :name="e.name"
                                    :label="e.label"
                                    :validation="e.validation"
                                    :outer-class="e.classOut"
                                    :input-class="'form-input rounded-md shadow-sm w-full'"
                                    :error-class="e.errorClass"
                    />
                    <FormulateInput v-else-if="e.name !== 'password' && e.name !== 'rol'"
                                    :options="e.opt"
                                    :type="e.typeInput"
                                    :name="e.name"
                                    :label="e.label"
                                    :validation="e.validation"
                                    :outer-class="e.classOut"
                                    :input-class="e.inpClass"
                                    :error-class="e.errorClass"
                    />
                </div>
            </div>

            <FormulateInput
                input-class="w-full flex py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
            />
             <!--<pre class="mt-8 p-2 bg-gray-200 whitespace-pre text-sm">{{ uservalues }}</pre> -->
        </FormulateForm>
    </div>
</template>

<script>
import * as UserApi from "~/utils/userApi";

const valDef = '^required|min:5';
const classDef = 'rounded-none relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm';
const classOut = '-pt-8 md:-pt-8';
const errorClass='text-sm text-red-600';
const styl = {classOut,errorClass};
const optGender = {1:'Hombre',2:'Mujer',3:'Otro'};
const optRol = {1:'Admin',2:'Cliente'};

export default {
    props : ['newUser'],
    data() {
        return {
            titleForm : 'Información Usuario',
            categories: {},
            cities: {1:'Pereira'},
            deptos : {1:'Risaralda'},
            uservalues: {},
            userSchema: [
                {name: 'name',typeInput : 'text', label:'Nombre Completo', validation: valDef, inpClass:classDef, ...styl },
                {name: 'birthdate',typeInput : 'date', label:'Fecha de nacimiento', validation: 'required|date', inpClass:classDef, ...styl },
                {name: 'departament',typeInput : 'select', label:'Departamento', validation: 'required', inpClass:classDef, ...styl },
                {name: 'city',typeInput : 'select', label:'Ciudad', validation: 'required', inpClass:classDef, ...styl },
                {name: 'gender',typeInput : 'select', label:'Genero',opt:optGender, validation: 'required', inpClass:classDef, ...styl },
                {name: 'email',typeInput : 'email', label:'Correo', validation: 'required|email', inpClass:classDef, ...styl },
                {name: 'rol',typeInput : 'select', label:'Rol',opt:optRol, validation: 'required', inpClass:classDef, ...styl },
                {name: 'password',typeInput : 'password', label:'Contraseña', validation: 'required|min:8', inpClass:classDef, ...styl },
            ]
        };
    },
    methods: {
        changeCities(code){
            $nuxt.$axios.get('https://www.datos.gov.co/resource/xdk5-pm3f.json?c_digo_dane_del_departamento='+code+'&$select=municipio,c_digo_dane_del_municipio')
                .then(response => {
                    this.cities = (response.data);
                    const objMerge ={};
                    this.cities.forEach(element => {
                        objMerge[(`${element.c_digo_dane_del_municipio}`+" ").trim()] = element.municipio;
                    });
                    this.cities = objMerge;
                })
        },
        submitted() {
            alert("Password reset!");
        },
        apiGov(){
            $nuxt.$axios.get('https://www.datos.gov.co/resource/xdk5-pm3f.json?$select=departamento,c_digo_dane_del_departamento&$group=departamento,c_digo_dane_del_departamento')
                .then(response => {
                    this.deptos = (response.data);
                    const objMerge ={};
                    this.deptos.forEach(element => {
                        objMerge[(`${element.c_digo_dane_del_departamento}`+" ").trim()] = element.departamento;
                    });
                    this.deptos = objMerge;
                })
        },
        async saveUser(){
            if (this.uservalues.id){
                const response = await UserApi.update(this.uservalues.id, {data:this.uservalues})
                alert(response.data.code === 200? response.data.message+' Success' : response.data.message+' Valide fecha')
                window.location.replace("/");

            } else {
                const response2 = await UserApi.create( {data:this.uservalues} )
                alert(response2.data.code === 200? response2.data.message+' Success' : response2.data.message+' Valide fecha')
                window.location.replace("/");

            }

        }
    },
    async mounted() {
        if (this.newUser){
            const response = await UserApi.show(6)
            this.uservalues = response.data

        }

    }
};
</script>
