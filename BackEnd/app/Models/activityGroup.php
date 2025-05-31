<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class activityGroup extends Model
{
    protected $fillable = [
        'group_id',
        'user_id',
        'title',
        'duration',
        'description',
        'data'
    ];
    public function group()
    {
        return $this->belongsTo(Group::class);
    }
    public function users()
    {
        return $this->belongsTo(User::class);
    }
}
