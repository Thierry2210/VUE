<?php

require_once("util/param.php");

class Cadastro_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function listaUsuario()
    {
        $sql = "SELECT * FROM fluxocaixa.usuario ORDER BY id";
        $result = $this->select($sql);
        $msg = [
            "codigo" => 1,
            "texto" => "Lista carregada com sucesso",
            "dados" => $result
        ];
        echo json_encode($msg);
    }

    public function insertUsuario()
    {
        $x = file_get_contents('php://input');
        $x = json_decode($x);
        $valorId = $x->valorId;
        $valorNome = $x->valorNome;
        $valorSenha = $x->valorSenha;
        $selecionadoNivel = $x->selecionadoNivel;

        $result = $this->insert(
            "fluxocaixa.usuario",
            [
                "id" => $valorId,
                "nome" => $valorNome,
                "senha" => $valorSenha,
                "nivel" => $selecionadoNivel,
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
        $x = file_get_contents('php://input');
        $x = json_decode($x);
        $valorID = (int)($x->id ?? 0);
        $msg = array("codigo" => 0, "texto" => "Erro ao excluir.");
        if ($valorID > 0) {
            $result = $this->delete("fluxocaixa.usuario", "id='$valorID'");
            if ($result) {
                $msg = array("codigo" => 1, "texto" => "Registro exluído com sucesso.");
            }
        }
        echo json_encode($msg);
    }

    public function loadData($id)
    {
        $id = (int)$id;
        $result = $this->select("select * from fluxocaixo.usuario where id=:id", ["id" => $id]);
        $result = json_encode($result);
        echo ($result);
    }

    public function save()
    {
        $x = file_get_contents('php://input');
        $x = json_decode($x);
        $valorId = $x->valorId ?? null;
        $valorNome = $x->valorNome;
        $valorSenha = $x->valorSenha;
        $selecionadoNivel = $x->selecionadoNivel;
        $msg = array("codigo" => 0, "texto" => "Erro ao atualizar.");
        if ($valorId > 0) {
            $dadosSave = array("id" => $valorId, "nome" => $valorNome, "senha" => $valorSenha, "nivel" => $selecionadoNivel);
            $result = $this->update("fluxocaixo.usuario", $dadosSave, "id='$valorId'");
            if ($result) {
                $msg = array("codigo" => 1, "texto" => "Registro atualizado com sucesso.");
            }
        }
        echo (json_encode($msg));
    }


    public function selectNivelUsuario()
    {
        $result = $this->select("select codigo,descricao from fluxocaixa.nivelusuario order by descricao");
        $result = json_encode($result);
        echo ($result);
    }
}
