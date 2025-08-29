<?php

class Cadastro extends Controller
{

    function __construct()
    {
        parent::__construct();
        $this->view->js = array();
        $this->view->css = array();
    }

    function index()
    {
        $this->view->title = "Home";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/cadastro/app.vue.js");
        array_push($this->view->css, "views/cadastro/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }

    function addUsuario()
    {
        $this->model->insertUsuario();
    }

    function listaUsuario()
    {
        $this->model->listaUsuario();
    }

    function del()
    {
        $this->model->del();
    }

    function loadData($id)
    {
        $this->model->loadData($id);
    }

    function save()
    {
        $this->model->save();
    }

    function selectNivelUsuario()
    {
        $this->model->selectNivelUsuario();
    }
}
