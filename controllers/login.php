<?php

class Login extends Controller
{

    function __construct()
    {
        parent::__construct();
        $this->view->js = array();
        $this->view->css = array();
    }

    function index()
    {
        $this->view->title = "Cadastro de Usuário";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/login/app.vue.js");
        array_push($this->view->css, "views/login/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }

    function autenticar()
    {
        $data = $this->model->getRequestData();
        $usuario = $data['usuario'] ?? '';
        $senha = $data['senha'] ?? '';

        $res = $this->model->autenticar($usuario, $senha);

        if ($res['codigo'] === 1) {
            session_start();
            $_SESSION['usuario'] = $res['usuario'];  // guarda dados do usuário na sessão
        }

        echo json_encode($res);
    }

    public function logout()
    {
        // session_start(); // já iniciou no index.php
        session_destroy();
        echo json_encode(['codigo' => 1, 'texto' => 'Logout efetuado']);
    }
}
