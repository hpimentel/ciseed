<?php
class Students extends CI_Controller {
    
    public function view($page = 'home') {
        if ( ! file_exists(APPPATH.'/views/students/'.$page.'.php')) {
                show_404();
        }
        $data['title'] = ucfirst($page);
        $data['scripts'] = ['students'];
        
        $this->load->view('templates/header', $data);
        $this->load->view('students/home', $data);
        $this->load->view('templates/footer', $data);
    }
}