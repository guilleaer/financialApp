<?php
class FincEntryMapper
{
    private $db;

    function FincEntryMapper($db) 
    {
      $this->db = $db;
    }

    public function findById($id)
    {
        $dataFromDb = $this->db[$id];
        //TODO
        //go to DB and execute query
        return $this->create($dataFromDb);
    }

    public function findAll()
    {
      $counter = 0;
      foreach ($this->db as &$item) {
        $result[$counter] = $this->create($item);
        $counter += 1;
      }
      //TODO
      //go to DB and execute query
      return $this->createCollection($result);
    }

    private function create(array $data)
    {
        $obj = new FincEntry($data['id'], $data['description'], $data['amount']);
        return $obj;
    }

    private function createCollection(array $data)
    {
        $obj = new FincEntries($data);
        return $obj;
    }
}
?>