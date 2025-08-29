<?php

require_once("util/param.php");

class Index_model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    // Listar todos os lançamentos
    public function listaLancamento()
    {
        $sql = "SELECT * FROM fluxocaixa.lancamento ORDER BY sequencia";
        $result = $this->select($sql);
        $msg = [
            "codigo" => 1,
            "texto" => "Lista carregada com sucesso",
            "dados" => $result
        ];
        echo json_encode($msg);
    }

    // Inserir novo lançamento
    public function insertLancamento()
    {
        $x = file_get_contents('php://input');
        $x = json_decode($x);
        $valorSequencia = $x->valorSequencia ?? null;
        $valorData = $x->valorData;
        $selecionadoLancamento = $x->selecionadoLancamento;
        $valor = $x->valor;
        $selecionadoFluxo = $x->selecionadoFluxo;
        $obs = $x->obs;

        $result = $this->insert(
            "fluxocaixa.lancamento",
            [
                "sequencia" => $valorSequencia,
                "data" => $valorData,
                "tipo" => $selecionadoLancamento,
                "valor" => $valor,
                "fluxo" => $selecionadoFluxo,
                "obs" => $obs
            ]
        );

        if ($result) {
            $msg = array("codigo" => 1, "texto" => "Registro inserido com sucesso.");
        } else {
            $msg = array("codigo" => 0, "texto" => "Erro ao inserir");
        }
        echo (json_encode($msg));
    }

    // Excluir lançamento
    public function del()
    {
        $id = (int)$_GET["id"];
        $msg = ["codigo" => 0, "texto" => "Erro ao excluir."];

        if ($id > 0) {
            $result = $this->delete("fluxocaixa.lancamento", "sequencia = :id", [":id" => $id]);

            if ($result) {
                $msg = ["codigo" => 1, "texto" => "Registro excluído com sucesso."];
            }
        }

        echo json_encode($msg);
    }

    // Carregar um lançamento por ID
    public function loadData($id)
    {
        $sequencia = (int)$id;

        $result = $this->select("SELECT * FROM fluxocaixa.lancamento WHERE sequencia = :sequencia", [
            ":sequencia" => $sequencia
        ]);

        echo json_encode($result);
    }

    // Atualizar lançamento
    public function save()
    {
        $input = file_get_contents("php://input");
        $data = json_decode($input);

        $sequencia = (int)$data->sequencia;

        $dadosUpdate = [
            "data" => $data->valorData,
            "valor" => $data->valor,
            "obs" => $data->obs ?? null,
            "fluxo" => $data->selecionadoFluxo,
            "tipo" => $data->selecionadoLancamento
        ];

        $msg = ["codigo" => 0, "texto" => "Erro ao atualizar."];

        if ($sequencia > 0) {
            $result = $this->update("fluxocaixa.lancamento", $dadosUpdate, "sequencia = :seq", [":seq" => $sequencia]);

            if ($result) {
                $msg = ["codigo" => 1, "texto" => "Registro atualizado com sucesso."];
            }
        }

        echo json_encode($msg);
    }

    public function selectlancamento()
    {
        $result = $this->select("select sequencia,descricao from fluxocaixa.tipolancamento order by descricao");
        $result = json_encode($result);
        echo ($result);
    }

    public function selectFluxo()
    {
        $result = $this->select("select codigo,descricao from fluxocaixa.tipofluxo order by descricao");
        $result = json_encode($result);
        echo ($result);
    }
}
