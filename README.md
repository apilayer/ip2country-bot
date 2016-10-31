# Messenger Bot for IP 2 Country

[IP to Country](https://ip2country.info) mapping directly in Facebook Messenger. [Start conversation](https://m.me/ip2country) and say *Hello*.


### Testing

* Start Node.js script
```bash
npm start
```

* Start ngrok tunnel
```bash
ngrok http 3000
```


### Release

* Super easy
```bash
now -e NODE_ENV=production
```


### Encrypt

* Encrypt `config.json`
```bash
npm run encrypt
```

* Decrypt `config.json`
```bash
npm run decrypt
```

### Notes

* `.npmignore` is needed for transport `config.json` to `zeit.co`


### Hosting

https://zeit.co
