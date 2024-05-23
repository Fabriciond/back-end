<?php
namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table = 'users';
    protected $primaryKey = 'id';
    protected $allowedFields = ['name', 'last_name', 'email'];

    protected $validationRules = [
        'name' => 'required',
        'last_name' => 'required',
        'email' => 'required|valid_email|is_unique[users.email]',
    ];
    protected $validationMessages = [
        'name' => [
            'required' => 'El campo nombre es obligatorio',
        ],
        'last_name' => [
            'required' => 'El campo apellido es obligatorio',
        ],
        'email' => [
            'required' => 'El campo email es obligatorio',
            'valid_email' => 'El campo email debe ser un email válido',
            'is_unique' => 'El campo email debe ser único',
        ],
    ];
}