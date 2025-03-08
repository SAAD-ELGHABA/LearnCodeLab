<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

</head>

<body class="font-sans antialiased dark:bg-black dark:text-white/50">
    <h1>this is the admin side</h1>
    @if($user)
        <h1>here </h1>
    @else
        <h1>no</h1>
    @endif
</body>

</html>