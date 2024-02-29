<?php

namespace App\Http\Controllers;

use App\Mail\MailService;
use App\Models\boughtTicket;
use App\Models\Event;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class TicketPurchaseController extends Controller
{
    public function CreateBooking(Request $request)
    {
        $request -> validate([
            'email'=>'required|string',
            'no_of_tickets'=> 'required|numeric|max:5',
            'event_id' =>'required|numeric',
            'ticket_type'=> 'required|string'
        ]);
        try{

            $ticket_type = Ticket::where('event_id',$request->event_id)->get('type')->toArray();

            foreach($ticket_type as $ticket){

                if($request->ticket_type == $ticket['type']){
                    $ticket = Ticket::where('event_id', $request->event_id)
                        ->where('type',$ticket['type'])
                        ->first();
                    if($ticket->available_tickets < $request->no_of_tickets){
                        return response()->json("Not enough tickets",400);
                    }else{
                        $ticket->available_tickets -= $request->no_of_tickets;
                        $ticket->save();
                        boughtTicket::create([
                            'email' => $request->email,
                            'ticket_type' => $request->ticket_type,
                            'no_of_tickets' => $request->no_of_tickets,
                            'event_id' => $request->event_id,
                        ]);
                        $event = Event::find($request->event_id);
                        $data = [
                            'event_name' => $event->name,
                            'no_of_tickets' => $request->no_of_tickets,
                            'type' => $request->ticket_type,
                        ];
                        Mail::to($request->email)->send(new MailService($data));
                        return response()->json("Ticket booked successfully",201);
                    }
                }
            }
            return response()->json("Error");
        }catch (\Exception $e){
            return response()->json("Error creating ticket ${e}",500);
        }
    }
}
