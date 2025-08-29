<?php

class View {
    // Titulo da View (pagina)
    public $title = "Titulo";

    function __construct()
    {
        
    }
    // renderiza a pagina com o nome da view passado no parametro
    public function render($name, $noInclude = false)
    {
        require 'views/' . $name . '.php';
    }

    public function vueRender($name)
    {
        return file_get_contents('views/' . $name . '.php');
    }
}