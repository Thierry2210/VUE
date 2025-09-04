const AppTemplate = /*html*/`

<div class="control-section h- d-flex align-items-center justify-content-center p-4" style="height: 100vh;">

    <ejs-toast ref="toast" :position="{ X: 'Center', Y: 'Top' }"></ejs-toast>
        <div style="width: 300px;">
            <div class="row d-flex justify-content-center mt-4">
                <div class="col-md-12">
                    <ejs-textbox ref="texto" cssClass="e-outline" floatLabelType="Auto" v-model="valorId" placeholder="Escreva seu id aqui" style="width: 100%;"></ejs-textbox>
                </div>
            </div>

            <div class="row d-flex justify-content-center mt-4">
                <div class="col-md-12">
                    <div class="position-relative">
                        <ejs-textbox
                            ref="senha"
                            cssClass="e-outline"
                            floatLabelType="Auto"
                            v-model="valorSenha"
                            placeholder="Escreva sua senha aqui"
                            :type="mostrarSenha ? 'text' : 'password'"
                            style="width: 100%;"
                        ></ejs-textbox>

                        <!-- Ícone manual -->
                        <i :class="mostrarSenha ? 'bx bx-show' : 'bx bx-hide'" @click="alternarSenha"
                            style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer; color: #666;">
                        </i>
                    </div>
                </div>
            </div>
        
            <div class="row d-flex justify-content-center mt-4">
                <div class="col-md-6">
                    <ejs-button cssClass="e-primary" @click.native="reqLogin">Fazer login</ejs-button>
                </div>
            </div>
    </div>
</div>
`;

Vue.component('AppVue', {
    template: AppTemplate,

    data: function () {
        return {
            valorId: '',
            valorSenha: '',
            mostrarSenha: false,
        }
    },

    mounted: function () {

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

        reqLogin() {
            // 🛡️ 1. Validação Frontend (opcional mas recomendada)
            if (!this.valorId.trim() || !this.valorSenha.trim()) {
                this.showToast('Por favor, preencha todos os campos', 'warning');
                return;
            }

            // 📤 2. Preparar dados para envio
            const credenciais = {
                usuario: this.valorId,
                senha: this.valorSenha
            };

            // 📡 3. Requisição HTTP para backend
            axios.post(BASE + "/login/autenticar", credenciais)
                .then(res => {
                    // 📥 4. Processar resposta do backend
                    if (res.data.codigo === 1) {
                        // ✅ Login bem-sucedido

                        // 💾 5. Salvar dados do usuário no navegador
                        localStorage.setItem('usuario', JSON.stringify(res.data.usuario));

                        // 🎉 6. Feedback para usuário
                        this.showToast("Login realizado com sucesso!", 'success');

                        // 🔄 7. Redirecionar para aplicação
                        setTimeout(() => {
                            window.location.href = BASE;
                        }, 1000);

                    } else {
                        // ❌ Credenciais inválidas
                        this.showToast(res.data.texto, 'error');
                    }
                })
                .catch(error => {
                    // 🚨 8. Tratar erros de conexão
                    console.error('Erro de conexão:', error);
                    this.showToast("Erro ao conectar com o servidor. Tente novamente.", 'warning');
                });
        }
    },

    watch: {
        // O watch serve para "observar" mudanças em alguma propriedade
    }
})