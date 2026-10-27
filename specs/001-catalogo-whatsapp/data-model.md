# Data Model: Tienda virtual sencilla

## Product

| Field | Type | Rules |
|---|---|---|
| `id` | identifier | Generated and immutable |
| `name` | text | Required, trimmed, 1–100 characters |
| `description` | text | Required, trimmed, 1–1000 characters |
| `price` | decimal | PEN, greater than zero, maximum two decimals |
| `image_path` | text | Required; one JPG, PNG or WebP object; maximum 5 MB |
| `created_at` | timestamp | Generated |

Lifecycle: created by the authenticated administrator, publicly visible after successful save,
and permanently deleted after explicit confirmation.

## Administrator

The single authenticated account is created during deployment. No customer accounts exist.

## Contact Configuration

The WhatsApp number is deployment configuration `994431924`. The message template is
`Hola, quiero pedir: [nombre del producto]`.

## Access Rules

- Public visitors: read products and open WhatsApp links.
- Authenticated administrator: create products and permanently delete products.
- Everyone else: no writes.
