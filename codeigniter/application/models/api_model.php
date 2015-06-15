<?php
class API_model extends CI_Model {
    public function __construct() {
        $this->load->database(); 
    }
    
    public function get_all_students() {
        $query = $this->db->get('Student');
        return $query->result();
    }
    
    public function update_students($data) {
        foreach($data as $student) {
            $id = $student['id'];
            unset($student['id']);
            $this->db->where('id', $id);
            $this->db->update('Student', $student);
        }
    }
}

