<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TicketController extends Controller
{
    /**
     * Display a listing of the tickets.
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'eventId' => 'required|integer',
        ]);
        $eventId = $request->input("eventId");
        $tickets = Ticket::where('event_id', $eventId)->get();
        return response()->json($tickets);
    }

    /**
     * Store a newly created ticket in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|string',
            'price' => 'required|numeric',
            'description' => 'required|string',
            'max_attendees' => 'required|integer',
        ]);

        $ticket = Ticket::create($request->all());

        return response()->json($ticket, 201);
    }

    /**
     * Display the specified ticket.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function show(Request $request): JsonResponse
    {
        $eventId = $request->input("eventId");
        $ticket = Ticket::where('event_id',$eventId)->get();
        if ($ticket->isEmpty()) {
            return response()->json(['message' => 'No tickets found for the event'], 404);
        }

        // Return the tickets as JSON response
        return response()->json($ticket);
    }

    /**
     * Update the specified ticket in storage.
     *
     * @param Request $request
     * @param Ticket $ticket
     * @return JsonResponse
     */
    public function update(Request $request, Ticket $ticket): JsonResponse
    {
        $request->validate([
            'type' => 'required|string',
            'price' => 'required|numeric',
            'description' => 'required|string',
            'max_attendees' => 'required|integer',
        ]);

        $ticket->update($request->all());

        return response()->json($ticket, 200);
    }

    /**
     * Remove the specified ticket from storage.
     *
     * @param  Ticket  $ticket
     * @return JsonResponse
     */
    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        return response()->json(null, 204);
    }
}
