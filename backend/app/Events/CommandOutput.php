<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class CommandOutput implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public string $output;
    public bool $finished;

    public function __construct(string $output, bool $finished = false)
    {
        Log::info('CommandOutput event created');
        $this->output = $output;
        $this->finished = $finished;
    }

    public function broadcastOn(): Channel
    {
        Log::info('Broadcasting on command-output channel');
        return new Channel('command-output');
    }

    // public function broadcastAs(): string
    // {
    //     return 'CommandOutput';
    // }
}
