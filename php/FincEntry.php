<?php
class FincEntry
{
  private $id;
  private $description;
  private $amount;
  private $currency;
  private $date;

  function FincEntry($id, $description, $amount, $currency, $date) 
  {
    $this->id = $id;
    $this->description = $description;
    $this->amount = (float)$amount;
    $this->currency = $currency;
    $this->date = $date;
  }

  public function toJSON() {
    $objArray = array(
      'id'        => $this->getId(),
      'description' => $this->getDescription(),
      'amount'  => $this->getAmount(),
      'currency'  => $this->getCurrency(),
      'date'  => $this->getDate()
    );
    return $objArray;
  }


  function setId($id) { $this->id = $id; }
  function getId() { return $this->id; }
  function setDescription($description) { $this->description = $description; }
  function getDescription() { return $this->description; }
  function setAmount($amount) { $this->amount = $amount; }
  function getAmount() { return $this->amount; }
  function setCurrency($currency) { $this->currency = $currency; }
  function getCurrency() { return $this->currency; }
  function setDate($currency) { $this->date = $date; }
  function getDate() { return $this->date; }

}
?>