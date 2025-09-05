const AppTemplate = /*html*/ `
<div class="control-section" style="margin-top: 5%">

    <ejs-toast ref="toast" :position="{ X: 'Center', Y: 'Top' }"></ejs-toast>

    <div class="row">
        <!-- Linha de inputs principais -->
        <div class="row" style="display: flex; justify-content: center; gap: 10px;">
            <!-- ID-->
            <div class="col-md-2">
                <ejs-textbox 
                    placeholder="Id *" 
                    v-model="valorId" 
                    type="text"
                    cssClass="e-outline"
                    floatLabelType="Auto">
                </ejs-textbox>
            </div>

            <!-- Nome -->
            <div class="col-md-3">
                <ejs-textbox 
                    placeholder="Nome *" 
                    v-model="valorNome" 
                    type="text"
                    cssClass="e-outline"
                    floatLabelType="Auto">
                </ejs-textbox>
            </div>

            <!-- Senha -->
            <div class="col-md-2">
                <div class="position-relative">
                    <ejs-textbox
                        ref="senha"
                        cssClass="e-outline"
                        floatLabelType="Auto"
                        v-model="valorSenha"
                         placeholder="Escreva a senha aqui *"
                        :type="mostrarSenha ? 'text' : 'password'"
                        style="width: 100%;">
                    </ejs-textbox>
                        <!-- Ícone manual -->
                    <i :class="mostrarSenha ? 'bx bx-show' : 'bx bx-hide'" @click="alternarSenha"
                        style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer; color: #666;">
                    </i>
                </div>
            </div>

            <!-- Nível -->
            <div class="col-md-2">
                <ejs-dropdownlist
                    :dataSource="opcoesNivel"
                    v-model="selecionadoNivel"
                    placeholder="Selecione um nível *"
                    :fields="campos"
                    cssClass="e-outline"
                    floatLabelType="Auto">
                </ejs-dropdownlist>
            </div>
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
                        <e-column field="id" headerText="ID"></e-column>
                        <e-column field="nome" headerText="Nome"></e-column>
                        <e-column field="senha" headerText="Senha"></e-column>
                        <e-column field="nivel" headerText="Nível"></e-column>
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
            valorId: null,
            valorNome: "",
            valorSenha: "",
            selecionadoNivel: null,
            opcoesNivel: [],
            campos: { value: 'id', text: 'texto' },
            dataSource: [],
            isEditing: false,
            mostrarSenha: false,
            toolbar: [
                { text: "Search", prefixIcon: "fas fa-search", id: "search" },
                { text: "Editar", prefixIcon: "fas fa-edit", id: "editar" },
                { text: "Excluir", prefixIcon: "fas fa-trash", id: "excluir" }
            ]
        };
    },
    mounted() {
        this.reqLista();
        this.selectNivelUsuario();
    },
    methods: {
        alternarSenha() {
            this.mostrarSenha = !this.mostrarSenha;
        },

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
            this.valorId = null;
            this.valorNome = "";
            this.valorSenha = "";
            this.selecionadoNivel = null;
            this.isEditing = false;
        },

        payload() {
            return {
                id: this.valorId,
                nome: this.valorNome,
                senha: this.valorSenha,
                nivel: this.selecionadoNivel
            };
        },

        sendData(url, data, successCallback) {
            axios.post(BASE + url, data)
                .then(res => {
                    if (res.data.codigo === 1) {
                        successCallback && successCallback(res.data);
                    } else {
                        this.showToast(res.data.texto || 'Erro desconhecido', 'error');
                    }
                })
                .catch(() => this.showToast('Erro ao conectar com o servidor.', 'error'));
        },

        reqLista() {
            this.sendData('/cadastro/listaUsuario', {}, res => {
                this.dataSource = res.dados;
                this.resetForm();
            });
        },

        reqLanca() {
            if (!this.valorId || !this.valorNome || !this.valorSenha || !this.selecionadoNivel) {
                this.showToast('Preencha todos os campos obrigatórios', 'warning');
                return;
            }

            this.sendData('/cadastro/addUsuario', this.payload(), res => {
                this.showToast(res.texto, 'success');
                this.reqLista();
            });
        },

        reqSave() {
            this.sendData('/cadastro/save', this.payload(), res => {
                this.showToast(res.texto, 'success');
                this.reqLista();
            });
        },

        reqCancel() {
            this.resetForm();
        },

        selectNivelUsuario() {
            axios.post(BASE + "/cadastro/selectNivelUsuario")
                .then(res => {
                    this.opcoesNivel = res.data.map(item => ({
                        id: item.codigo,
                        texto: item.descricao
                    }));
                })
                .catch(() => mainLayout.sToast('Erro ao carregar níveis', 'error'));
        },

        getSelectedItem() {
            const items = this.$refs.grid.getSelectedRecords();
            if (!items.length) {
                this.showToast('Por favor, selecione um usuário.', 'warning');
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
                axios.post(BASE + "/cadastro/loadData", { id: itemSelecionado.id })
                    .then(res => {
                        const d = res.data[0];
                        this.valorId = d.id;
                        this.valorNome = d.nome;
                        this.valorSenha = d.senha;
                        this.selecionadoNivel = d.nivel;
                        this.isEditing = true;
                    });
            } else if (args.item.id === 'excluir') {
                if (!confirm("Tem certeza que deseja excluir esse item?")) return;

                axios.post(BASE + "/cadastro/del", { id: itemSelecionado.id })
                    .then(res => {
                        this.showToast(res.data.texto, 'success');
                        this.reqLista();
                    });
            }
        }
    }
});
