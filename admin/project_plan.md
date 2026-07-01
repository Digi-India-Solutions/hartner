# Haertner Immobilien Admin Panel

## 1. Project Description
A modern real estate admin panel for **Haertner Immobilien**, an Austrian property company. Non-technical admin staff use this panel to manage property listings. Clean, minimal, corporate design with indigo accent and white surfaces.

## 2. Page Structure
- `/` — Public Home (future)
- `/admin/properties` — Properties List (table with filters, drag-and-drop ordering, status management)
- `/admin/properties/edit/:id` — Property Editor (form + image manager + status panel)
- `/admin/properties/new` — New Property (same editor, empty form)

## 3. Core Features
- [x] Properties list table with status filtering (Alle / Veröffentlicht / Offline / Entwurf)
- [x] Drag-and-drop row reordering for properties
- [x] Status management (publish, take offline, save as draft)
- [x] Property editor with detail fields grid
- [x] Optional fields — only filled fields appear on public site
- [x] Image manager with upload, multi-select, drag-and-drop reorder
- [x] Confirmation dialogs for delete actions
- [x] Unsaved changes warning
- [ ] Public-facing property listing website (future phase)

## 4. Data Model Design
Mock data only — no Supabase database needed for Phase 1.

### Mock: properties
Each property has: id, title, category, address, status, createdAt, thumbnail, detailFields, description, images

## 5. Backend / Third-party Integration Plan
- None in Phase 1 — all data is mock/client-side

## 6. Development Phase Plan

### Phase 1: Admin Panel — Properties List & Editor
- Goal: Fully functional admin panel with properties management
- Deliverable: Two fully working admin screens with all interactions