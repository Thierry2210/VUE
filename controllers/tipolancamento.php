<?php

class TipoLancamento extends Controller
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
        array_push($this->view->js, "views/tipolancamento/app.vue.js");
        array_push($this->view->css, "views/tipolancamento/app.vue.css");
        $this->view->render('header');
        $this->view->render('footer');
    }

    function addTipoLancamento()
    {
        $this->model->insertTipoLancamento();
    }

    function listaTipoLancamento()
    {
        $this->model->listaTipoLancamento();
    }

    function del()
    {
        $this->model->del();
    }

    function loadData()
    {
        $this->model->loadData();
    }

    function save()
    {
        $this->model->save();
    }
}
