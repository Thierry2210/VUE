<?php

session_start();

require_once("util/param.php");

class Cadastro_Model extends Model
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
        $dados = $this->getRequestData();

        $valorId = $dados['valorId'] ?? null;
        $valorNome = $dados['valorNome'] ?? '';
        $valorSenha = $dados['valorSenha'] ?? '';
        $selecionadoNivel = $dados['selecionadoNivel'] ?? null;

        $result = $this->insert(
            "fluxocaixa.usuario",
            [
                "id"    => $valorId,
                "nome"  => $valorNome,
                "senha" => hash('sha256', $valorSenha), // Aplica SHA-256 na senha,
                "nivel" => $selecionadoNivel,
            ]
        );

        if ($result) {
            $msg = array("codigo" => 1, "texto" => "Registro inserido com sucesso.");
        } else {
            $msg = array("codigo" => 0, "texto" => "Erro ao inserir");
        }

        echo json_encode($msg);
    }


    public function del()
    {
        $dados = $this->getRequestData();
        $id = (int)($dados['id'] ?? 0);

        $msg = array("codigo" => 0, "texto" => "Erro ao excluir.");

        if ($id > 0) {
            $result = $this->delete("fluxocaixa.usuario", "id='$id'");
            if ($result) {
                $msg = array("codigo" => 1, "texto" => "Registro exluído com sucesso.");
            }
        }

        echo json_encode($msg);
    }

    public function loadData()
    {
        $dados = $this->getRequestData(); // função helper que criamos
        $id = (int)($dados['id'] ?? 0);

        $result = [];

        $msg = array("codigo" => 0, "texto" => "Erro ao excluir.");

        if ($id > 0) {
            $result = $this->select(
                "SELECT * FROM fluxocaixa.usuario WHERE id=:id",
                ["id" => $id]
            );
            if ($result) {
                $msg = array("codigo" => 1, "texto" => "Registro exluído com sucesso.");
            }
        }

        echo json_encode($msg);
    }


    public function save()
    {
        $dados = $this->getRequestData();

        $valorId = $dados['valorId'] ?? null;
        $valorNome = $dados['valorNome'] ?? '';
        $valorSenha = $dados['valorSenha'] ?? '';
        $selecionadoNivel = $dados['selecionadoNivel'] ?? null;

        $msg = array("codigo" => 0, "texto" => "Erro ao atualizar.");

        if ($valorId > 0) {
            $dadosSave = array(
                "nome" => $valorNome,
                "senha" => $valorSenha,
                "nivel" => $selecionadoNivel
            );

            $result = $this->update("fluxocaixa.usuario", $dadosSave, "id='$valorId'");

            if ($result) {
                $msg = array("codigo" => 1, "texto" => "Registro atualizado com sucesso.");
            }
        }

        echo (json_encode($msg));
    }


    public function selectNivelUsuario()
    {
        $result = $this->select("
        select codigo,descricao 
        from fluxocaixa.nivelusuario 
        order by descricao");

        $result = json_encode($result);

        echo ($result);
    }
}
