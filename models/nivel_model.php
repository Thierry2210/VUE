<?php

require_once("util/param.php");

class Nivel_model extends Model
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

    public function listaNivel()
    {
        $sql = "SELECT 
                    *
                FROM 
                    fluxocaixa.nivelusuario nu
                ORDER BY codigo";

        $result = $this->select($sql);
        $msg = [
            "codigo" => 1,
            "texto" => "Lista carregada com sucesso",
            "dados" => $result
        ];
        echo json_encode($msg);
    }

    public function insertNivelUsuario()
    {
        $dados = $this->getRequestData();

        $valorDescricao = $dados['descricao'] ?? '';

        $result = $this->insert(
            "fluxocaixa.nivelusuario",
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

    public function del()
    {
        $dados = $this->getRequestData();
        $id = (int)($dados['id'] ?? 0);

        $msg = array("codigo" => 0, "texto" => "Erro ao excluir.");

        if ($id > 0) {
            $result = $this->delete("fluxocaixa.nivelusuario", "codigo='$id'");
            if ($result) {
                $msg = array("codigo" => 1, "texto" => "Registro exluído com sucesso.");
            }
        }

        echo json_encode($msg);
    }

    public function loadData()
    {
        $dados = $this->getRequestData();
        $id = (int)($dados['id'] ?? 0);

        $result = [];

        if ($id > 0) {
            $result = $this->select(
                "SELECT 
                    nu.codigo,
                    nu.descricao
                FROM 
                    fluxocaixa.nivelusuario nu
                WHERE 
                    nu.codigo = :id",
                ["id" => $id]
            );
        }

        echo json_encode($result);
    }

    public function save()
    {
        $dados = $this->getRequestData();

        $valorCodigo = $dados['codigo'] ?? null;
        $valorDescricao = $dados['descricao'] ?? '';

        $msg = array("codigo" => 0, "texto" => "Erro ao atualizar.");

        if ($valorCodigo > 0) {
            $dadosSave = array(
                "descricao" => $valorDescricao
            );

            $result = $this->update("fluxocaixa.nivelusuario", $dadosSave, "codigo='$valorCodigo'");

            if ($result) {
                $msg = array("codigo" => 1, "texto" => "Registro atualizado com sucesso.");
            }
        }

        echo (json_encode($msg));
    }
}
