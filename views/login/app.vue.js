const AppTemplate = /*html*/`

<div class="control-section" style="height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px;">
    <div style="min-width: 300px;">
        <div class="row" style="display: flex; justify-content: center; margin-top: 20px;">
            <div class="col-md-12">
                <ejs-textbox ref="texto" cssClass="e-outline" floatLabelType="Auto" v-model="valorId" placeholder="Escreva seu id aqui" style="width: 100%;"></ejs-textbox>
            </div>
        </div>
        <div class="row" style="display: flex; justify-content: center; margin-top: 20px;">
            <div class="col-md-12">
                <ejs-textbox ref="senha" cssClass="e-outline" floatLabelType="Auto" v-model="valorSenha" placeholder="Escreva sua senha aqui" type="password" style="width: 100%;"></ejs-textbox>
            </div>
        </div>
        <div class="row" style="margin-top: 20px; display: flex; justify-content: center;">
            <div class="col-md-6">
                <ejs-button v-on:click.native="reqLogin" style="width: 100%;" class="btn btn-primary">Fazer login</ejs-button>
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
        }
    },

    mounted: function () {

    },

    methods: {
        reqLogin() {
            // Esse método é chamado quando o usuário clica no botão de login.

            axios.post(BASE + "/login/autenticar", {
                usuario: this.valorId,
                senha: this.valorSenha
            }).then(res => {
                // Se a requisição deu certo, cai aqui

                if (res.data.codigo && res.data.codigo === 1) {
                    // salva no localStorage para o frontend (menu, etc.)
                    localStorage.setItem('usuario', JSON.stringify(res.data.usuario));

                    // redireciona para home ou onde quiser
                    window.location.href = BASE;
                    alert("Login realizado com sucesso!");
                } else {
                    // Se o backend retornou erro, mostra alerta
                    alert(res.data.texto);
                }
            })
                .catch(() => alert("Erro ao conectar."));
            // Caso a requisição dê erro(servidor fora do ar, rota errada, etc.)
        }
    },

    watch: {
        // O watch serve para "observar" mudanças em alguma propriedade
    }
})