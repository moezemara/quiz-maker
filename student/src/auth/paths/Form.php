<?php

namespace Src\Auth\Paths;

class Form {
  public function pagecontent(){
    return file_get_contents("pages/form.hbs");
  }
}
