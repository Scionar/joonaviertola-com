---
title: "AWS services"
description: "List and explanation of AWS services"
date: "2019-12-23"
---

## IAM

Name comes from "Identity and Access Management". It's work is to manage users and permissions in your AWS. User which is created as a AWS account, is a root user. With IAM, root user can create other users to handle parts of AWS. This way root account is not needed to be shared.

For development use, access type can be set to "Programmatic access", which is used for API kind of usage. Program can access to AWS services with a secret access key.

When talked about permissions, AWS uses "policies". Here's an example policy to grant all operations to S3 buckets:

```json
{
  "Version": "2012-10-17",
  "Statement": {
    "Effect": "Allow",
    "Action": "s3:*",
    "Resource": "*"
  }
}
```

## DynamoDB

NoSQL database with tables containing items. Each table has a primary key, which cannot be changed once set. Primary key can also be composite type. Which means `userId` and a `itemId`.

When creating a new table, select "On-demand" as a capacity mode. This comes cheaper for development purposes. "Provisioned" mode is better for production usage.
Note that DynamoDB is region based. Example Frakfurt and Stockholm based resources need to be selected separately from menu in AWS Console.

## S3

Comes from words "Simple Storage Service". This is a service to save files into AWS cloud. Files are called as objects and can be a image, video, backup files etc. S3 uses regions like DynamoDB does, but does not require them in AWS console. Which is kind a confusing.
When developing with S3 buckets, remember to set CORS configuration. Here's and configuration for allowing all methods:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedMethod>HEAD</AllowedMethod>
    <AllowedMethod>DELETE</AllowedMethod>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
    <AllowedHeader>*</AllowedHeader>
</CORSRule>
</CORSConfiguration>
```

## Cognito

User pool management. Where IAM is for accounts in AWS services, Cognito is users in product which you are developing. It has easy registeration and login API, with support for multiple platforms.

When creating a new user pool, given registeration data is selected. Login options for users are username, email or phone number. With registeration, additional required data can be set, address, birthday, gender etc.

Connecting to the Cognito API, is configured via "App clients" settings. When creating a APP client, note that clientside does not support use of secret key. This needs to be disabled when creating a client. Setting domain, can be found under "App intergation" -> "Domain name".

All regions are not supporting Cognito.

## Lambda

Computing service provided by AWS. Lambda supports running language in specific runtimes, example in Node.js and Java. Developer deploys simple functions into Lambda, which are run on server request. Actually functions are send to S3 and Lambda does the server request handling.

Functions are stateless. When function is called, it can't use data from last event. This why saved changes/data should be put into other service, like DynamoDB.

## Terminology

### ARN

Global identifier for AWS resources. Resource can be for an example a user or S3 bucket. ARN identifiers can used commonly when referencing other resources programmatically or in policies.

```xml
<!-- Elastic Beanstalk application version -->
arn:aws:elasticbeanstalk:us-east-1:123456789012:environment/My App/MyEnvironment

<!-- IAM user name -->
arn:aws:iam::123456789012:user/David

<!-- Amazon RDS instance used for tagging -->
arn:aws:rds:eu-west-1:123456789012:db:mysql-db

<!-- Object in an Amazon S3 bucket -->
arn:aws:s3:::my_corporate_bucket/exampleobject.png
```
