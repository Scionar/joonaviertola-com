---
title: "How DNS works"
description: "Explanation of DNS"
date: "2020-06-05"
---

Domain Name System (DNS) is a system which takes care of translating domains into IP addresses.

## How system works

Most of the time in DNS goes with requesting next name server responsible of certain area. In this example we have three name servers: root name server, domain name server and authoritative name server.

1. User requests with a browser address joonaviertola.com. User’s computer sends request for a A Record of joonaviertola.com.
2. Request is sent to resolver, which sends first request to root name server. Root name server returns IP address of .com domain name server, since URL address consists of .com top level domain.
3. Next the resolver sends request of right authoritative name server for .com domain name server. Server responses with the right authoritative name server’s IP related to domain.
4. Then the resolver sends request of A record of joonaviertola.com for the right authoritative name server. Authoritative name server responses with the A record for the resolver.
5. Finally the resolver can response to user’s computer with right IP address.

This is a long chain and that’s why caching is used. If resolver has domain name already in cache, it returns it right away without sending requests to different name servers.

## Most common DNS records

In example we already saw A record, but there is more common records. These are needed when configurating your domain in authoritative name server.

- A record is the IP address of domain’s server.
- For subdomain addresses can be used aliases. This is done with CNAME record. If www.joonaviertola.com is requested, is joonaviertola.com given to use.
- For email services MX record can be used. This is useful if third party email provider is used. Web pages are served from A record IP address, but emails are done from MX record IP address. Like for Gmail or Outlook.
- Fox custom information TXT records are used. Also SPF (Sender Policy Framework) is used with SPF record.

## Terminology

- Domain for example joonaviertola.com
- IPv4 address like 104.198.14.52
- IPv6 address like 2a00:13f0:0:1004::10
- Name Server (NS) is a server which keeps information about domains. Every domain needs to have authoritative name server to be found. There is multiple type of name servers.
- A records is the main IP address of requested domain
