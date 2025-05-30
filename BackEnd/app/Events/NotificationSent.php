<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Support\Facades\Log;

class NotificationSent implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public $sender;
    public $receiver;
    public $message;
    public $object;
    public $data;
    public $body;

    // Accept all parameters via constructor
    public function __construct($sender, $receiver, $message, $object = null, $data = null, $body = null)
    {
        $this->sender = $sender;
        $this->receiver = $receiver;
        $this->message = $message;
        $this->object = $object;
        $this->data = $data;
        $this->body = $body;
    }

    public function broadcastOn()
    {
        Log::info('Broadcasting on channel: notifications.' . $this->receiver);
        return new PrivateChannel('notifications.' . $this->receiver);
    }

    public function broadcastAs()
    {
        return 'NotificationSent';
    }
}
