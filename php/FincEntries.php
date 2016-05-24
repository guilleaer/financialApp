<?php
class FincEntries
{
  private $fincEntries;

  function FincEntries($arrEntries) 
  {
    $this->fincEntries = $arrEntries;
  }

  public function toJSON() {
   $json = array();
   foreach ($this->fincEntries as &$item) {
     array_push($json, $item->toJSON());
   }
   return $json;
  }
}
?>