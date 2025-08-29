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
                <ejs-button v-on:click.native="reqLogin" cssClass="e-outline" style="width: 100%;">Fazer login</ejs-button>
            </div>
        </div>
    </div>
</div>



`;

Vue.component('AppVue', {
    template: AppTemplate,
    // Aqui você define o "template"(HTML) que o Vue vai renderizar.
    // No seu caso, o template vem da constante AppTemplate que você criou antes.

    data: function () {
        return {
            valorId: '',     // campo ligado ao input do ID(v - model="valorId")
            valorSenha: '',  // campo ligado ao input da senha(v- model="valorSenha")
            usuario: null,   // aqui ficará armazenado o objeto retornado do backend
            isLogged: false  // flag pra saber se o usuário já está logado
        }
    },

    mounted: function () {
        // Esse método roda quando o componente é "montado" na tela.
        // Dá pra inicializar dados aqui, mas no momento não se usa nada.
    },

    methods: {
        reqLogin() {
            // Esse método é chamado quando o usuário clica no botão de login.

            axios.post(BASE + "/login/autenticar", {
                usuario: this.valorId,  // pega o valor digitado no campo de ID
                senha: this.valorSenha  // pega o valor digitado no campo de senha
            }).then(res => {
                // Se a requisição deu certo, cai aqui

                if (res.data.codigo === 1) {
                    // Se o backend retornou sucesso(codigo = 1):
                    this.usuario = res.data.usuario;  // guarda o usuário logado
                    this.isLogged = true;             // marca que o login foi feito

                    // Teste de saída no console:
                    console.log("Nome:", this.usuario.nome);
                    console.log("Nível:", this.usuario.nivel);
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
