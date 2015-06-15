<?php
class API extends CI_Controller {

    public function getStudents() {
        $this->load->model('api_model');
        $students = $this->api_model->get_all_students();
        echo json_encode($students);
    }
    
    public function updateStudents() {
        header('Content-type: application/json');

        $data = json_decode(file_get_contents('php://input'),true);
        $this->load->model('api_model');
        $this->api_model->update_students($data);
    }

}