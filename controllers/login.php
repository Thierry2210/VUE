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
        $this->view->title = "Login de Usuário";
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
            if (session_status() == PHP_SESSION_NONE) {
                session_start();
            }

            $_SESSION['usuario'] = $res['usuario'];
        }

        echo json_encode($res);
        exit;
    }

    public function logout()
    {
        if (session_status() == PHP_SESSION_NONE) session_start();
        session_destroy();

        echo json_encode([
            'codigo' => 1,
            'texto' => 'Logout efetuado'
        ]);

        header("Location: " . URL . "login");
        exit;
    }
}
