<template>
    <div v-if="user">
        <p2 class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-pink-600 bg-pink-200 uppercase last:mr-0 mr-1">rol: {{ user.rol == 1 ? 'Super Admin' : 'Admin' }}</p2><br>
            <!-- debug controller -->  
            <b-form-checkbox v-if="user.rol == 1" v-model="debug" name="check-button" switch>
                Ver data para debug
            </b-form-checkbox><br>
                
            <!-- New resource -->
            <div class="row">
                <div class="col-12">
                    <form @submit.prevent="createResource()" action="#">
                    <b-card
                    header-tag="header"
                    tag="article"
                    class="m-3"
                    >
                        <template #header>
                        <h4 class="mb-0">
                            <b-button v-b-toggle.collapse-1 class="btn btn-sm btn-info mx-0" size="sm">
                            +
                            </b-button> Nueva Factura
                        </h4>
                        </template>
                        
                        <b-collapse id="collapse-1" class="mt-2">
                        <b-card-text>
                            <div class="row">
                            <div v-for="i in form.inputs" :class="'col-12 col-md-'+i.colSize" :key="'inputs_'+i.key">
                                <label class="mt-2">{{i.label}}</label>
                                <b-form-input v-if="i.type == 'number'" v-model.number="newResource[i.key]" :readonly="i.readonly" :required="i.required" :type="i.type" placeholder="Buscar" size="sm"></b-form-input>
                                <b-form-checkbox v-else-if="i.type == 'bool'" v-model="newResource[i.key]" switch></b-form-checkbox>
                                <b-form-input v-else v-model="newResource[i.key]" :readonly="i.readonly" :required="i.required" :type="i.type" placeholder="Buscar" size="sm"></b-form-input>
                            </div>
                            </div>
                        </b-card-text><br><br>
                        <p>Detalle de la factura</p>
                        <!-- new detail -->
                        <b-row class="my-1">
                            <b-col sm="3">
                                <b-form-input type="text" v-model="newDetail.product_description" id="input-large" size="sm"></b-form-input>
                            </b-col>
                            <b-col sm="3">
                                <b-form-input min="1" @change="newDetail.total = newDetail.quantity * newDetail.unit_value" type="number" v-model.number="newDetail.quantity" id="input-large" size="sm" placeholder="Enter your name"></b-form-input>
                            </b-col>
                            <b-col sm="3">
                                <b-form-input @change="newDetail.total = newDetail.quantity * newDetail.unit_value" type="number" v-model.number="newDetail.unit_value" id="input-large" size="sm" placeholder="Enter your name"></b-form-input>
                            </b-col>
                            <b-col sm="2">
                                <b-form-input disabled type="number" v-model="newDetail.total" id="input-large" size="sm" placeholder="Enter your name"></b-form-input>
                            </b-col>
                            <b-col sm="1">
                                <button @click="addDetail(newDetail)" class="btn btn-sm btn-primary" type="submit">+</button>
                            </b-col>
                        </b-row>
                        <!-- table details -->
                        <b-table striped hover :items="newDetails" :fields="fieldDetails"></b-table>
                        <button class="btn btn-primary" type="submit">Crear</button>
                        <div v-if="debug"> <span v-b-toggle.collapse-dev1 class="btn btn-md">newResource →</span>
                            <b-collapse visible id="collapse-dev1" class="mt-2"><pre class="alert alert-dark"><code>{{newResource}}</code></pre></b-collapse>
                        </div>
                        <div v-if="debug"> <span v-b-toggle.collapse-dev2 class="btn btn-md">form →</span>
                            <b-collapse visible id="collapse-dev2" class="mt-2">
                                <pre class="alert alert-dark"><code>{{fieldDetails}}</code></pre>
                                <pre class="alert alert-dark"><code>{{newDetails}}</code></pre>
                                <pre class="alert alert-dark"><code>{{form}}</code></pre>
                            </b-collapse>
                        </div>
                        </b-collapse>
                    </b-card>
                    </form>
                    
                </div>
            </div><br><br>

            <!-- all table data -->
            <div>
                <!-- Filtro universal -->
                <b-col lg="6" class="my-1">
                    <b-form-input id="filter-input" v-model="table.filter" type="search" placeholder="Buscar"></b-form-input>
                    <b-form-checkbox-group v-model="table.filterOn" class="mt-1">
                        <b-form-checkbox v-for="check in table.checksFiltered" :value="check" :key="'check_'+check">{{check}}</b-form-checkbox>
                    </b-form-checkbox-group>
                </b-col>

                <!-- input para cantidad de filas -->
                <div class="col-12 text-right">
                    <span class="">Filas</span>
                    <b-form-select id="per-page-select" class="col-2" v-model="perPage" :options="searchfilters.pageOptions" size="sm"></b-form-select>
                </div>
                <!-- apagar y encender columnas en tabla -->
                <div class="col-12 text-right">
                    <b-dropdown id="dropdown-form" text="ver columnas" ref="dropdown" class="m-2">
                        <b-dropdown-form>
                            <b-form-group>
                                <template #label>
                                    <b-form-checkbox v-model="table.allSelected" aria-describedby="columns" aria-controls="columns" @change="toggleAll"></b-form-checkbox>
                                </template>
                                <template v-slot="{ ariaDescribedby }">
                                    <b-form-checkbox-group id="columns" v-model="table.selected" :options="table.columns" :aria-describedby="ariaDescribedby" name="columns" class="ml-4" aria-label="Individual columns" stacked></b-form-checkbox-group>
                                </template>
                            </b-form-group>
                        </b-dropdown-form>
                    </b-dropdown>
                </div>

                <div v-if="debug"> <span v-b-toggle.collapse-dev5 class="btn btn-md">table.selected →</span>
                    <b-collapse visible id="collapse-dev5" class="mt-2"><pre class="alert alert-dark"><code>{{table.selected}}</code></pre></b-collapse>
                </div>
                
                <button @click="table.tableStack = !table.tableStack" class="btn btn-light">
                    <i :class="(table.tableStack ? 'text-cyan' : '') + ' far fa-list-alt'"></i></i> Apilar
                </button>
                <button @click="table.stickyHeader = !table.stickyHeader" class="btn btn-light">
                    <i :class="(table.stickyHeader ? 'text-cyan' : '') + ' far fa-list-alt'"></i> Fijar Cabecera
                </button>

                <!-- table -->
                <b-table
                    :items="items"
                    :fields="colsChecked"
                    :sticky-header="table.stickyHeader"
                    :stacked="table.tableStack"
                    striped
                    :per-page="0"
                    :current-page="currentPage"
                    :filter="table.filter"
                    :filter-included-fields="table.filterOn"
                >
                    <template #cell(actions)="row">
                        <span role="button" class="rounded btn btn-sm btn-danger" @click="deleteResource(row.item.id)">
                            Eliminar
                        </span>
                        <span role="button" class="rounded btn btn-sm btn-info" @click="updateResource(row.item)">
                            Editar
                        </span>
                    </template>
                    <template #cell(customer_nit)="row">
                        <input type="number" v-model.number="row.item.customer_nit" class="text-left btn btn-sm px-0">
                    </template>
                    <template #cell(customer_name)="row">
                        <input type="text" v-model="row.item.customer_name" class="text-left btn btn-sm px-0">
                    </template>
                    <template #cell(user_id)="row">
                        <input type="number" v-model.number="row.item.user_id" class="text-left btn btn-sm px-0">
                    </template>
                    <template #cell(iva)="row">
                        <input type="number" v-model.number="row.item.iva" class="text-left btn btn-sm px-0">
                    </template>
                    <template #cell(before_iva)="row">
                        <input type="number" v-model.number="row.item.before_iva" class="text-left btn btn-sm px-0">
                    </template>
                    <template #cell(total)="row">
                        <input type="number" v-model.number="row.item.total" class="text-left btn btn-sm px-0">
                    </template>

                </b-table>
                <p class="mt-3">Total: {{table.totalItems}}</p>
                <b-pagination
                    pills
                    v-model="currentPage"
                    :total-rows="table.totalItems"
                    :per-page="perPage"
                >
                </b-pagination>
                <div v-if="debug"> <span v-b-toggle.collapse-dev3 class="btn btn-md">resources →</span>
                    <b-collapse visible id="collapse-dev3" class="mt-2"><pre class="alert alert-dark"><code>{{resources}}</code></pre></b-collapse>
                </div>
                <div v-if="debug"> <span v-b-toggle.collapse-dev4 class="btn btn-md">table →</span>
                    <b-collapse visible id="collapse-dev4" class="mt-2"><pre class="alert alert-dark"><code>{{table}}</code></pre></b-collapse>
                </div>

                <!-- modal edit -->
                <b-modal size="lg" id="modalCrud" :title="infoModal.title" ok-only @hide="">
                    <div>

                    </div>
                    <pre v-if="debug">{{ infoModal.content }}</pre>
                </b-modal>
            </div>
    </div>
</template>

<script>
import * as UserApi from '~/utils/userApi'
import * as TransactionsApi from "@/utils/transactionsApi";
import * as TransactiondetailsApi from "@/utils/transactiondetailsApi";
import SkeletonCard from "@/components/UxElements/SkeletonCard";

export default {
    components: {SkeletonCard},
    props:['shopInfo'],
    name: "Transaction",
    data(){
        return {
            newResource: {
                "customer_nit": null,
                "customer_name": '',
                "user_id": $nuxt.$auth.user.id,
                "iva": 19,
                "before_iva": 0,
                "total": 0
            },
            form: {
                inputs: [
                    {"label": "Nit Cliente", key: "customer_nit", "colSize": "6", "placeholder": "", "type": "number", "required": true},
                    {"label": "Nombre Cliente", key: "customer_name", "colSize": "6", "placeholder": "", "type": "text", "required": true},
                    {"label": "Grabador Id", key: "user_id", "colSize": "6", "placeholder": "", type: "number", "required": true, "readonly": true},
                    {"label": "iva", key: "iva", "colSize": "6", "placeholder": "", "type": "number", "required": true, "readonly": true},
                    {"label": "Antes iva", key: "before_iva", "colSize": "6",  type: "number", "required": true, "readonly": true},
                    {"label": "Total", key: "total", "colSize": "6", "placeholder": "", type: "number", "required": true, "readonly": true}
                ],
            },
            currentPage: 0,
            perPage: 5,
            resource: {
            },
            searchfilters: {
                pageOptions: [5, 10, 15, { value: 100, text: "100" }],
                form: {},
            },
            table: {
                filter: null,
                filterOn: [],
                checksFiltered: ["actions","id","customer_nit", "customer_name", "user_id", "iva", "before_iva","total"],
                columns: ["actions","id","customer_nit", "customer_name", "user_id", "iva", "before_iva","total"],
                selected: ["actions","id","customer_nit", "customer_name", "user_id", "iva", "before_iva","total"],
                allSelected: true,
                tableStack: false,
                stickyHeader: true,
                totalItems: 0,
                fields: [
                    {key: 'actions', label: 'Acciones', sorteable: false},
                    {key: 'id', label: 'Id', sorteable: false},
                    {key: 'customer_nit', label: 'Nit Cliente', sorteable: false},
                    {key: 'customer_name', label: 'Nombre Cliente', sorteable: false},
                    {key: 'user_id', label: 'Grabador Id', sorteable: false},
                    {key: 'iva', label: 'Iva', sorteable: false},
                    {key: 'before_iva', label: 'Antes Iva', sorteable: false},
                    {key: 'total', label: 'Total', sorteable: false}
                ],
            },
            infoModal: {
                title: '',
                content: ''
            },
            debug: false,
            resources: [],
            user: false,
            skeletonShow : false,
            newDetail: {product_description: 'Lorem ipsum',quantity: 1,unit_value: 6500,total: 6500},
            newDetails: [],
            fieldDetails: [{key: 'product_description',label:'Descripcion'},{key: 'quantity',label:'Cantidad'},{key: 'unit_value',label:'Valor unitario'},{key: 'total',label:'Total'}]
        }
    },
    async mounted() {
        if($nuxt.$auth.loggedIn){
            const response = await UserApi.userget()
            this.user = response.data
        }
        /* this.getResources() */
    },
    methods: {
        addDetail(newDetail){
            const copyNewDetail = Object.assign({}, newDetail);
            if(copyNewDetail.quantity != 0){
                this.newDetails.push(copyNewDetail)
                this.newResource.before_iva = this.totalInvoice
                this.newResource.total = this.totalInvoice * ((this.newResource.iva / 100) + 1)
            }else {
                alert('Debe tener una cantidad mayor a cero')
            }
        },
        async getResources() {
            const response = await TransactionsApi.index()
            this.resources = response.data.records
            this.table.totalItems = response.data.length
        },
        async createResource() {
            if(this.newDetails.length > 0){
                const response = await TransactionsApi.create({data: this.newResource})
                this.newDetails.forEach(async e => {
                    e['transaction_id'] = response.data.records.id
                    await TransactiondetailsApi.create({data: e})
                });
                this.getResources()
                this.newDetails = []
                this.newResource = {"customer_nit": null,"customer_name": '',"user_id": $nuxt.$auth.user.id,"iva": 19,"before_iva": 0,"total": 0}
            }else{
                alert('no existen detalles de la factura')
            }
            
        },
        async updateResource(resourceObj) {
            const copyResourceData = Object.assign({}, resourceObj);
            delete copyResourceData.created_at
            delete copyResourceData.updated_at
            const response = await TransactionsApi.update(resourceObj.id, {data: copyResourceData})
            this.getResources()
        },
        async deleteResource(id) {
            const response = await TransactionsApi.destroy(id)
            this.getResources()
        },
        async info(item, index, button) {
            this.infoModal.title = item.resourceId
            this.$root.$emit('bv::show::modal', 'modalCrud', button)
        },
        onClick() {
            this.$refs.dropdown.hide(true)
        },
        toggleAll(checked) {
            this.table.selected = checked ? this.table.columns.slice() : []
        },
    },
    computed: {
        totalInvoice(){
            let initialValue = 0
            return this.newDetails.reduce(function (previousValue, currentValue) {
                return previousValue + currentValue.total
            }, initialValue)
        },
        colsChecked(){
            return this.table.selected.length !== 0
                ? this.table.fields.filter(field => this.table.selected.includes(field.key))
                : this.table.fields
        },
        items(){
            return this.resources
        },
        rows(){
            return this.items.length
        }
    },
    watch: {
        currentPage: function(){
            this.getResources().catch(error => {
                console.error(error)
            })
        },
        perPage: function(){
            this.getResources().catch(error => {
                console.error(error)
            })
        }
    },
}
</script>

<style scoped>

</style>
