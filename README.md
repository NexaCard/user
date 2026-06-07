# NexaCard User Web

NexaCard User Web is the customer-facing storefront for browsing products, placing orders, completing payments, querying orders, and using member features.

## Secondary Development Notice

NexaCard User Web is an independently maintained secondary-development branch based on the open-source Dujiao-Next user frontend. It uses NexaCard branding, UI direction, release tags, update channels, and documentation. See [NOTICE.md](./NOTICE.md).

## Requirements

- Node.js `20 LTS` or higher
- npm `10+`

## Local Development

```bash
npm install
npm run dev
```

Default local URL:

- User: `http://localhost:5173`
- API proxy target: `http://localhost:5175`

## Production Build

```bash
npm ci
npm run build
```

Static files are generated in `dist/`.

## Reverse Proxy Notes

When deploying as a standalone frontend, serve `dist/` from a static web server and proxy these paths to the API service on `127.0.0.1:5175`:

- `/api`
- `/uploads`
- `/sitemap.xml`
- `/robots.txt`

For Nginx Proxy Manager deployment, see:

- https://github.com/NexaCard/docs

## Related Repositories

- API: https://github.com/NexaCard/API
- User: https://github.com/NexaCard/user
- Admin: https://github.com/NexaCard/admin
- Docs: https://github.com/NexaCard/docs
