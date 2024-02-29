<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class boughtTicket extends Model
{
    use HasFactory;
    protected $fillable = ['email','no_of_tickets','event_id','ticket_type'];

    public static function createTicketPurchase(array $data = [])
    {
        return self::create($data);
    }
}
