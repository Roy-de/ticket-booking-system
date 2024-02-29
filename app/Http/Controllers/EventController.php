<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class EventController extends Controller
{
    /**
     * Display a listing of the events.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $events = Event::all();
        return response()->json($events);
    }
    /**
     * Store a newly created event in the database
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $userId = Auth::id();

        // Validate the request data
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'date' => 'required|date',
            'location' => 'required|string',
            'available' => 'required|numeric',
            'ticketTypes.*.ticketType' => 'required|string',
            'ticketTypes.*.price' => 'required|numeric',
            'ticketTypes.*.available_tickets'=>'required|numeric'
        ]);

        // Create the event
        $event = Event::create([
            'admin_id' => $userId,
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'date' => $request->input('date'),
            'location' => $request->input('location'),
            'available'=> $request->input('available')
        ]);

        // Check if event creation was successful
        if (!$event) {
            return response()->json(['message' => 'Event creation failed'], 500);
        }

        // Create tickets for each ticket type
        foreach ($request->input('ticketTypes') as $ticketTypeData) {
            $ticket = new Ticket([
                'event_id' => $event->id,
                'price' => $ticketTypeData['price'],
                'available_tickets' => $ticketTypeData['available_tickets'],
                'type' => $ticketTypeData['ticketType'],
                'description'=>$request['description']
            ]);

            // Save the ticket
            if (!$ticket->save()) {
                // If ticket creation fails, delete the event and return an error response
                $event->delete();
                return response()->json(['message' => 'Ticket creation failed'], 500);
            }
        }

        // Return a success response
        return response()->json(['message' => 'Event and Ticket created successfully'], 201);
    }

    /**
     * Display the specified event.
     *
     * @param $eventId
     * @return JsonResponse
     */
    public function show(Request $request): JsonResponse
    {
        $eventId = $request->input('eventId');
        $event = Event::find($eventId);
        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }
        return response()->json($event);
    }

    /**
     * update an event in the database
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request,$event_id): JsonResponse
    {
        $user_id = Auth::id();
        $request->validate([
            'name'=>'required|string',
            'date' =>'required|date',
            'location'=> 'required|string',
            'description'=>'required|string',
            'available'=>'required',
            'ticketTypes' => 'required|array',
            'ticketTypes.*.type' => 'required|string',
            'ticketTypes.*.price' => 'required|numeric',
            'ticketTypes.*.available_tickets'=>'required|numeric'

        ]);
        try{
            $event = Event::where('id', $event_id)
                ->where('admin_id', $user_id)
                ->first();

            $event->update([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'date' => $request->input('date'),
                'location' => $request->input('location'),
                'available' => $request->input('available'),
            ]);
            Ticket::where('event_id', $event_id)->delete();

            // Create new tickets based on the updated data
            $ticketTypesData = $request->input('ticketTypes');
            foreach ($ticketTypesData as $ticketTypeData) {
                Ticket::create([
                    'event_id' => $event_id,
                    'type' => $ticketTypeData['type'],
                    'price' => $ticketTypeData['price'],
                    'available_tickets' => $ticketTypeData['available_tickets'],
                    'description'=>$request['description']
                ]);
            }

            return response()->json($event);
        }catch (\Exception $e){
            return response()->json(["error => Event not found {$e}"], 404);
        }

    }

    /**
     * Remove the specified event from storage.
     *
     * @param $eventId
     * @return JsonResponse
     */
    public function destroy($eventId): JsonResponse
    {
        $adminId = Auth::id();
        $event = Event::where('admin_id', $adminId)->find($eventId);
        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }
        $event -> delete();
        return response()->json('Event deleted successfully',204);
    }
    /**
     * Get User events based on userID
     */
    public function getUserEvents(): JsonResponse
    {
        // Get the authenticated user's ID
        $userId = Auth::id();

        // Find the user by ID
        $user = User::find($userId);

        // Check if the user exists
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $events = Event::where('admin_id', $userId)->get();

        // Return the events
        return response()->json(['Events' => $events]);
    }
    public function getEventById($eventId): JsonResponse
    {
        // Find the event by ID
        $event = Event::find($eventId);

        // Check if the event exists
        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        // Return the event
        return response()->json($event);
    }
}
