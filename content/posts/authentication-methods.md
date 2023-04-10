---
title: "Authentication methods"
description: "Explanation of some backend authentication"
date: "2020-06-05"
---

Explanation of some backend authentication.

## Basic access authentication

Sometimes called as BA. Basic access authentication works with HTTP requests.

### Server side

When browser sends a request and BA is required, server responses with _HTTP 401 Unauthorized_ status and _WWW-Authenticate_ field. _WWW-Authenticate_ field should look like:

```
WWW-Authenticate: Basic realm="User Visible Realm", charset="UTF-8"
```

Realm parameter is used to identify the secure area. This is shown on popup asking the credentials. Use same real for same resource, this parameter can be used to map cached credentials to resource.

Charset is an optional parameter, but recommended. Default parameter can otherwise be some other US-ASCII compatible mode.

### Client reaction

Browser doesn’t need additional work for this. Popup is opened to ask username and password. Real is usually shown in that popup. Credentials are cached to browser for certain time depending on browser.

Browser sends credentials back to server in every response’s _Authorization_ field automatically. Username and password are combined with a single colon (:) and encoded with Base64. Like string `Aladdin:OpenSesame` comes `QWxhZGRpbjpPcGVuU2VzYW1l`. The whole header will look like:

```
Authorization: Basic QWxhZGRpbjpPcGVuU2VzYW1l
```

This means that credentials are encoded, but not crypted or hashed. Using HTTPS protocol instead of HTTP in strongly recommended to avoid leaking.

## OAuth

Open source protocol to enable API authorizations between services. API access can be partial and user is informed about the access rights. For an example, GitHub can give an access for other service to read repository’s state and push changes into it. Like Netlify.

Authorization token is shared between services, also called as a valet key. It is using JWT (JSON Web Token) standard.
