const AppTemplate = /*html*/ `

<div class="control-section" style="margin-top: 5%">
    <!-- Toast -->
    <ejs-toast ref="toast" :position="{ X: 'Center', Y: 'Top' }"></ejs-toast>
    
    <div class="row">
            <!-- ID-->
            <div class="col-md-2">
                <ejs-textbox 
                    placeholder="Tipo Lancamento" 
                    v-model="valorCodigo" 
                    type="hidden"
                    cssClass="e-outline"
                    floatLabelType="Auto">
                </ejs-textbox>
            </div>
        <!-- Linha de inputs principais -->
        <div class="row" style="display: flex; justify-content: center; gap: 10px;">
            
            <!-- descricao -->
            <div class="col-md-4">
                <ejs-textbox 
                    placeholder="Descrição" 
                    v-model="valorDescricao" 
                    type="text"
                    cssClass="e-outline"
                    floatLabelType="Auto">
                </ejs-textbox>
            </div>

        <!-- Botões -->
        <div class="row" style="margin-top: 20px; justify-content: center;">
            <div class="col-md-4" style="display: flex; justify-content: center; gap: 20px;">
                <div v-if="!isEditing">
                    <ejs-button cssClass="e-primary" @click.native="reqLanca">Cadastrar</ejs-button>
                </div>
                <div v-else>
                    <ejs-button cssClass="e-success" @click.native="reqSave">Salvar</ejs-button>
                    <ejs-button cssClass="e-warning" @click.native="reqCancel">Cancelar</ejs-button>
                </div>
            </div>
        </div>

        <!-- Grid -->
        <div class="row" style="margin-top: 20px;">
            <div class="col-md-12">
                <ejs-grid 
                    ref="grid"
                    :dataSource="dataSource"
                    height="600px"
                    :allowPaging="true"
                    :allowSorting="true"
                    :toolbar="toolbar"
                    :toolbarClick="toolbarClick"
                    :pageSettings="{ pageSizes: true, pageSize: 12 }"
                    :searchSettings="{ ignoreCase: true, ignoreAccent: true }">

                    <e-columns>
                        <e-column field="codigo" headerText="Código"></e-column>
                        <e-column field="descricao" headerText="Descrição"></e-column>
                    </e-columns>
                </ejs-grid>
            </div>
        </div>
    </div>
</div>
`;

Vue.component('AppVue', {
    template: AppTemplate,
    data() {
        return {
            valorCodigo: null,
            valorDescricao: "",
            dataSource: [],
            isEditing: false,
            toolbar: [
                { text: "Search", id: "search" },
                { text: "Editar", prefixIcon: "fas fa-edit", id: "editar" },
                { text: "Excluir", prefixIcon: "fas fa-trash", id: "excluir" }
            ]
        };
    },
    mounted() {
        this.reqLista();
    },
    methods: {
        showToast(message, type = 'info') {
            let css = 'e-toast-info';
            if (type === 'success') css = 'e-toast-success';
            else if (type === 'error') css = 'e-toast-danger';
            else if (type === 'warning') css = 'e-toast-warning';

            this.$refs.toast.show({
                content: message,
                cssClass: css,
                timeOut: 3000, // 3 segundos
                showCloseButton: true
            });
        },

        resetForm() {
            this.valorCodigo = null;
            this.valorDescricao = "";
            this.isEditing = false;
        },

        payload() {
            return {
                codigo: this.valorCodigo,
                descricao: this.valorDescricao,
            };
        },

        sendData(url, data, successCallback) {
            axios.post(BASE + url, data)
                .then(res => {
                    if (res.data.codigo === 1) {
                        successCallback && successCallback(res.data);
                    } else {
                        this.showToast(res.data.texto, 'error');
                    }
                })
                .catch(() => this.showToast("Por favor, selecione um registro", 'warning'));
        },

        reqLista() {
            this.sendData('/tipofluxo/listaTipoFluxo', {}, res => {
                this.dataSource = res.dados;
                this.resetForm();
            });
        },

        reqLanca() {
            this.sendData('/tipofluxo/addTipoFluxo', this.payload(), res => {
                this.showToast(res.texto, 'success');
                this.reqLista();
            });
        },

        reqSave() {
            this.sendData('/tipofluxo/save', this.payload(), res => {
                this.showToast(res.texto, 'success');
                this.reqLista();
            });
        },

        reqCancel() {
            this.resetForm();
        },

        /** Retorna primeiro item selecionado do grid */
        getSelectedItem() {
            const items = this.$refs.grid.getSelectedRecords();
            if (!items.length) {
                this.showToast('Por favor, selecione um registro.', 'warning');
                return null;
            }
            return items[0];
        },

        toolbarClick(args) {
            if (args.item.id === 'search') {
                return;
            }

            const itemSelecionado = this.getSelectedItem();
            if (!itemSelecionado) return;

            if (args.item.id === 'editar') {
                axios.post(BASE + "/tipofluxo/loadData", { id: itemSelecionado.codigo })
                    .then(res => {
                        const d = res.data[0];
                        this.valorCodigo = d.codigo;
                        this.valorDescricao = d.descricao;
                        this.isEditing = true;
                    });
            } else if (args.item.id === 'excluir') {
                if (!confirm("Tem certeza que deseja excluir esse item?")) return;

                axios.post(BASE + "/tipofluxo/del", { id: itemSelecionado.codigo })
                    .then(res => {
                        this.showToast(res.data.texto, 'success');
                        this.reqLista();
                    });
            }
        }
    }
});
