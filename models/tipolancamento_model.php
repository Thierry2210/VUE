<?php

require_once("util/param.php");

class TipoLancamento_model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getRequestData()
    {
        $x = file_get_contents('php://input');
        $x = json_decode($x, true); // array associativo
        return $x ?? [];
    }

    // Listar todos os lançamentos
    public function listaTipoLancamento()
    {
        $sql = "SELECT 
                    *
                FROM 
                    fluxocaixa.tipolancamento tl 
                ORDER BY sequencia";

        $result = $this->select($sql);
        $msg = [
            "codigo" => 1,
            "texto" => "Lista carregada com sucesso",
            "dados" => $result
        ];
        echo json_encode($msg);
    }

    // Inserir novo lançamento
    public function insertTipoLancamento()
    {
        $dados = $this->getRequestData();

        $valorDescricao = $dados['descricao'] ?? '';

        $result = $this->insert(
            "fluxocaixa.tipolancamento",
            [
                "descricao" => $valorDescricao
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
        $dados = $this->getRequestData();
        $id = (int)($dados['id'] ?? 0);

        $msg = array("codigo" => 0, "texto" => "Erro ao excluir.");

        if ($id > 0) {
            $result = $this->delete("fluxocaixa.tipolancamento", "sequencia='$id'");
            if ($result) {
                $msg = array("codigo" => 1, "texto" => "Registro exluído com sucesso.");
            }
        }

        echo json_encode($msg);
    }

    // Carregar um lançamento por sequencia
    public function loadData()
    {
        $dados = $this->getRequestData();
        $id = (int)($dados['id'] ?? 0);

        $result = [];

        if ($id > 0) {
            $result = $this->select(
                "SELECT 
                    tl.sequencia,
                    tl.descricao
                FROM 
                    fluxocaixa.tipolancamento tl
                WHERE 
                    tl.sequencia = :id",
                ["id" => $id]
            );
        }

        echo json_encode($result);
    }

    // Atualizar lançamento
    public function save()
    {
        $dados = $this->getRequestData();

        $valorSequencia = $dados['sequencia'] ?? null;
        $valorDescricao = $dados['descricao'] ?? '';

        $msg = array("codigo" => 0, "texto" => "Erro ao atualizar.");

        if ($valorSequencia > 0) {
            $dadosSave = array(
                "descricao" => $valorDescricao
            );

            $result = $this->update("fluxocaixa.tipolancamento", $dadosSave, "sequencia='$valorSequencia'");

            if ($result) {
                $msg = array("codigo" => 1, "texto" => "Registro atualizado com sucesso.");
            }
        }

        echo (json_encode($msg));
    }
}
