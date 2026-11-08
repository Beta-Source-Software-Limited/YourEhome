# YourEhome — Next.js + Django + MySQL

A responsive real estate site and REST API inspired by the supplied visual mockup. **Includes working listing search, property details, saved listings, admin CMS, and lead inquiry workflows.** This is a functional MVP, not a payment or legal transaction platform.

> **Important:** Seed records (properties, agents, prices, addresses), homepage statistics, and the `hello@yourehome.example` contact address are **fictional demonstration data**. Replace them with verified information before launching. Hero/property photos are externally hosted by Unsplash and require internet access.

## Tech stack

- **Frontend:** Next.js 15 App Router, React 19, TypeScript, CSS, Lucide icons.
- **Backend:** Python 3.12, Django 5.2, Django REST Framework, django-filter, Django admin.
- **Database:** MySQL 8.4 with Docker persistent volume.
- **Infrastructure:** Docker Compose for local development; environment-variable configuration.

## Run with Docker Compose (recommended)

Requirements: Docker Engine/Desktop + Compose plugin.

```bash
cp .env.example .env
# Update secrets/passwords in .env first.
docker compose up -d --build
# Load demo content AFTER database migrations complete.
docker compose exec backend python manage.py seed_demo
# Create an administrator for /admin/.
docker compose exec backend python manage.py createsuperuser
```

Open:

| Service | Local URL |
| --- | --- |
| Frontend | http://localhost:3000 |
| Django REST API | http://localhost:8000/api/properties/ |
| Django administrator | http://localhost:8000/admin/ |
| Health check | http://localhost:8000/health/ |

To stop: `docker compose down`. To delete the database **permanently**: `docker compose down -v` (destructive!).

## Run without Docker

First, create a MySQL database and user with credentials matching the `.env` values. From `backend/`:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export MYSQL_DATABASE=yourehome MYSQL_USER=yourehome MYSQL_PASSWORD=YOUR_PASSWORD MYSQL_HOST=127.0.0.1
export DJANGO_SECRET_KEY=YOUR_SECRET DJANGO_DEBUG=1 DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
export DJANGO_CORS_ALLOWED_ORIGINS=http://localhost:3000
python manage.py migrate
python manage.py seed_demo
python manage.py createsuperuser
python manage.py runserver
```

In a second terminal from `frontend/`:

```bash
npm install
NEXT_PUBLIC_API_URL=http://localhost:8000/api npm run dev
```

**macOS note:** If `python` is unavailable, use `python3` and then the activated virtual environment's `python` command.

## Available pages and features

| URL | Purpose |
| --- | --- |
| `/` | Hero search, featured properties, services, agents, CTA |
| `/properties` | Live search by keyword, status, type, price + sorting and pagination |
| `/properties/[slug]` | Server-rendered detail, agent info, customer inquiry form |
| `/favorites` | Save or unsave property cards in local browser storage |
| `/agents` | Active agents from MySQL |
| `/about` | Brand introduction |
| `/services` | Service descriptions |
| `/contact` | General inquiries or consultation requests via `?consultation=1` |
| Django `/admin/` | Manage agents, listings, image URLs, incoming inquiries |

## Public API

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/properties/` | Paginated listing catalogue |
| GET | `/api/properties/{slug}/` | Single property |
| GET | `/api/agents/` | Active agents |
| POST | `/api/inquiries/` | Create a lead / consultation request |

Sample searches:

```text
GET /api/properties/?status=sale&property_type=villa
GET /api/properties/?search=Austin&max_price=2000000
GET /api/properties/?status=rent&ordering=price&page=1
GET /api/properties/?featured=true
```

Create an inquiry:

```bash
curl -X POST http://localhost:8000/api/inquiries/ \
  -H 'Content-Type: application/json' \
  -d '{"category":"contact","name":"Jane Example","email":"jane@example.com","phone":"","message":"I would like to learn more about your services."}'
```

Consultation requests can also contain `preferred_date` as `YYYY-MM-DD`. Property inquiries require a `property` ID. Validation errors are returned as HTTP 400. A basic throttle limits unauthenticated submissions to 5 requests per hour per IP.

## Project structure

```text
YourEhome/
├── compose.yaml              # Local MySQL + API + Next.js
├── .env.example              # Required configuration
├── design-reference.png      # Original concept image
├── backend/
│   ├── config/               # Django settings, WSGI and URL routing
│   ├── realestate/
│   │   ├── models.py         # Agent, Property, Inquiry tables
│   │   ├── serializers.py    # Explicit API payloads
│   │   ├── views.py          # Filtering and rate-limited lead endpoint
│   │   ├── admin.py          # Content management UI
│   │   ├── tests.py          # API smoke tests
│   │   └── management/commands/seed_demo.py
│   ├── requirements.txt
│   └── Dockerfile
└── frontend/
    ├── app/                  # Next App Router routes + CSS
    ├── components/           # Reusable navigation/cards/forms
    ├── lib/                  # Typed API client and interfaces
    ├── package.json
    └── Dockerfile
```

## Change brand content and imagery

- Edit the company tagline and navigation in `frontend/components/Header.tsx`.
- Edit homepage sections and non-verified example metrics in `frontend/app/page.tsx`.
- Edit footer contact details in `frontend/components/Footer.tsx`.
- Manage all property and agent inventory from the Django admin (no source-code edits required).
- Hero background: `frontend/app/globals.css` (`.hero-photo`).
- Each property image is a URL stored in MySQL. Gallery is a JSON array of image URLs.
- USD is the default display currency; adjust `formatPrice()` in `frontend/lib/api.ts` if switching markets.

## Deployment and security checklist

This Compose stack is for **development**: it runs Django's development server and Next.js dev server. For production:

1. Use strong unique passwords and a secure Django secret key, set `DJANGO_DEBUG=0`, set explicit allowed hosts / CORS origins and use HTTPS.
2. Deploy Django behind a reverse proxy via Gunicorn; run `python manage.py collectstatic --noinput` and serve static files through the proxy or storage.
3. Use `npm run build && npm run start` for the frontend. Configure `NEXT_PUBLIC_API_URL` at **build time** to your externally reachable HTTPS API URL, and `API_INTERNAL_URL` for server-side requests.
4. Provision managed MySQL or a secured MySQL deployment; configure backups, database credentials and network restrictions.
5. Restrict admin accounts, implement logging, monitor forms, consider CAPTCHA + email notifications + stronger anti-spam rules, and configure relevant privacy and legal notices.
6. If the site accepts uploads later, validate files and use authenticated object storage. Current images are URL-based; there is no public upload endpoint.
7. Verify actual listing ownership, photos, business statistics, contact details, accessibility, privacy policy, and real estate regulations before going live.
8. On shared hosting, Next.js SSR pages require a Node.js server. Static export (`output: 'export'`) is **not compatible** with this project's server-rendered dynamic property details without architecture changes.

## Testing

For the frontend, run `npm run typecheck` and `npm run build` from `frontend/` after `npm install`.

For the backend, run `python manage.py test realestate` from `backend/` with a running, authorized test MySQL database. Django will attempt to create a `test_...` database; the MySQL user needs `CREATE DATABASE` privileges.

### Development limitations

- Favorites are device-local and are not synchronized between browsers.
- Consultation requests are recorded as leads; they do **not** create calendar bookings or guarantee appointment availability.
- There is no public account, payment, offer-submission, messaging, or agent dashboard workflow yet. Django admin is intended for trusted staff only.
- External photos and fonts require an internet connection. Demo assets are for concept development; confirm image licenses and substitute company-owned media before commercial launch.
