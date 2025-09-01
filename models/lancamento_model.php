<?php

require_once("util/param.php");

class Lancamento_model extends Model
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
    public function listaLancamento()
    {
        $sql = "SELECT 
                    l.sequencia,
                    DATE_FORMAT(l.data, '%d/%m/%Y') AS data,
                    l.valor,
                    l.obs,
                    T.descricao as fluxo,
                    T2.descricao as tipo
                FROM 
                    fluxocaixa.lancamento l,
                    fluxocaixa.tipofluxo t,
                    fluxocaixa.tipolancamento t2
                where
                    L.fluxo = T.codigo
                    and L.tipo = T2.sequencia 
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
    public function insertLancamento()
    {
        $dados = $this->getRequestData();

        $valorData = $dados['valorData'] ?? null;
        $selecionadoLancamento = $dados['selecionadoLancamento'] ?? null;
        $valor = $dados['valor'] ?? 0;
        $selecionadoFluxo = $dados['selecionadoFluxo'] ?? null;
        $obs = $dados['obs'] ?? "";

        $result = $this->insert(
            "fluxocaixa.lancamento",
            [
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
        $dados = $this->getRequestData();
        $id = (int)($dados['id'] ?? 0);

        $msg = array("codigo" => 0, "texto" => "Erro ao excluir.");

        if ($id > 0) {
            $result = $this->delete("fluxocaixa.lancamento", "sequencia='$id'");
            if ($result) {
                $msg = array("codigo" => 1, "texto" => "Registro exluído com sucesso.");
            }
        }

        echo json_encode($msg);
    }

    // Carregar um lançamento por ID
    public function loadData()
    {
        $dados = $this->getRequestData();
        $id = (int)($dados['id'] ?? 0);

        $result = [];

        if ($id > 0) {
            $result = $this->select(
                "SELECT 
                    l.sequencia,
                    l.data,
                    l.valor,
                    l.obs,
                    l.fluxo,
                    l.tipo AS lancamento
                FROM fluxocaixa.lancamento l
                WHERE l.sequencia = :id",
                ["id" => $id]
            );
        }

        echo json_encode($result);
    }

    // Atualizar lançamento
    public function save()
    {
        $dados = $this->getRequestData();

        $valorSequencia = $dados['valorSequencia'] ?? null;
        $valorData = $dados['valorData'] ?? null;
        $selecionadoLancamento = $dados['selecionadoLancamento'] ?? null;
        $valor = $dados['valor'] ?? 0;
        $selecionadoFluxo = $dados['selecionadoFluxo'] ?? null;
        $obs = $dados['obs'] ?? "";

        $msg = array("codigo" => 0, "texto" => "Erro ao atualizar.");

        if ($valorSequencia > 0) {
            $dadosSave = array(
                "data" => $valorData,
                "valor" => $valor,
                "obs" => $obs,
                "fluxo" => $selecionadoFluxo,
                "tipo" => $selecionadoLancamento
            );

            $result = $this->update("fluxocaixa.lancamento", $dadosSave, "sequencia='$valorSequencia'");

            if ($result) {
                $msg = array("codigo" => 1, "texto" => "Registro atualizado com sucesso.");
            }
        }

        echo (json_encode($msg));
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
