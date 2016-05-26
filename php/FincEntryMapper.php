<?php
class FincEntryMapper
{
    private $dbCon;
    private $logger;

    function FincEntryMapper($container) 
    {
      $this->dbCon = $container->get('db');
      $this->logger = $container->get('logger');
    }

    public function findById($id)
    {
      try {
        $query = $this->dbCon->prepare("select * from fincentry where fincentry_id = '" . $id . "'");
        $query->execute();
        $dataFromDb = $query->fetchAll();
        
        if (count($dataFromDb)==1) {
          return $this->create($dataFromDb[0]);
        }
      } catch (PDOException $e) {
        $this->logger->addError($e->getMessage());
      }
    }

    public function removeById($id)
    {
      try {
        $objToRemove = $this->findById($id);
        $strStatement = 'DELETE FROM fincentry where fincentry_id = :id';
        $statement = $this->dbCon->prepare($strStatement);
        $statement->bindParam(':id', $objToRemove->getId(), PDO::PARAM_STR, 100);
        if ($statement->execute()) {
          return $objToRemove;
        }
      } catch (PDOException $e) {
        $this->logger->addError($e->getMessage());
      }
    }

    public function update($fincEntry)
    {
      try {
        $strStatement = 'UPDATE fincentry SET description = :desc, amount = :amt, currency = :cur, date = :dat WHERE fincentry_id = :id';
        $statement = $this->dbCon->prepare($strStatement);
        $statement->bindParam(':id', $fincEntry->getId(), PDO::PARAM_STR, 100);
        $statement->bindParam(':desc', $fincEntry->getDescription(), PDO::PARAM_STR, 100);
        $statement->bindParam(':amt', $fincEntry->getAmount(), PDO::PARAM_STR, 100);
        $statement->bindParam(':cur', $fincEntry->getCurrency(), PDO::PARAM_STR, 100);
        $statement->bindParam(':dat', $fincEntry->getDate(), PDO::PARAM_STR, 100);

        if ($statement->execute()) {
          return true;
        }
      } catch (PDOException $e) {
        $this->logger->addError($e->getMessage());
      }
    }

    public function findAll()
    {
      $counter = 0;
      try {
        $query = $this->dbCon->prepare('select * from fincentry order by date');
        $query->execute();
        $queryResults = $query->fetchAll();
      } catch (PDOException $e) {
        $this->logger->addError($e->getMessage()); 
      }
      foreach ($queryResults as &$item) {
        $result[$counter] = $this->create($item);
        $counter += 1;
      }
      return $this->createCollection($result);
    }

    public function add($fincEntry)
    {
      try {
        $strStatement = 'INSERT INTO fincentry (fincentry_id, description, amount, currency, date) VALUES (:id, :desc, :amt, :cur, :dat)';
        $statement = $this->dbCon->prepare($strStatement);
        $statement->bindParam(':id', $fincEntry->getId(), PDO::PARAM_STR, 100);
        $statement->bindParam(':desc', $fincEntry->getDescription(), PDO::PARAM_STR, 100);
        $statement->bindParam(':amt', $fincEntry->getAmount(), PDO::PARAM_STR, 100);
        $statement->bindParam(':cur', $fincEntry->getCurrency(), PDO::PARAM_STR, 100);
        $statement->bindParam(':dat', $fincEntry->getDate(), PDO::PARAM_STR, 100);
  
        if ($statement->execute()) {
          return true;
        }
      } catch (PDOException $e) {
        $this->logger->addError($e->getMessage());
      }
    }

    private function create(array $data)
    {
        $obj = new FincEntry($data['fincentry_id'], $data['description'], (float)$data['amount'], $data['currency'], $data['date']);
        return $obj;
    }

    private function createCollection(array $data)
    {
        $obj = new FincEntries($data);
        return $obj;
    }
}
?>