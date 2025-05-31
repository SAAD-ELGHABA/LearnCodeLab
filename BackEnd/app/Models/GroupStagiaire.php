<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GroupStagiaire extends Model
{
    protected $table = 'groupstagiaire';
    protected $fillable = [
        'name',
        'description',
    ];
    public function users()
    {
        return $this->hasMany(User::class, 'groupstagiaire_id');
    }
}
