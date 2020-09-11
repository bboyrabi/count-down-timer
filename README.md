# count-down-timer

Operates the countdown timer until the time of the specified day.

## Demo

[https://bboyrabi.github.io/count-down-timer](https://bboyrabi.github.io/count-down-timer)

## How to use

index.html
```html
<head>
    <link rel="stylesheet" href="styles/count-timer.css">
</head>
<body>
    <div id="timer"></div>

    <script src="./scripts/count-timer.js"></script>
    <script>
        window.addEventListener('load', () => {
            const cdt = new CountDownTimer('timer', '2021/01/01 00:00:00');
            cdt.start();
        });
    </script>
</body>
```