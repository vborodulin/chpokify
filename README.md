# Chpokify

The project management tool designed for agile teams

## Start project in local environment
 🛠 A Step-by-step guide on how to start the project in local environment is in progress.

## JIRA integrations
https://developer.atlassian.com/server/jira/platform/oauth/

### Generate an RSA public/private key pair
In terminal, run the following openssl commands. You can do this anywhere in your file system, but note that this is where the files will be created.

Generate a 1024-bit private key:

```
openssl genrsa -out jira_privatekey.pem 1024
```
Create an X509 certificate:

```
openssl req -newkey rsa:1024 -x509 -key jira_privatekey.pem -out jira_publickey.cer -days 365
```

Extract the private key (PKCS8 format) to the jira_privatekey.pcks8 file:

```
openssl pkcs8 -topk8 -nocrypt -in jira_privatekey.pem -out jira_privatekey.pcks8
```
Extract the public key from the certificate to the jira_publickey.pem file:
```
openssl x509 -pubkey -noout -in jira_publickey.cer  > jira_publickey.pem
```
