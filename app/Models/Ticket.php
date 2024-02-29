<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    public mixed $price;
    public mixed $type;
    public mixed $description;
    public mixed $attendees;
    protected $fillable = ['event_id','price','type','description','available_tickets'];


    public function events(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Event::class);
    }
    /**
     * Create a ticket type.
     *
     * @param array $data
     * @return Ticket|bool
     */
    public static function createTicketType(array $data): bool|Ticket
    {
        // Implement any custom logic for creating a ticket type, if needed
        return self::create($data);
    }

}
