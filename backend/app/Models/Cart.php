<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    protected $table = 'shopping_cart';

    protected $fillable = [
        'user_id',
        'session_id',
        'coupon_id',
    ];

    public function items()
    {
        return $this->hasMany(CartItem::class);
    }
}
