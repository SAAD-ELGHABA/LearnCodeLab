@component('mail::message')
# Reset Your Password

We received a request to reset the password for your account. Click the button below to reset it.

@component('mail::button', ['url' => $url])
Reset Password
@endcomponent

If you did not request this password reset, no further action is required.

Thanks,<br>
{{ config('app.name') }}
@endcomponent
