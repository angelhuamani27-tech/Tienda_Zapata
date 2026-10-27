# Web Contract

This document describes observable behavior without prescribing internal implementation.

## Public catalog

- `GET /` displays the shared product list.
- Each product shows name, one image, price in `S/ 0.00`, description and a `Pedir por WhatsApp`
  action.
- Empty, unavailable-image and storage-read failures show clear user-facing states.

## WhatsApp action

- The action opens WhatsApp for number `994431924`.
- The prepared text is `Hola, quiero pedir: [nombre del producto]`.
- The visitor manually sends the message; the store does not persist orders.

## Administrator

- Login is available only to the single administrator.
- An authenticated administrator can submit a valid product and permanently delete a product
  after explicit confirmation showing its name.
- Unauthenticated or expired sessions receive an error and cannot change public data.

## Error contract

Validation, image, authentication and storage failures must be shown as failures. A failed write
must not be presented as successful and must leave the previous catalog state intact where possible.
