# Tiny Tiny RSS for Ferdium

Interact with [Tiny Tiny RSS](https://tt-rss.org/) inside of Ferdium!

## Usage

1. Search for "RSS" in Ferdium's **Available Services**
2. Enter the URL of your Tiny Tiny RSS server
3. Save the service and log in!

## Configuration

### `ferdiumNotificationLabel`

You can limit notifications from Tiny Tiny RSS to new articles in a specific
Category using the custom `ferdiumNotificationLabel` query parameter as part of
your server URL.

```
https://ttrss.example.com/tt-rss/?ferdiumNotificationLabel=CATEGORY_NAME
```

For example, if I wanted to only see notifications from a Category titled
`Software - Updates`, I would use one of the following query parameters:

```
?ferdiumNotificationLabel=Software - Updates
```
**OR**
```
?ferdiumNotificationLabel=Software%20-%20Updates
```

The second option is the better/safer approach to take, but the first also works
because Ferdium will escape the spaces for you (at least as of version 6.2.7).

NOTE: When using the `ferdiumNotificationLabel` configuration, all other unread
articles in other categories are reported as [**indirect**
messages](https://github.com/ferdium/ferdium-recipes/blob/main/docs/frontend_api.md#setbadgedirectmessages-indirectmessages).