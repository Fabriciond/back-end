<?php 
namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class User extends ResourceController
{
    protected $modelName = 'App\Models\UserModel';
    protected $format = 'json';

    public function index()
    {
        return $this->respond($this->model->findAll());
    }

    public function create()
    {
        $user = new $this->modelName;
        $user->fill($this->request->getPost());
        if ($this->model->save($user)) {
            return $this->respondCreated($user);
        }
        return $this->failValidationError($this->model->errors());
    }

    public function show($id = null)
    {
        $user = $this->model->find($id);
        if ($user) {
            return $this->respond($user);
        }
        return $this->failNotFound('No user found with id ' . $id);
    }

    public function update($id = null)
    {
        $user = $this->model->find($id);
        if ($user) {
            $user->fill($this->request->getRawInput());
            if ($this->model->save($user)) {
                return $this->respond($user);
            }
            return $this->failValidationError($this->model->errors());
        }
        return $this->failNotFound('No user found with id ' . $id);
    }

    public function delete($id = null)
    {
        $user = $this->model->find($id);
        if ($user) {
            $this->model->delete($id);
            return $this->respondDeleted($user);
        }
        return $this->failNotFound('No user found with id ' . $id);
    }
}