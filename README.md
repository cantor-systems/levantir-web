# LEVANTIR — Website

Foundation for the official LEVANTIR website at `https://levantir.com`.

## Purpose

Build a premium, advisory-led, institutional and editorial website for:

**SEGUROS · GESTIÓN DE RIESGOS · PROTECCIÓN PATRIMONIAL**

Primary locale: `es-MX`.

## Stack

- Next.js App Router
- React
- TypeScript strict
- Tailwind CSS
- CSS custom properties
- `next/font`
- `next/image`
- npm
- Git / GitHub
- Vercel

Architecture is static/server-first. Client Components should be introduced only where browser interaction genuinely requires them.

## Requirements

- Node.js 22+
- npm 10+

## Installation

```bash
npm install
```

## Local development

```bash
npm run dev
```

## Validation

```bash
npm run lint
npm run typecheck
npm run build
```

## Production

```bash
npm run build
npm run start
```

Production deployments are intended to flow through GitHub to Vercel.

## Environment variables

Copy `.env.example` to `.env.local` only when a later phase requires runtime configuration.

Never commit real secrets. `.env.local` must remain ignored.

## Architecture

Phase 1 establishes only the technical substrate:

- `src/app` — App Router
- `src/components/layout` — minimal layout primitives
- `src/config` — centralized site configuration
- `src/styles` — global brand tokens and baseline styles
- `public/brand` — official supplied brand artwork

No database, authentication, CMS or global state manager is part of v1 foundation.

## Brand asset rule

The LEVANTIR wordmark is official artwork. Do not recreate it with Playfair Display, CSS or substitute typography.

Use only supplied official brand assets. The current repository contains the provided logo reference under `public/brand/`.

## Source documents

Implementation is governed by:

1. Official LEVANTIR brand manual and assets
2. `LEVANTIR_Web_Project_Specification_v1.0.md`
3. `TARS_Web_Systems_Architect_System_Instructions_v1.0.md`
4. Approved later owner instructions

## Phase discipline

This repository is currently prepared for **Phase 1 — Foundation** only. Do not begin Phase 2 or later work without explicit approval.
