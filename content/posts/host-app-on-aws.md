---
title: "How should I host my app on AWS?"
description: "There's multiple options how to host your app on AWS. Here's how to decide best option for you."
date: "2023-04-23"
---

There's multiple options how to host your app on AWS. Here's how to decide best option for you.

## Static websites

For static websites, you don't need compute service for hosting. You need to host client code somewhere and Amazon S3 is good option for hosting it. You can serve your website straight with it using [website endpoints](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteEndpoints.html), but since it does not support HTTPS you need to use [Amazon CloudFront](https://repost.aws/knowledge-center/cloudfront-https-requests-s3) to serve HTTPS requests.

You can also use AWS Amplify to automate setup and pipelines. It's more starter friendly approach. [Getting started](https://docs.aws.amazon.com/amplify/latest/userguide/getting-started.html) guide. Just be careful with pricing, since the service automates many steps and can surprice with the price after a month. With monorepo AWS Amplify might not be the solution for you and you need to do more custom work.

## Servers and dynamic websites

You will need to use cloud computing for your backend functionality. There is three types of computing options on AWS for this: virtual machines (VMs), container and serverless services.

With Amazon EC2 you can create VM with using official and community made AMIs (Amazon Machine Image). This is already enough for hosting your website. Of course additionally you need to automate your app build and pipelines with some script.

### Using containers

Use container services if you are using containers or you have need of setting up fast new instances. Amazon ECR and ECS are the services you need to use. Your scripts builds an image and push it to ECR (Elastic Container Service). From there your script makes ECS (Elastic container service) to start up the container.

ECS is container orchestration service. If you are already familiar with Kubernetes, use Amazon EKS.

The machine that runs your container is an EC2 instance. There is option to use Amazon Fargate instead, which is a serverless container hosting service.

### Serverless functions

When you don't need always on service, AWS Lambda functions are cost wise better option. There is limitations with max 15s runtime. Lambda supports two types of development packages:

* .zip file archive – This contains your function code and its dependencies. Lambda provides the operating system and runtime for your function.
* container image – This is compatible with the Open Container Initiative (OCI) specification. You add your function code and dependencies to the image. You must also include the operating system and a Lambda runtime.

You are charged for the number of times that your code is invoked (requests) and for the time that your code runs, rounded up to the nearest 1 millisecond (ms) of duration.








