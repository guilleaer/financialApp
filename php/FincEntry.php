<?php
class FincEntry
{
  private $id;
  private $description;
  private $amount;

  function FincEntry($id, $description, $amount) 
  {
    $this->id = $id;
    $this->description = $description;
    $this->amount = $amount;
  }

  public function toJSON() {
    $objArray = array(
      'id'        => $this->getId(),
      'description' => $this->getDescription(),
      'amount'  => $this->getAmount()
    );
    return $objArray;
  }


  function setId($id) { $this->id = $id; }
  function getId() { return $this->id; }
  function setDescription($description) { $this->description = $description; }
  function getDescription() { return $this->description; }
  function setAmount($amount) { $this->amount = $amount; }
  function getAmount() { return $this->amount; }  

}
?>