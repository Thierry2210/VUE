const AppTemplate = /*html*/ `

<div class="control-section" style="margin-top: 5%">
    <div class="row">
        <div class="col-md-1">
            <ejs-textbox ref="sequencia" cssClass="e-outline" floatLabelType="Auto" v-model="valorSequencia" type="hidden"></ejs-textbox>
        </div>
        <div class="row" style="display: flex;justify-content: center;">
           <div class="col-md-2">
                <ejs-datepicker ref="data" cssClass="e-outline" floatLabelType="Auto" v-model="valorData" placeholder="Selecione uma data" format="yyyy-MM-dd"></ejs-datepicker>
            </div>
            <div class="col-md-2">
                <ejs-dropdownlist
                    id="dropdownLancamento"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                    :dataSource="opcoesLancamento"
                    v-model="selecionadoLancamento"
                    placeholder="Selecione um lançamento"
                    :fields="campos">
                </ejs-dropdownlist>
            </div>
            <div class="col-md-2">
                <ejs-maskedtextbox ref="valor" cssClass="e-outline" floatLabelType="Auto" placeholder="Digite um valor" :format="'n2'":decimals="2" v-model="valor"></ejs-maskedtextbox>
            </div>
            <div class="col-md-2">
                <ejs-dropdownlist
                    id="dropdownFluxo"
                    cssClass="e-outline"
                    floatLabelType="Auto"
                    :dataSource="opcoesFluxo"
                    v-model="selecionadoFluxo"
                    placeholder="Selecione um fluxo"
                    :fields="campos">
                </ejs-dropdownlist>
            </div>
        </div>
        <div class="row" style="margin-top: 20px; display: flex;justify-content: center;">
            <div class="col-md-4" style="display: flex;justify-content: center;">
                <ejs-textbox cssClass="e-outline" placeholder="Observações" v-model="obs"></ejs-textbox>
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
                <div v-if="!btnEdit">
                    <ejs-button v-on:click.native="reqLista" cssClass="e-outline">Chamar Infos</ejs-button>
                </div>
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
                        <e-column field="sequencia" headerText="Sequência"></e-column>
                        <e-column field="data" headerText="Data"></e-column>
                        <e-column field="tipo" headerText="Tipo"></e-column>
                        <e-column field="valor" headerText="Valor"></e-column>
                        <e-column field="fluxo" headerText="Fluxo"></e-column>
                        <e-column field="obs" headerText="Observação"></e-column>
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
            valorSequencia: null,
            valorTexto: "",
            dataSource: [],
            dropdown: null,
            valorData: null,
            selecionadoLancamento: null,
            opcoesLancamento: [],
            campos: { value: 'id', text: 'texto' },
            valor: 0,
            selecionadoFluxo: null,
            opcoesFluxo: [],
            obs: "",
            listaItens: [],
            btnEdit: false,
        }
    },
    mounted: function () {
        this.reqLista();
        this.selectLancamento();
        this.selectFluxo();
    },
    methods: {

        resetForm() {
            // Reseta os campos do formulário para os valores iniciais
            this.valorSequencia = null;
            this.valorData = null;
            this.selecionadoLancamento = null;
            this.valor = null;
            this.selecionadoFluxo = null;
            this.obs = "";
        },

        payload() {
            // Monta o objeto com os dados do formulário para enviar ao backend
            return {
                valorSequencia: this.valorSequencia,
                valorData: this.valorData,
                selecionadoLancamento: this.selecionadoLancamento,
                valor: this.valor, // Pega valor via ref (se não existir, usa 0)
                selecionadoFluxo: this.selecionadoFluxo,
                obs: this.obs
            };
        },

        // Chama o backend e preenche o Grid
        reqLista() {
            const data = this.payload();

            axios.post(BASE + "/lancamento/listaLancamento", data)
                .then(res => {
                    if (res.data.codigo === 1) {
                        this.dataSource = res.data.dados;
                    } else {
                        mainLayout.sToast(res.data.texto || 'Erro desconhecido', '', 'error');
                    }
                })
                .catch(() => {
                    mainLayout.sToast('Erro ao conectar com o servidor.', '', 'error');
                });
            this.resetForm();
        },

        // Manda para o back as informações preenchidas nos inputs
        reqLanca() {
            const data = this.payload();
            axios.post(BASE + "/lancamento/addLancamento", data)
                .then(res => {
                    if (res.data.codigo === 1) {
                        alert(res.data.texto);
                        this.reqLista();
                        this.resetForm();
                    } else {
                        mainLayout.sToast(res.data.texto || 'Erro desconhecido', '', 'error');
                    }
                })
                .catch(() => {
                    alert("Erro ao cadastrar.");
                });
        },

        // Função que busca os tipos de lançamento do backend e preenche o select correspondente
        selectLancamento() {
            axios.post(BASE + "/lancamento/selectLancamento").then(res => {
                // Verifica se a resposta existe e é um array
                if (res && Array.isArray(res.data)) {
                    // Mapeia os dados recebidos para o formato esperado pelo select
                    this.opcoesLancamento = res.data.map(item => ({
                        id: item.sequencia,    // Usa 'sequencia' como identificador único
                        texto: item.descricao  // Usa 'descricao' como texto exibido
                    }));
                } else {
                    alert("Erro ao carregar as opções de lançamento.");
                }
            })
                .catch(() => {
                    alert("Erro ao conectar com o servidor.");
                })
        },

        // Função que busca os tipos de fluxo do backend e preenche o select correspondente
        selectFluxo() {
            axios.post(BASE + "/lancamento/selectFluxo").then(res => {
                if (res && Array.isArray(res.data)) {
                    this.opcoesFluxo = res.data.map(item => ({
                        id: item.codigo,
                        texto: item.descricao
                    }));
                } else {
                    alert("Erro ao carregar as opções de fluxo.");
                }
            })
                .catch(() => {
                    alert("Erro ao conectar com o servidor.");
                })
        },

        // Função que cancela a edição e reseta o formulário
        reqCancel() {
            this.resetForm();       // Limpa os campos do formulário
            this.isEditing = false; // Define que não está mais em modo de edição
        },

        // Função que salva os dados do formulário
        reqSave() {
            const data = this.payload(); // Obtém os dados do formulário
            axios.post(BASE + "/lancamento/save", data)
                .then(() => {
                    this.reqLista();      // Atualiza a lista de lançamentos
                    this.resetForm();     // Limpa o formulário
                    this.isEditing = false; // Sai do modo de edição
                });
        },

        // Função que trata os cliques na toolbar (editar ou excluir)
        toolbarClick(id) {
            const itemSelecionado = this.$refs.grid.getSelectedRecords(); // Obtém os registros selecionados na grid

            // Se o botão clicado for 'editar'
            if (id.item.id == 'editar') {
                if (itemSelecionado.length > 0) {
                    const lancamento = itemSelecionado[0]; // Pega o primeiro item selecionado
                    axios.post(BASE + "/lancamento/loadData", { id: lancamento.sequencia })
                        .then(res => {
                            const dados = res.data[0]; // Assume que a resposta é um array e pega o primeiro item
                            // Preenche os campos do formulário com os dados recebidos
                            this.valorSequencia = dados.sequencia;
                            this.valorData = dados.data;
                            this.selecionadoLancamento = dados.lancamento;
                            this.valor = dados.valor;
                            this.selecionadoFluxo = dados.fluxo;
                            this.obs = dados.obs;
                            this.btnEdit = true; // Ativa o botão de edição
                        })
                        .catch(() => {
                            alert("Erro ao carregar dados para edição.");
                        });
                } else {
                    mainLayout.sToast('Por favor, selecione um registro.', '', 'warning');
                }
            }
            // Se o botão clicado for 'excluir'
            else if (id.item.id == 'excluir') {
                const itemSelecionado = this.$refs.grid.getSelectedRecords(); // Obtém os registros selecionados

                if (confirm("Tem certeza que deseja excluir esse item?")) { // Confirmação do usuário
                    const lancamento = itemSelecionado[0]; // Pega o primeiro item selecionado
                    var params = { id: lancamento.sequencia }; // Prepara os parâmetros para exclusão
                    axios.post(BASE + "/lancamento/del", params)
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

