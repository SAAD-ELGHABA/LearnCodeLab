<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{
    protected $fillable = [
        'collection_id',
        'user_id',
        'type'
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
