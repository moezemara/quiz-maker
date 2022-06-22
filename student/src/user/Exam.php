<?php
namespace Src\User;

class Exam {

  private $server;
  private $post;
  private $config;
  private $mustache;

  public function __construct($server, $post, $config, $mustache){
    $this->server = $server;
    $this->post = $post;
    $this->config = $config;
    $this->mustache = $mustache;
  }

  public function processRequest(){

    if($this->server['REQUEST_METHOD'] === 'GET'){
      return $this->P_form();
    }

    if (!isset($this->post['student_uuid']) || !isset($this->post['type'])){
      return $this->P_form();
    }

    if($this->post['type'] != 'mcq' && $this->post['type'] != 'written'){
      return $this->P_form();
    }

    $response = $this->P_exam();
    
    if(!$response){
      return $this->P_form();
    }

    return $response;
  }

  private function P_exam(){
    
    $fetcheddata = $this->fetchexamcontent();
    
    if(!$fetcheddata){
      return false;
    }
    
    $questions_innerhtml = $this->questionsinnerhtml(json_decode($fetcheddata));
    $tablecontent = file_get_contents("pages/exam.hbs");
    $tablecontent = $this->mustache->render($tablecontent, array('pagetitle' => $this->post['type'].' exam', 'api_url' => $this->config['API'], 'fetcheddata' => $fetcheddata, 'questions_innerhtml' => $questions_innerhtml, 'uuid' => "'".$this->post['student_uuid']."'", 'type' => "'".$this->post['type']."'"));
    
    return $tablecontent;
  }

  private function questionsinnerhtml($fetcheddata){
    $questions = $fetcheddata->questions;
    
    $questions_innerhtml = '';
    
    foreach ($questions as $question) {
      $questions_innerhtml .= $this->questionfield($question);
    }


    $questions_innerhtml .= '<fieldset title="End">
    <legend>Exam ended, Please click on Finish button</legend>
</fieldset>';

    return $questions_innerhtml;
  }

  private function questionfield($question){
    $radio_innerhtml = '';

    $point_index = 1;


    if($this->post['type'] == 'mcq'){
      foreach ($question->answers as $point){
        $checked = '';
        if (isset($question->answered)){
          if ($point_index == $question->answered){
            $checked = 'checked';
          }
        }
          $radio_innerhtml .= 
          '<label class="radio icheck">
            <input type="radio" name="answer'.$question->id.'" id="optionsRadios'.$question->id.'" value="'.$point_index.'"'.$checked.'>
              '.$point.'
      </label>';
        $point_index +=1;
      }
    }else{
      $radio_innerhtml .= '
    	<div class="panel panel-magenta">
	        <div class="panel-heading">
	            <h2>Write your answer</h2>
	        </div>
	        <div class="panel-body collapse in">

	            <div class="col-12">
	                <textarea name="answer'.$question->id.'" id="answer'.$question->id.'" cols="80" rows="20" class="ckeditor"></textarea>
	            </div>

	        </div>
	    </div>
    ';
    }




    $field = '<fieldset title="Q.'.$question->id.'">
                        <legend>'.$question->question.'</legend>
                        <div class="form-group">
                            <div class="col-md-6">
                                '.$radio_innerhtml.'
                            </div>
                        </div>
          </fieldset>';
    return $field;
}


  private function fetchexamcontent(){
    $url = $this->config['API']."/api/students/exams";

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
      "accept:application/json",
      "Content-Type:application/json",
			"Access-Control-Allow-Origin:*"
    ));
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode(array(
      "student_uuid" => $this->post['student_uuid'],
      "action" => 'begin',
      "type" => $this->post['type']
    )));
    curl_setopt($curl, CURLOPT_TIMEOUT, 25);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    
    $results = curl_exec($curl);
    curl_close($curl);

    
    if (!$results){
      return false;
    }

    $response = json_decode($results);

    if ($response->success == 0){
      return false;
    }

    $message = $response->message;
    return json_encode($message);
  }
  
  private function P_form(){
    $pagecontent = file_get_contents("pages/form.hbs");
    $pagecontent = $this->mustache->render($pagecontent, array('api_url' => $this->config['API']));

    return $pagecontent;
  }
}
