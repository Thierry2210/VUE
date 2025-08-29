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
            <div class="col-md-3">
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
                <ejs-button v-on:click.native="reqLanca" cssClass="e-outline">Lançar</ejs-button>
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
        }
    },
    mounted: function () {
        this.reqLista();
        this.reqLanca();
        this.selectLancamento();
        this.selectFluxo();
    },
    methods: {
        toBRDate(isoDateTime) {
            if (!isoDateTime) return '';
            // evita problemas de timezone e do new Date em navegadores
            const [date] = String(isoDateTime).split(' ');
            const [yyyy, mm, dd] = date.split('-');
            return `${dd}/${mm}/${yyyy}`;
        },

        // Formata número para BRL
        toMoney(v) {
            const n = Number(v);
            if (Number.isNaN(n)) return '';
            return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        },

        // Busca o texto pelo id (tipo/fluxo)
        lookupText(list, id) {
            const num = Number(id);
            const found = list.find(x => x.id === num);
            return found ? found.texto : String(id);
        },

        // Converte e cria campos prontos para o Grid
        normalizeRows(rows) {
            return rows.map(r => {
                const tipo = Number(r.tipo);
                const fluxo = Number(r.fluxo);
                const valor = Number(r.valor);
                return {
                    ...r,
                    tipo, fluxo, valor,
                    data: this.toBRDate(r.data),
                    valor: this.toMoney(valor),
                    tipo: this.lookupText(this.opcoesLancamento, tipo),
                    fluxo: this.lookupText(this.opcoesFluxo, fluxo),
                };
            });
        },

        payload() {
            return {
                valorData: this.valorData,
                selecionadoLancamento: this.selecionadoLancamento,
                valor: this.$refs.valor?.value || 0,
                selecionadoFluxo: this.selecionadoFluxo,
                obs: this.obs,

            };
        },
        // Chama o backend e preenche o Grid
        reqLista() {
            const data = this.payload();
            axios.post(BASE + "/index/listaLancamento", data)
                .then(res => {
                    if (res.data && res.data.codigo === 1 && Array.isArray(res.data.dados)) {
                        this.dataSource = this.normalizeRows(res.data.dados);
                    } else {
                        alert(res.data?.texto || "Erro ao carregar dados.");
                    }
                })
                .catch(() => {
                    alert("Erro ao conectar com o servidor.");
                });
        },

        reqLanca() {
            console.log(this.payload());
            const data = this.payload();
            axios.post(BASE + "/index/addLancamento", data).then(res => {
                if (res.data.codigo === 1) {
                    alert(res.data.texto);
                } else {
                    alert(res.data?.texto || "Erro ao carregar dados.");
                }
            }).catch(() => {
                alert("Erro ao conectar com o servidor.");
            })
        },

        selectLancamento() {
            axios.post(BASE + "/index/selectLancamento").then(res => {
                if (res && Array.isArray(res.data)) {
                    this.opcoesLancamento = res.data.map(item => ({
                        id: item.sequencia,    // Usando sequencia como 'id'
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

        selectFluxo() {
            axios.post(BASE + "/index/selectFluxo").then(res => {
                if (res && Array.isArray(res.data)) {
                    this.opcoesFluxo = res.data.map(item => ({
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

        toolbarClick(args) {
            const itemSelecionado = this.$refs.grid.getSelectedRecords();

            if (args.item.id == 'editar') {
                if (itemSelecionado.length > 0) {

                } else {
                    mainLayout.sToast('Por favor, selecione um registro.', '', 'warning');
                }
            } else if (args.item.id == 'excluir') {
                if (itemSelecionado.length > 0) {
                    dialogConfirm({
                        msg: 'Tem certeza que deseja excluir esse item?',
                        btnOkText: "Sim",
                        btnCancelText: "Não",
                        okAction: () => {
                            axios.post(BASE + "/controller/delItem", dadosRequisicao)
                                .then(resp => {
                                    if (resp.data.code == 1) {
                                        //sucesso
                                        mainLayout.sToast('Operação concluída com sucesso!', '', 'success');
                                    } else if (resp.data.code == 0) {
                                        //erro tratado
                                        mainLayout.sToast('Atenção!', resp.data.msg, 'warning');
                                    } else {
                                        //erro não tratado
                                        mainLayout.sToast('Não foi possível concluir a ação.', resp.data);
                                    }
                                });
                        },
                        cancelAction: () => { }
                    });
                } else {
                    mainLayout.sToast('Por favor, selecione um registro.', '', 'warning');
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
