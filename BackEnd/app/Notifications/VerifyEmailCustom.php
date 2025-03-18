<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Auth\Notifications\VerifyEmail as VerifyEmailBase;
use Illuminate\Support\Facades\URL;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class VerifyEmailCustom extends VerifyEmailBase
{
    // public $user;
    /**
     * Get the verification URL for the given user.
     */
    // protected function verificationUrl($notifiable)
    // {
    //     // Generate signed URL (Laravel default)
    //     $verifyUrl = URL::temporarySignedRoute(
    //         'verification.verify',
    //         Carbon::now()->addMinutes(config('auth.verification.expire', 60)),
    //         ['id' => $notifiable->getKey(), 'hash' => sha1($notifiable->getEmailForVerification())]
    //     );

    //     $frontendUrl = config('app.frontend_url', 'http://localhost:3000');
    //     return str_replace(config('app.url') . "/api/email/verify", $frontendUrl . "/verify-email", $verifyUrl);
    // }

    /**
     * Build the mail message.
     */
    // public function __construct($user)
    // {
    //     $this->user = $user;
    // }
    // public function toMail($notifiable)
    // {
    //     if (!$notifiable) {
    //         throw new \Exception("No notifiable user found."); // Debugging step
    //     }

    //     $id = $notifiable->id; // Ensure ID is accessed properly
    //     $hash = sha1($notifiable->email);
    //     $token = app('auth.password.broker')->createToken($notifiable);
    //     $frontendUrl = config('app.frontend_url', 'http://localhost:3000') . "/verify-email/$id/$hash" . "?token=" . $token;

    //     return (new MailMessage)
    //         ->subject('Verify Your Email Address')
    //         ->line('Click the button below to verify your email address.')
    //         ->action('Verify Email', $frontendUrl)
    //         ->line('If you did not create an account, no further action is required.')
    //         ->salutation('Best regards, ' . config('app.name'));
    // }
    public function toMail($notifiable)
    {
        $id = $notifiable->id;
        $hash = sha1($notifiable->getEmailForVerification());

        $frontendUrl = config('app.frontend_url', 'http://localhost:3000') . "/verify-email/$id/$hash";

        $signedUrl = URL::signedRoute('verification.verify', ['id' => $id, 'hash' => $hash]);

        $signature = parse_url($signedUrl, PHP_URL_QUERY);
        Log::info("Generated signed URL: " . $signedUrl);  // Log it
        $fullUrl = $frontendUrl . '?' . $signature;
        return (new MailMessage)
            ->subject(' Confirm Your Email Address')
            ->line('Click the button below to verify your email address.')
            ->view('emails.verification_email', ['url' => $fullUrl])
            ->line('If you did not create an account, no further action is required.')
            ->salutation('Best regards, ' . config('app.name'));
    }
}
