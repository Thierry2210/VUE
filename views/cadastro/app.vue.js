const AppTemplate = /*html*/ `
<div class="control-section" style="margin-top: 5%">
    <div class="row">
        <!-- Linha de inputs principais -->
        <div class="row" style="display: flex; justify-content: center; gap: 10px;">
            <!-- ID-->
            <div class="col-md-2">
                <ejs-textbox 
                    placeholder="Id" 
                    v-model="valorId" 
                    type="text">
                </ejs-textbox>
            </div>

            <!-- Nome -->
            <div class="col-md-3">
                <ejs-textbox 
                    placeholder="Nome" 
                    v-model="valorNome" 
                    type="text">
                </ejs-textbox>
            </div>

            <!-- Senha -->
            <div class="col-md-2">
                <ejs-textbox 
                    placeholder="Senha" 
                    v-model="valorSenha" 
                    type="password">
                </ejs-textbox>
            </div>

            <!-- Nível -->
            <div class="col-md-2">
                <ejs-dropdownlist
                    :dataSource="opcoesNivel"
                    v-model="selecionadoNivel"
                    placeholder="Selecione um nível"
                    :fields="campos">
                </ejs-dropdownlist>
            </div>
        </div>

        <!-- Botões -->
        <div class="row" style="margin-top: 20px; justify-content: center;">
            <div class="col-md-4" style="display: flex; justify-content: center; gap: 20px;">
                <div v-if="!isEditing">
                    <ejs-button @click.native="reqLanca" cssClass="e-outline">Cadastrar</ejs-button>
                    <ejs-button @click.native="reqLista">Chamar Infos</ejs-button>
                </div>
                <div v-else>
                    <ejs-button @click.native="reqSave" class="btn btn-primary">Salvar</ejs-button>
                    <ejs-button @click.native="reqCancel">Cancelar</ejs-button>
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
        const usuario = JSON.parse(localStorage.getItem('usuario')) || {};
        return {
            usuarioNivel: usuario.nivel || 0,
            valorId: null,
            valorNome: "",
            valorSenha: "",
            selecionadoNivel: null,
            opcoesNivel: [],
            campos: { value: 'id', text: 'texto' },
            dataSource: [],
            isEditing: false,
            toolbar: [
                "Search",
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
                    if (res.data.codigo === 1) successCallback && successCallback(res.data);
                    else mainLayout.sToast(res.data.texto || 'Erro desconhecido', '', 'error');
                })
                .catch(() => mainLayout.sToast('Erro ao conectar com o servidor.', '', 'error'));
        },
        reqLista() {
            this.sendData('/cadastro/listaUsuario', {}, res => {
                this.dataSource = res.dados;
                this.resetForm();
            });
        },
        reqLanca() {
            this.sendData('/cadastro/addLancamento', this.payload(), res => {
                mainLayout.sToast(res.texto, '', 'success');
                this.reqLista();
            });
        },
        reqSave() {
            this.sendData('/cadastro/save', this.payload(), res => {
                mainLayout.sToast(res.texto, '', 'success');
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
                .catch(() => mainLayout.sToast('Erro ao carregar níveis', '', 'error'));
        },
        getSelectedItem() {
            const items = this.$refs.grid.getSelectedRecords();
            if (!items.length) {
                mainLayout.sToast('Por favor, selecione um registro.', '', 'warning');
                return null;
            }
            return items[0];
        },
        toolbarClick(args) {
            const usuario = this.getSelectedItem();
            if (!usuario) return;

            if (args.item.id === 'editar') {
                axios.post(BASE + "/cadastro/loadData", { id: usuario.id })
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

                axios.post(BASE + "/cadastro/del", { id: usuario.id })
                    .then(res => {
                        mainLayout.sToast(res.data.texto, '', 'success');
                        this.reqLista();
                    });
            }
        }
    }
});
