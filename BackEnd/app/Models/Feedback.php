<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $fillable = [
        'type',
        'collection_id',
        'user_id',
        'content',
        'language'
    ];
    public function collection()
    {
        return $this->belongsTo(Collection::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
