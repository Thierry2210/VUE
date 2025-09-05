const AppTemplate = /*html*/ `
<div class="control-section" style="margin-top: 5%">

    <ejs-toast ref="toast" :position="{ X: 'Center', Y: 'Top' }"></ejs-toast>

    <div class="row">
        <!-- Campo sequencia oculto (usado para edição) -->
        <ejs-textbox ref="sequencia" v-model="valorSequencia" type="hidden" cssClass="e-outline" floatLabelType="Auto"></ejs-textbox>

        <!-- Linha de inputs principais -->
        <div class="row" style="display: flex; justify-content: center;">
            <!-- Data -->
            <div class="col-md-2">
                <ejs-datepicker
                    cssClass="e-outline" 
                    floatLabelType="Auto"
                    ref="data"
                    v-model="valorData" 
                    placeholder="Selecione uma data *" 
                    format="yyyy-MM-dd">
                </ejs-datepicker>
            </div>

            <!-- Lançamento -->
            <div class="col-md-2">
                <ejs-dropdownlist
                    cssClass="e-outline"
                    floatLabelType="Auto"
                    :dataSource="opcoesLancamento"
                    v-model="selecionadoLancamento"
                    :fields="campos"
                    placeholder="Selecione um lançamento *
                    ">
                </ejs-dropdownlist>
            </div>

            <!-- Valor -->
            <div class="col-md-2">
                <ejs-maskedtextbox 
                    cssClass="e-outline"
                    floatLabelType="Auto"
                    v-model="valor"
                    placeholder="Digite um valor *"
                    :format="'n2'"
                    :decimals="2"
                    @keypress.native="somenteNumero">
                </ejs-maskedtextbox>
            </div>

            <!-- Fluxo -->
            <div class="col-md-2">
                <ejs-dropdownlist
                    cssClass="e-outline"
                    floatLabelType="Auto"
                    :dataSource="opcoesFluxo"
                    v-model="selecionadoFluxo"
                    :fields="campos"
                    placeholder="Selecione um fluxo *">
                </ejs-dropdownlist>
            </div>
            
            <div class="col-md-4">
                <ejs-textbox v-model="obs" placeholder="Observações" cssClass="e-outline" floatLabelType="Auto"></ejs-textbox>
            </div>
        </div>

        <!-- Botões -->
        <div class="row" style="margin-top: 20px; justify-content: center;">
            <div class="col-md-4" style="display: flex; justify-content: center; gap: 20px;">
                <div v-if="!isEditing">
                    <ejs-button cssClass="e-info" @click.native="reqLanca">Lançar</ejs-button>
                </div>
                <div v-else>
                    <ejs-button cssClass="e-success" @click.native="reqSave">Salvar</ejs-button>
                    <ejs-button cssClass="e-warning" @click.native="reqCancel">Cancelar</ejs-button>
                </div>
            </div>
        </div>

        <!-- Grid -->
        <div class="row" style="margin-top: 20px;">
            <div class="col-md-12" >
                <ejs-grid 
                    ref="grid"
                    :dataSource="dataSource"
                    height="600px"
                    :allowPaging="true"
                    :allowSorting="true"
                    :toolbar="toolbar"
                    :toolbarClick="toolbarClick"
                    :pageSettings="{ pageSizes: true, pageSize: 12 }"
                    :searchSettings="{ ignoreCase: true, ignoreAccent: true }"
                    >

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
    // Aqui você define o "template"(HTML) que o Vue vai renderizar.
    // No seu caso, o template vem da constante AppTemplate que você criou antes.

    data() {
        const usuario = JSON.parse(localStorage.getItem('usuario')) || null;

        return {
            usuario: usuario,
            valorSequencia: null,           // campo ligado ao input da sequencia(v - model="valorId")
            valorData: null,                // campo ligado ao input da data(v - model="valorId")
            selecionadoLancamento: null,    // campo ligado ao select do tipo de lancamento(v - model="valorId")
            selecionadoFluxo: null,         // campo ligado ao select do tipo de fluxo(v - model="valorId")
            valor: null,                    // campo ligado ao input do valor(v - model="valorId")
            obs: "",                        // campo ligado ao input da observação(v - model="valorId")
            dataSource: [],                 // dados do grid
            opcoesLancamento: [],           // dropdown Lançamento
            opcoesFluxo: [],                // dropdown Fluxo
            campos: { value: 'id', text: 'texto' }, // mapeamento dropdown
            isEditing: false,               // controle de edição
            toolbar: []
        };
    },
    mounted() {
        // Ao montar o componente, carregamos dados e selects
        this.reqLista();
        this.carregarDropdowns();
        this.configurarToolbar();
    },
    methods: {
        /** Exibe mensagens estilizads na tela */
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

        /** Configuração da toolbar */
        configurarToolbar() {
            let baseToolbar = [{ text: "Search", id: "search" }];

            if (this.usuario && this.usuario.nivel <= 2) {
                baseToolbar.push(
                    { text: "Editar", prefixIcon: "fas fa-edit", id: "editar" },
                    { text: "Excluir", prefixIcon: "fas fa-trash", id: "excluir" }
                )
            }

            this.toolbar = baseToolbar;
        },

        /** Permite apenas números no input */
        somenteNumero(num) {
            const tecla = num.key;
            if (!/[0-9.,]/.test(tecla)) {
                num.preventDefault();
            }
        },

        /** Reset de formulário */
        resetForm() {
            this.valorSequencia = null;
            this.valorData = null;
            this.selecionadoLancamento = null;
            this.selecionadoFluxo = null;
            this.valor = null;
            this.obs = "";
            this.isEditing = false;
        },

        /** Monta payload para enviar ao backend */
        payload() {
            return {
                sequencia: this.valorSequencia,
                data: this.valorData,
                lancamento: this.selecionadoLancamento,
                valor: this.valor,
                fluxo: this.selecionadoFluxo,
                obs: this.obs
            };
        },

        /** Função genérica para enviar dados ao backend e tratar resposta */
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

        /** Carrega dados do grid */
        reqLista() {
            this.sendData('/lancamento/listaLancamento', {}, res => {
                this.dataSource = res.dados; // popula grid
                this.resetForm();
            });
        },

        /** Cadastra novo lançamento */
        reqLanca() {
            if (!this.valorData || !this.selecionadoLancamento || !this.valor || !this.selecionadoFluxo) {
                this.showToast('Preencha todos os campos obrigatórios', 'warning');
                return;
            }

            this.sendData('/lancamento/addLancamento', this.payload(), res => {
                this.showToast(res.texto, 'success');
                this.reqLista();
            });
        },

        /** Salva edição de lançamento */
        reqSave() {
            this.sendData('/lancamento/save', this.payload(), res => {
                this.showToast(res.texto, 'success');
                this.reqLista();
            });
        },

        /** Cancela edição */
        reqCancel() {
            this.resetForm();
        },

        /** Carrega opções de dropdowns */
        carregarDropdowns() {
            // Lançamentos
            axios.post(BASE + '/lancamento/selectLancamento')
                .then(res => this.opcoesLancamento = res.data.map(i => ({ id: i.sequencia, texto: i.descricao })))
                .catch(() => this.showToast('Erro ao carregar lançamentos', 'error'));

            // Fluxos
            axios.post(BASE + '/lancamento/selectFluxo')
                .then(res => this.opcoesFluxo = res.data.map(i => ({ id: i.codigo, texto: i.descricao })))
                .catch(() => this.showToast('Erro ao carregar fluxos', 'error'));
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

        /** Handler do toolbar (editar / excluir) */
        toolbarClick(args) {
            if (args.item.id === 'search') {
                return;
            }

            const itemSelecionado = this.getSelectedItem();
            if (!itemSelecionado) return;

            if (args.item.id === 'editar') {
                // Carrega dados para edição
                axios.post(BASE + '/lancamento/loadData', { id: itemSelecionado.sequencia })
                    .then(res => {
                        const d = res.data[0];
                        this.valorSequencia = d.sequencia;
                        this.valorData = d.data;
                        this.selecionadoLancamento = d.lancamento;
                        this.selecionadoFluxo = d.fluxo;
                        this.valor = d.valor;
                        this.obs = d.obs;
                        this.isEditing = true; // ativa edição
                    });
            } else if (args.item.id === 'excluir') {
                if (!confirm('Tem certeza que deseja excluir esse item?')) return;

                axios.post(BASE + '/lancamento/del', { id: itemSelecionado.sequencia })
                    .then(res => {
                        this.showToast(res.data.texto, 'success');
                        this.reqLista();
                    });
            }
        }

    }
});
