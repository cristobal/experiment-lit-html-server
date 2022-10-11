-----
*__ARCHIVED!__*
-----

# experiment-lit-html-server-21

Testing out @popeindustries/lit, and recreating crash.

## The issue

The issues seems to be that when we have `unsafeHTML(string)` directives in our
`html` directives they can not be cached, or at least the cache key will not be
reused and the templateCache keeps on growing.

## Testing

### Normal Run
We just copied the test server code from @popeindustries/lit to run it:
```sh
npm run perf
```
Runs the `server.js` file.

### Crash Run
Copy of `server.js` file that uses one `unsafeHTML` directive.
```sh
npm run perf:unsafe
```
Runs the `server-unsafe.js` file.
Should crash in about 10-15s.

