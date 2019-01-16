module.exports = `<!DOCTYPE html>
<html>
    <head>
        <title>Data viewer</title>
    </head>
    <body>
        <h1>Hello!</h1>
        <h2>A random number : ${Math.random()}</h2>

        <p>Here's a paragraph about you. You rock.</p>

        <h3>Loading...</h3>

        <script>
            fetch('/randompost').then(r => r.json()).then(json => {
                document.querySelector('h3').textContent = json.randompost.title[0];
            });
        </script>
    </body>
</html>`;
