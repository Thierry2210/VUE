<?php

class Model
{

    public $db;

    public function __construct()
    {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8";
        try {
            $this->db = new PDO($dsn, DB_USER, DB_PASS); // Altere para $this->db
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Erro de conexão: " . $e->getMessage());
        }
    }

    // SELECT
    public function select($sql, $params = [])
    {
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // INSERT
    public function insert($table, $data)
    {
        $fields = implode(",", array_keys($data));
        $placeholders = ":" . implode(",:", array_keys($data));
        $sql = "INSERT INTO $table ($fields) VALUES ($placeholders)";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute($data);
    }

    // UPDATE
    public function update($table, $data, $where)
    {
        $fields = "";
        foreach ($data as $key => $value) {
            $fields .= "$key=:$key,";
        }
        $fields = rtrim($fields, ",");
        $sql = "UPDATE $table SET $fields WHERE $where";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute($data);
    }

    // DELETE
    public function delete($table, $where)
    {
        $sql = "DELETE FROM $table WHERE $where";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute();
    }
}
