const AppTemplate = /*html*/ `

<div class="control-section" style="margin-top: 5%">
    <div class="row">
        <div class="row" style="display: flex;justify-content: center;">
        <div class="col-md-2" style="display: flex;justify-content: center;">
                <ejs-textbox cssClass="e-outline" placeholder="Id" v-model="valorId" type="text"></ejs-textbox>
            </div>
           <div class="col-md-3" style="display: flex;justify-content: center;">
                <ejs-textbox cssClass="e-outline" placeholder="Nome" v-model="valorNome" type="text"></ejs-textbox>
            </div>
            <div class="col-md-2" style="display: flex;justify-content: center;">
                <ejs-textbox cssClass="e-outline" placeholder="Senha" v-model="valorSenha" type="password"></ejs-textbox>
            </div>
            <div class="col-md-2">
                <ejs-dropdownlist
                    id="dropdownFluxo"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                    :dataSource="opcoesNivel"
                    v-model="selecionadoNivel"
                    placeholder="Selecione um nível para o usuário"
                    :fields="campos">
                </ejs-dropdownlist>
            </div>
        </div>
        <div class="row" style="margin-top: 20px; display: flex;justify-content: center;">
            <div class="col-md-4" style="display: flex;justify-content: center;  gap:20px">
                <div v-if="!btnEdit">
                    <ejs-button v-on:click.native="reqLanca" cssClass="e-outline">Cadastrar</ejs-button>
                </div>
                <div v-if="btnEdit">
                    <ejs-button v-on:click.native="reqSave" cssClass="e-outline">Salvar</ejs-button>
                    <ejs-button v-on:click.native="reqCancel" cssClass="e-outline">Cancelar</ejs-button>
                </div>
                <ejs-button v-on:click.native="reqLista" cssClass="e-outline">Chamar Infos</ejs-button>
            </div>
        </div>
        <div class="row" style="margin-top: 20px;">
            <div class="col-md-12">
                <ejs-grid 
                    ref="grid"
                    :dataSource="dataSource"
                    height="600px"
                    :allowPaging="true"
                    :allowSorting="true"
                    :toolbarClick="toolbarClick"
                    :toolbar='[
                        "Search",
                        {
                            text: "Editar",
                            toolGrupoText: "Editar",
                            prefixIcon: "fas fa-edit",
                            id: "editar"
                        },
                        {
                            text: "Excluir",
                            toolGrupoText: "Excluir",
                            prefixIcon: "fas fa-trash",
                            id: "excluir"
                        }
                    ]'
                    :pageSettings="{ pageSizes: true, pageSize: 12 }"
                    :searchSettings="{ ignoreCase: true, ignoreAccent: true }">

                    <e-columns>
                        <e-column field="id" headerText="ID"></e-column>
                        <e-column field="nome" headerText="Nome"></e-column>
                        <e-column field="senha" headerText="Senha"></e-column>
                        <e-column field="nivel" headerText="Nivel"></e-column>
                    </e-columns>
                </ejs-grid>
            </div>
        </div>
    </div>
</div>

`;

Vue.component('AppVue', {
    template: AppTemplate,
    data: function () {
        return {
            valorId: null,
            valorNome: "",
            valorSenha: "",
            dataSource: [],
            dropdown: null,
            selecionadoNivel: null,
            campos: { value: 'id', text: 'texto' },
            opcoesNivel: [],
            listaItens: [],
            btnEdit: false,
        }
    },
    mounted: function () {
        this.reqLista();
        this.selectNivelUsuario();
    },
    methods: {
        resetForm() {
            this.valorId = null;
            this.valorNome = "";
            this.valorSenha = "";
            this.selecionadoNivel = null;
        },

        payload() {
            return {
                valorId: this.valorId,
                valorNome: this.valorNome,
                valorSenha: this.valorSenha,
                selecionadoNivel: this.selecionadoNivel
            };
        },

        reqLista() {
            const data = this.payload();

            axios.post(BASE + "/cadastro/listaUsuario", data)
                .then(res => {
                    // Verificar se o código retornado é 1 (sucesso)
                    if (res.data.codigo === 1) {
                        // Atualizar a fonte de dados com os dados retornados
                        this.dataSource = res.data.dados;
                    } else {
                        // Mostrar mensagem de erro caso não retorne dados
                        mainLayout.sToast(res.data.texto || 'Erro desconhecido', '', 'error');
                    }
                })
                .catch(() => {
                    // Exibir erro de rede ou outro tipo de falha
                    mainLayout.sToast('Erro ao conectar com o servidor.', '', 'error');
                });
            this.resetForm();
        },

        reqLanca() {
            const data = this.payload();
            axios.post(BASE + "/cadastro/addUsuario", data)
                .then(res => {
                    alert(res.data.texto);
                    this.reqLista();
                    this.resetForm();
                })
                .catch(() => {
                    alert("Erro ao cadastrar.");
                });
        },

        reqCancel() {
            this.resetForm();
            this.isEditing = false;
        },

        reqSave() {
            const data = this.payload();
            axios.post(BASE + "/cadastro/save", data)
                .then(() => {
                    this.reqLista();
                    this.resetForm();
                    this.isEditing = false;
                });
        },

        selectNivelUsuario() {
            axios.post(BASE + "/cadastro/selectNivelUsuario").then(res => {
                if (res && Array.isArray(res.data)) {
                    this.opcoesNivel = res.data.map(item => ({
                        id: item.codigo,    // Usando sequencia como 'id'
                        texto: item.descricao  // Usando descricao como 'texto'
                    }));
                } else {
                    alert("Erro ao carregar as opções de lançamento.");
                }
            })
                .catch(() => {
                    alert("Erro ao conectar com o servidor.");
                })
        },

        toolbarClick(id) {
            const itemSelecionado = this.$refs.grid.getSelectedRecords();

            if (id.item.id == 'editar') {
                if (itemSelecionado.length > 0) {
                    const usuario = itemSelecionado[0]; // pega o primeiro selecionado
                    axios.post(BASE + "/cadastro/loadData", { id: usuario.id })
                        .then(res => {
                            const dados = res.data[0]; // seu loadData retorna array
                            this.valorId = dados.id;
                            this.valorNome = dados.nome;
                            this.valorSenha = dados.senha;
                            this.selecionadoNivel = dados.nivel;
                            this.btnEdit = true;
                            alert(res.data.texto, 'success');
                        })
                        .catch(() => {
                            alert("Erro ao carregar dados para edição.");
                        });
                } else {
                    alert('Por favor, selecione um registro.', '', 'warning');
                }
            } else if (id.item.id == 'excluir') {
                const itemSelecionado = this.$refs.grid.getSelectedRecords();

                if (confirm("Tem certeza que deseja excluir esse item?")) {
                    const usuario = itemSelecionado[0];
                    var params = { id: usuario.id };
                    axios.post(BASE + "/cadastro/del", params)
                        .then(res => {
                            if (res.data.codigo == 1) {
                                alert(res.data.texto, 'success');
                                this.reqLista();
                            } else {
                                alert(resp.data.texto, 'warning');
                            }
                        })
                        .catch(() => {
                            alert("Erro ao conectar com o servidor.");
                        });
                }
            }
        },
    },
    watch: {
        'valorTexto': function (args) {
            console.log(args);
        }
    }
})