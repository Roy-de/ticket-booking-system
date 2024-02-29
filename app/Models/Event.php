<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Event extends Model
{
    use HasFactory;

    protected $fillable = ['admin_id','name','date','location','description','available'];


    /**
     * Get the admin id for whoever is creating that event
     */

    public function admin(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'admin_id');
    }
    public function ticketTypes(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Ticket::class);
    }

    /**
     * Create an event if the authenticated user is an admin.
     *
     * @param array $data
     * @return \App\Models\Event|bool
     */

    public static function createEvent(array $data =[]): Event|bool
    {
            return self::create($data);
    }

}
