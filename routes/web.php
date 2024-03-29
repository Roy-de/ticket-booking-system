<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\TicketPurchaseController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('/tickets',function (){
    return Inertia::render('Tickets');
});
Route::get('/events',[EventController::class,'index']);
Route::get('/events/{eventId}',[EventController::class,'getEventById']);

Route::get('/user/events', [EventController::class,'getUserEvents'])->middleware('auth');
Route::delete('/user/events/{eventId}', [EventController::class, 'destroy'])->middleware('auth');

Route::post('/tickets/{eventId}',[TicketController::class,'index']);

Route::put('/events/{eventId}',[EventController::class,'update']);

Route::post('/ticket/purchase',[TicketPurchaseController::class,'CreateBooking']);

Route::middleware('auth')->post('/events', [EventController::class, 'store']);


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
