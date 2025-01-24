---
title: "Understanding the Structure of a JWT Token with Examples"
description: "JSON Web Tokens (JWTs) are a widely used standard for securely transmitting information between parties as a JSON object."
date: "2024-01-24"
---

# Understanding the Structure of a JWT Token with Examples

JSON Web Tokens (JWTs) are a widely used standard for securely transmitting information between parties as a JSON object. They are compact, URL-safe, and allow for authentication and data exchange. In this article, we will dive into the structure of a JWT token, its components, and examples to illustrate how it works.

## What is a JWT Token?

A JWT token is a string that is composed of three parts:

1. **Header**
2. **Payload**
3. **Signature**

These parts are separated by dots (`.`), making a JWT token look like this:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

Let’s break down each component of a JWT token.

## 1. Header

The header typically consists of two fields:

- **alg**: The signing algorithm being used, such as `HS256` (HMAC with SHA-256) or `RS256` (RSA with SHA-256).
- **typ**: The type of token, which is usually `JWT`.

### Example:
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

This JSON object is Base64Url-encoded to form the first part of the JWT token:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

## 2. Payload

The payload contains the claims. Claims are statements about an entity (usually the user) and additional data. There are three types of claims:

- **Registered claims**: Predefined claims like `iss` (issuer), `exp` (expiration time), `sub` (subject), and `aud` (audience). Registered claims are listed in IETF’s documentation section 4.1 [RFC 7519: JSON Web Token \(JWT\)](https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1).
- **Public claims**: Custom claims agreed upon by both parties. These can be defined at will by those using JWTs. But to avoid collisions they should be defined in the ~[IANA JSON Web Token Registry](https://www.iana.org/assignments/jwt/jwt.xhtml)~ or be defined as a URI that contains a collision resistant namespace.
- **Private claims**: Custom claims shared only between parties nd are neither registered or public claims.

### Example:
```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

This JSON object is also Base64Url-encoded to form the second part of the JWT token:
```
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
```

## 3. Signature

The signature ensures that the token has not been tampered with. It is created by combining the encoded header and payload, and then signing it with a private key.

The formula for the signature is:
```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
```

### Example:
If the secret key is `mysecretkey`, the resulting signature for the above header and payload would look like this:
```
TvQwNo9_k_Cto__CBCwi4PGaBmUB3ahw7w32pb7eqyQ
```

## Full JWT Token Example

Putting it all together, the full JWT token is:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.TvQwNo9_k_Cto__CBCwi4PGaBmUB3ahw7w32pb7eqyQ
```

## Decoding a JWT Token

To inspect a JWT token, you can decode it using any Base64Url decoder. For instance:

1. **Header:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
   ```
   Decoded:
   ```json
   {
     "alg": "HS256",
     "typ": "JWT"
   }
   ```

2. **Payload:**
   ```
   eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
   ```
   Decoded:
   ```json
   {
     "sub": "1234567890",
     "name": "John Doe",
     "iat": 1516239022
   }
   ```

3. **Signature:**
   The signature cannot be decoded without verifying it using the secret or public key.

## Verifying a JWT Token

Verification ensures that:

1. The token was created by the expected issuer.
2. The token’s data has not been tampered with.

To verify a token, use the same algorithm and secret or public key that was used to sign it. Many libraries in popular programming languages, such as Node.js (`jsonwebtoken`), Python (`PyJWT`), and Java (`jjwt`), provide built-in functions to decode and verify JWT tokens.

## Advantages of JWT

- **Compact:** The tokens are small and can be easily sent via URLs, headers, or POST bodies.
- **Self-contained:** JWTs contain all the necessary information about the user or session.
- **Secure:** When used correctly, JWTs provide a robust mechanism for authentication and data exchange.

## Conclusion

JWT tokens are an essential part of modern web development, especially for stateless authentication systems. Understanding their structure—header, payload, and signature—is key to effectively using and verifying them. By leveraging libraries and following best practices, you can securely integrate JWTs into your applications.

