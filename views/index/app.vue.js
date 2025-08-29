const AppTemplate = `
<div class="col-md-12 control-section card-control-section basic_card_layout">
  <div class="e-card-resize-container" style="margin-bottom: 90px">
    <div class="row">
      <div class="col-md-12 card-layout" style="padding: 0 !important;">
        <div tabindex="0" class="e-card" id="basic_card">
          <div class="e-card-content">
            <ejs-grid 
              ref='grid' 
              :dataSource='itens' 
              height='600px' 
              :toolbarClick="toolbarClick"
              :toolbar='[
              "Search",
              {
                  text: "Novo",
                  toolGrupoText: "Novo",
                  prefixIcon: "fas fa-plus",
                  id: "novo"
              },
              {
                  text: "Editar",
                  toolGrupoText: "Editar",
                  prefixIcon: "fas fa-edit",
                  id: "editar"
              },
              {
                  text: "Excluir",
                  toolGrupoText: "Excluir",
                  prefixIcon: "fas fa-trash-alt",
                  id: "excluir"
              },
              ]'>
              <e-columns>
              <e-column field='CAMPO1' headerText='Campo 1' width="20%"></e-column>
              <e-column field='CAMPO2' headerText='Campo 2' width="30%"></e-column>
              <e-column field='CAMPO3' headerText='Campo 3' width="30%"></e-column>
              <e-column field="CAMPO4" headerText="Campo 4" width="20%"></e-column> 
              </e-columns>
            </ejs-grid>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ejs-dialog 
    isModal='true'
    :header="modalHeader"
    :buttons="modalButtons"
    :open="(args) => {args.preventFocus = true;} /*tirar o foco do botão primário do modal*/"
    ref="modal" 
    v-bind:visible="false" 
    :animationSettings="{ effect: 'None' }" 
    :showCloseIcon='false' 
    :closeOnEscape="false"
    target='body'
    width='1000px'>
    <div class="row">
      <div class="col-md-6 margin-input">
        <ejs-textbox
          floatLabelType="Auto"
          cssClass='e-outline'
          placeholder='Campo 1'
          ref="campo1"
          v-model="infoManipulando.campo1">
        </ejs-textbox>
        <span class="error-input-msg"></span>
      </div>
      <div class="col-md-6 margin-input">
        <ejs-textbox
          floatLabelType="Auto"
          cssClass="e-outline"
          placeholder='Campo 2'
          ref="campo2"
          v-model="infoManipulando.campo2">
        </ejs-textbox>
        <span class="error-input-msg"></span>
      </div>
      <div class="col-md-6 margin-input">
        <ejs-textbox
          floatLabelType="Auto"
          cssClass="e-outline"
          placeholder='Campo 3'
          maxlength="50"
          ref="campo3"
          v-model="infoManipulando.campo3">
        </ejs-textbox>
        <span class="error-input-msg"></span>
      </div>
      <div class="col-md-6 margin-input">
        <ejs-textbox
          floatLabelType="Auto"
          cssClass="e-outline"
          placeholder='Campo 4'
          maxlength="50"
          ref="campo4"
          v-model="infoManipulando.campo4">
        </ejs-textbox>
        <span class="error-input-msg"></span>
      </div>
    </div>
  </ejs-dialog>
</div>
`;

Vue.component("AppVue", {
    template: AppTemplate,
    data() {
        return {
            itens: [],
            acaoAtual: null,
            infoManipulando: null,
        }
    },
    methods: {
        getItens() {
            axios.post(BASE + "/controller/getItens")
                .then(resp => {
                    if (resp.data.code == 1) {
                        //sucesso
                        this.itens = res.data.itens;
                    } else if (resp.data.code == 0) {
                        //erro tratado
                        mainLayout.sToast('Atenção!', resp.data.msg, 'warning');
                    } else {
                        //erro não tratado
                        mainLayout.sToast('Não foi possível concluir a ação.', resp.data);
                    }
                });
        },
        getItem() {
            axios.post(BASE + "/controller/getItem", dadosRequisicao)
                .then(resp => {
                    if (resp.data.code == 1) {
                        //sucesso
                        this.infoManipulando = res.data.itens;
                    } else if (resp.data.code == 0) {
                        //erro tratado
                        mainLayout.sToast('Atenção!', resp.data.msg, 'warning');
                    } else {
                        //erro não tratado
                        mainLayout.sToast('Não foi possível concluir a ação.', resp.data);
                    }
                });
        },
        toolbarClick(args) {
            this.acaoAtual = args.item.id;
            this.infoManipulando = null;

            const itemSelecionado = this.$refs.grid.getSelectedRecords();

            if (this.acaoAtual == 'novo') {
                this.modalHeader = 'Novo';
                this.modalButtons = [{ click: this.gravarModal, buttonModel: { content: 'Salvar', isPrimary: true } }, { click: this.fecharModal, buttonModel: { content: 'Fechar' } }];

                this.getItem();
                this.abrirModal();
            } else if (this.acaoAtual == 'editar') {
                if (itemSelecionado.length > 0) {
                    this.modalHeader = 'Editar';
                    this.modalButtons = [{ click: this.gravarModal, buttonModel: { content: 'Salvar', isPrimary: true } }, { click: this.fecharModal, buttonModel: { content: 'Fechar' } }];

                    this.getItem();
                    this.abrirModal();
                } else {
                    mainLayout.sToast('Por favor, selecione um registro.', '', 'warning');
                }
            } else if (this.acaoAtual == 'excluir') {
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
        abrirModal() {
            this.$refs.modal.show();
        },
        fecharModal() {
            this.$refs.modal.hide();
        },
        gravarModal() {
            this.$refs.infoGerais.gravarModal();
        },
        limparInfoManipulando() {
            this.infoManipulando = {
                CAMPO1: null,
                CAMPO2: null,
                CAMPO3: null,
                CAMPO3: null
            }
        },
    },
    mounted: function () {
        this.getDados();
    },
    watch: {},
});


