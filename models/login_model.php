<?php

require_once("util/param.php");

class Login_model extends Model
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

    public function autenticar($usuario, $senha)
    {
        $sql = "SELECT id, nome, senha, nivel FROM fluxocaixa.usuario WHERE id = :id";
        $sth = $this->db->prepare($sql);
        $sth->execute([':id' => $usuario]);
        $dados = $sth->fetch(PDO::FETCH_ASSOC);

        if ($dados && hash('sha256', $senha) === $dados['senha']) {
            unset($dados['senha']);
            return [
                'codigo' => 1,
                'texto' => 'Login realizado com sucesso',
                'usuario' => $dados
            ];
        } else {
            return ['codigo' => 0, 'texto' => 'Usuário ou senha inválidos'];
        }
    }
}
