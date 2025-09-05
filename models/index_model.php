<?php

require_once("util/param.php");

class Index_model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function movimentacoesAno()
    {
        $sql = "SELECT
                    EXTRACT(year FROM l.data) AS ano,
                    SUM(CASE WHEN l.fluxo = 1 THEN l.valor ELSE 0 END) AS entrada,
                    SUM(CASE WHEN l.fluxo = 2 THEN l.valor ELSE 0 END) AS saida,
                    SUM(CASE WHEN l.fluxo = 1 THEN l.valor ELSE 0 END) - 
                    SUM(CASE WHEN l.fluxo = 2 THEN l.valor ELSE 0 END) AS resultado
                FROM 
                    fluxocaixa.lancamento l
                WHERE 
                    l.fluxo IN (1, 2)
                GROUP BY 
                    EXTRACT(year FROM l.data)
                ORDER BY 
                    ano";

        $result = $this->select($sql);
        $msg = [
            "codigo" => 1,
            "texto" => "Lista carregada com sucesso",
            "dados" => $result
        ];
        echo json_encode($msg);
    }
}
