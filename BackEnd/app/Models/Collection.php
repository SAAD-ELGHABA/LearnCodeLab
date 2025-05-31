<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Collection extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'question',
        'description',
        'code',
        'language',
        'user_id',
        'slug',
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function feedback()
    {
        return $this->hasMany(Feedback::class);
    }
    public function Rates()
    {
        return $this->hasMany(Rate::class);
    }
}
