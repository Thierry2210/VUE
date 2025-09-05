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
        $x = json_decode($x, true);
        return $x ?? [];
    }


    public function listaUsuario()
    {
        $sql = "SELECT 
                    u.id,
                    u.nome,
                    u.senha,
                    CONCAT(CONCAT(u.nivel , ' - '), n.descricao) as nivel
                FROM 
                    fluxocaixa.usuario u,
                    fluxocaixa.nivelusuario n 
                where
                    u.nivel = n.codigo  
                ORDER BY id";

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

        if (empty($dados['id']) || empty($dados['nome']) || empty($dados['senha'])) {
            echo json_encode([
                "codigo" => 0,
                "texto" => "Dados obrigatórios não informados"
            ]);
            return;
        }

        $sql = "SELECT
                    COUNT(U.ID) AS total
                FROM
                    FLUXOCAIXA.USUARIO U
                WHERE
                    U.ID = :ID";

        $result = $this->select($sql, ["ID" => $dados["id"]]);

        $jaExiste = $result[0]['total'] ?? 0;

        if ($jaExiste > 0) {
            echo json_encode([
                "codigo" => 0,
                "texto" => "ID já cadastrado"
            ]);
            return;
        }

        $senhaHash = hash('sha256', $dados['senha']);

        $result = $this->insert("fluxocaixa.usuario", [
            "id" => $dados['id'],
            "nome" => $dados['nome'],
            "senha" => $senhaHash,
            "nivel" => $dados['nivel'] ?? 1
        ]);

        echo json_encode(
            $result ?
                ["codigo" => 1, "texto" => "Usuário cadastrado com sucesso"] :
                ["codigo" => 0, "texto" => "Erro ao cadastrar usuário"]
        );
    }


    public function del()
    {
        $id = $this->getRequestData()['id'] ?? null;

        if (empty($id)) {
            echo json_encode([
                "codigo" => 0,
                "texto" => "ID do usuário não informado"
            ]);
            return;
        }

        $existe = $this->select("SELECT id FROM fluxocaixa.usuario WHERE id = :id", ["id" => $id]);

        if (empty($existe)) {
            echo json_encode([
                "codigo" => 0,
                "texto" => "Usuário não encontrado"
            ]);
            return;
        }

        $result = $this->delete("fluxocaixa.usuario", "id = '$id'");

        echo json_encode(
            $result ?
                ["codigo" => 1, "texto" => "Usuário excluído com sucesso"] :
                ["codigo" => 0, "texto" => "Erro ao excluir usuário"]
        );
    }

    public function loadData()
    {
        $id = $this->getRequestData()['id'] ?? null;

        if (empty($id)) {
            echo json_encode([]);
            return;
        }

        $result = $this->select(
            "SELECT 
                id, nome, senha, nivel 
            FROM 
                fluxocaixa.usuario 
            WHERE 
                id = :id",
            ["id" => $id]
        );

        echo json_encode($result);
    }


    public function save()
    {
        $dados = $this->getRequestData();
        $id = $dados['id'] ?? null;

        if (empty($id)) {
            echo json_encode([
                "codigo" => 0,
                "texto" => "ID do usuário não informado"
            ]);
            return;
        }

        $dadosUpdate = [
            "nome" => $dados['nome'],
            "senha" => hash('sha256', $dados['senha']),
            "nivel" => $dados['nivel']
        ];

        $result = $this->update("fluxocaixa.usuario", $dadosUpdate, "id = '$id'");

        echo json_encode(
            $result ?
                ["codigo" => 1, "texto" => "Usuário atualizado com sucesso"] :
                ["codigo" => 0, "texto" => "Erro ao atualizar usuário"]
        );
    }


    public function selectNivelUsuario()
    {
        $sql = "SELECT 
                    codigo,descricao 
                FROM 
                    fluxocaixa.nivelusuario 
                ORDER BY descricao";

        $result =  $this->select($sql);

        echo json_encode($result);
    }
}
