<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $fillable = [
        'groupName',
        'selectedGroups',
        'forAllGroups',
        'formateurId',
        'Members',
        'access_key'
    ];
    protected $casts = [
        'selectedGroups' => 'array', // Automatically cast the JSON to an array
    ];
    public function Formateur()
    {
        return $this->belongsTo(User::class);
    }
    public function users()
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }
}
