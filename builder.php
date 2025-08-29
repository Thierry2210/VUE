<?php

if (count($argv) > 3) {
    echo 'O script builder.php só aceita 2 parametro: nome do arquivo e o nome do title. Eles devem ser escritos com todas as palavras' .
        ' emendadas com as iniciais maiúsculas, sem acentos ou caracterers especiais. Ex: "php builder.php Login Login" ou "php builder.php ManutencaoPolos ManutençãoPolos".';
    exit;
}

if (!folder_exist('models') || !folder_exist('controllers') || !folder_exist('views')) {
    echo 'Diretórios requeridos não foram encontrados. Possivelmente o arquivo builder.php não está no diretório root da aplicação.';
    exit;
}

if (!strtolower($argv[1])) {
    echo 'Você precisa digitar o parametro nome para executar o script. (O nome deve ser escrito com todas as palavras' .
         ' emendadas com as iniciais maiúsculas, sem acentos ou caracterers especiais. Ex: "php builder.php Login" ou "php builder.php CadastroPrincipal".)';
    exit;
}

if (!ctype_upper(substr($argv[1], 0, 1))) {
    echo 'Você precisa digitar corretamente o parametro nome para executar o script. (O nome deve ser escrito com todas as palavras' .
        ' emendadas com as iniciais maiúsculas, sem acentos ou caracterers especiais. Ex: "php builder.php Login" ou "php builder.php CadastroPrincipal".)';
    exit;
}

$fileName = strtolower(tirarAcentos($argv[1]));
$name = tirarAcentos($argv[1]);
$titleName = trim(preg_replace('/(?<!\ )[A-Z]/', ' $0', $argv[2]));
$apresentacaoSistema = "Portal Unimar EAD - ";

$model = '
<?php

require_once("util/param.php");

class ' . $name . '_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function example()
    {
    }
}';
file_put_contents('models/' . $fileName . '_model.php', $model);

$controller = '
<?php

class ' . $name . ' extends Controller {

    function __construct() {
        parent::__construct();
		$this->view->js = array();
		$this->view->css = array();
    }

    function index()
    {
        $this->view->title = "'. $apresentacaoSistema . $titleName . '";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/' . $fileName . '/app.vue.js");
        array_push($this->view->css, "views/' . $fileName . '/app.vue.css");
        $this->view->render("header");
        $this->view->render("footer");
    }

    function example()
    {
        $this->model->example();
    }
}';
file_put_contents('controllers/' . $fileName . '.php', $controller);

$jsView = '
const AppTemplate = `
<div class="col-md-12 control-section card-control-section basic_card_layout">
  <div class="e-card-resize-container" style="margin-bottom: 90px">
    <div class="row">
      <div class="col-md-12 card-layout" style="padding: 0 !important;">
        <div tabindex="0" class="e-card" id="basic_card">
          <div class="e-card-content">
            
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;

Vue.component("AppVue", {
  template: AppTemplate,
  data() {
    return {}
  },
  methods: {}
});
';

if (!is_dir('views/' . $fileName)) {
    mkdir('views/' . $fileName);
}

file_put_contents('views/' . $fileName . '/app.vue.js', $jsView);
file_put_contents('views/' . $fileName . '/app.vue.css', '');

function folder_exist($folder)
{
    $path = realpath($folder);
    return ($path !== false AND is_dir($path)) ? $path : false;
}

function tirarAcentos($string){
    return preg_replace(array("/(á|à|ã|â|ä)/","/(Á|À|Ã|Â|Ä)/","/(é|è|ê|ë)/","/(É|È|Ê|Ë)/","/(í|ì|î|ï)/","/(Í|Ì|Î|Ï)/","/(ó|ò|õ|ô|ö)/","/(Ó|Ò|Õ|Ô|Ö)/","/(ú|ù|û|ü)/","/(Ú|Ù|Û|Ü)/","/(ñ)/","/(Ñ)/"),explode(" ","a A e E i I o O u U n N"),$string);
}



