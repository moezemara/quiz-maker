<?php
namespace Src\User;

class Home {

  private $server;
  private $post;
  private $config;
  private $mustache;
  private $username;
  private $template;

  public function __construct($server, $post, $config, $mustache, $username){
    $this->server = $server;
    $this->post = $post;
    $this->config = $config;
    $this->mustache = $mustache;
    $this->username = $username;
    $this->template = file_get_contents("pages/home.hbs");
  }

  public function processRequest(){
    if (!isset($this->post['page'])){return $this->P_home();}
    switch($this->post['page']){
      case 'commands':
        $response = $this->P_commands();
        break;
      
      case 'students':
        $response = $this->P_students();
        break;
      
      case 'exams':
        $response = $this->P_exams();
        break;
      
      default:
        $response = $this->P_home();
        break;
    }
    return $response;
  }

  private function P_commands(){
    $pagecontent = file_get_contents("pages/subpages/commands.hbs");
    $commands_url = $this->config['API']."/admin/commands";
    $specializations_url = $this->config['API']."/admin/specializations/";
    $pagecontent = $this->mustache->render($pagecontent, array('commands_url' => $commands_url, 'specializations_url' => $specializations_url));
    return $this->mustache->render($this->template, array('username' => $this->username, 'pagename' => 'Commands page', 'pagecontent' => $pagecontent));
  }

  private function P_students(){
    $pagecontent = file_get_contents("pages/subpages/students.hbs");
    $students_url = $this->config['API']."/admin/students/";
    $pagecontent = $this->mustache->render($pagecontent, array('students_url' => $students_url));
    return $this->mustache->render($this->template, array('username' => $this->username, 'pagename' => 'Students page', 'pagecontent' => $pagecontent));
  }

  private function P_exams(){
    $pagecontent = file_get_contents("pages/subpages/exams.hbs");
    $exams_url = $this->config['API']."/admin/exams/";
    $pagecontent = $this->mustache->render($pagecontent, array('exams_url' => $exams_url));
    return $this->mustache->render($this->template, array('username' => $this->username, 'pagename' => 'Exams page', 'pagecontent' => $pagecontent));
  }
  
  private function P_home(){
    return $this->mustache->render($this->template, array('username' => $this->username, 'pagename' => 'Welcome', 'pagecontent' => "Welcome to admin panel"));
  }
}
