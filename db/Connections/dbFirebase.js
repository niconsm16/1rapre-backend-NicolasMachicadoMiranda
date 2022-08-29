import admin from 'firebase-admin';
import dotenv from 'dotenv'
dotenv.config()


let instance = null;

export class Firebase {

    constructor() { }

    static get getInstance() {

        if (!instance) {

            try {
                admin.initializeApp({
                    credential: admin.credential.cert(
                        {
                            "type": "service_account",
                            "project_id": process.env.FIREBASE_PROJECT_ID,
                            "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
                            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQClrr0PV/XDbcLU\nwFPqXjzWuFPpwFWHMQku/iTuuhyVUzoPGmr4dba556w9J9uWJzYGD5eHGNoCOOOn\n1QxUXAEocv/zta+btOgsiysM7+POddL/z81kM9vscRsx+SwkbtOoLXVT1iYTtIGx\nWv6GF5oDirV2yVmSYD7QBYSEFMOo4w4lHYsAQMF6v/9sPkwvyr+DSWX1auEJQojM\nZwYoje2JpwwcTtuAXLR2FDvAWbTfmIZSHP/gdxwcBydW8Y4p9+jYxwlQfK0cb7KS\n08TjLRuiMBSTu7X3oYBQa1sfS4o478tIGlwG/jXmXrCoVUq2vwUnmHPHq5faHK/c\nXm0PQ6ihAgMBAAECggEABoLAPnP9DgfYTAq+SXOYVbJC5ujGW6SNSTXWvvRclvAh\nNBJ8UWTz0Cim27TfI86I6JJQiLAs8gEpDhF41XBTodKqFPpG6zof1Q9Heu/K3pRB\n/Ug92KISkn8r28oARnK9+coGhivATY4uegkavyt6g4jeAmvda5uBYGSVHWkg+rgY\nRsW2/PxzBY0oLKQbZV08XknIgtmg3aQhrafrW7cPK8chf175K9l49Cbm2VFgFjLY\n01YFh/bDa1BOGjgvro4hQTPVOZQoFikHHeCHJxg3J5IFpEPwp7OTGbXVZ1U+xYZc\nm9V9iX6abMWHW9xGjOnLk+0aJz/Dqf6hOP6FET4iSQKBgQDUMpuFz6nf2TG51QIE\nnxVNNud+R9rhdBHISqEJ5mOghBgliCyN8szQJmLtMkQ6fZ+b3Bm7zpNdlK+I9EmA\nhubQxMvnO8sNUqd60xzzQewMbxUNTnE6bTDwgex3yyLjm8IpWmI6AX2fG6ZPPe44\ndF7zhJ5Yn8BQZoIYZX7l6nGWmQKBgQDH4hUZL+ZXQxSOJnJ833wnocRYqTytXLR3\nasoFsDmYbDL2e6JRP52nY8YhtwDS+w896p2Au2RlUbq0/BTFzoZL8iAkowafRaoF\nfDrfb0rZxFc1UL0walJ2WyHygie4kRAL/zqsnZmMFMrhobT/7O3LKameeDuBhuI6\nKY0BPyrPSQKBgHMjIo/wpdP4HasfkQDA8OX8rI8wnetG938eP1MH13b5NcDnqoU7\nATbQHU1mwO6by0bennfxFrToQHanVlqO2B7fKWRGZV7NQmK6ujKjyljUzS9zKKzz\nImLdnFlDt6KYmTmm+TVQKcFzV0IX8HJhckPf6atcwxTdCioCqGBIXWnBAoGAYzIj\n3lgTLAMyVEloT+hpKRHy6z0xy6dSOGFa2O/X5Xjs4b4Bk+jKSKQPU/QKCKpnqgah\nG53j+RRSYDcp5/DSXSZQJV5yjuB3vDkmznPg5am2zdK/0SMywWIAuuU06Te0iv+j\nEr8z0H0RImCp/siKSmTmtKpefa1+3/Z278N1b2ECgYEAiRoflQsBPFrBFqtfEulH\n2sDj5YSLvBXLbHHWUIas7gOCDVDdFrV6RdCZY2uvb/VBxvkrnGa1bNZ0ENb7tq4u\nhK7hOcjNn9ephLkfmyMJns5/2k6WLPWCv39Tj/ROxyZJq+FRenorykqvSuVJtfWY\nasD0BwWVtFNB/CICRCjMvBc=\n-----END PRIVATE KEY-----\n",
                            // "private_key": process.env.FIREBASE_PRIVATE_KEY,
                            "client_email": process.env.FIREBASE_CLIENT_EMAIL,
                            "client_id": process.env.FIREBASE_CLIENT_ID,
                            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                            "token_uri": "https://oauth2.googleapis.com/token",
                            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                            "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URL
                        }
                    )
                })
                instance = new Firebase()
                console.log('\x1b[34m', 'Firebase: conexión exitosa', '\x1b[0m')
            }
            catch (err) { console.log('Firebase: ', err) }
        }
    }
}