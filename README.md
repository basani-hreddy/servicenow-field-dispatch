# ServiceNow Field Service Dispatch (FSM)

Field Service Management project showcasing work orders, dispatcher workspace, mobile technicians, inventory, and territories.

## Overview

This app represents a field operations team that sends technicians on-site to install, repair, and maintain equipment. It covers work order lifecycle, scheduling, dispatch, and mobile execution.

## Modules & Tables

- Work Orders (`fsm_work_order`) and Work Order Tasks (`fsm_task`).
- Dispatcher Workspace – map, schedule, and queues.
- Technicians & Skills (`fsm_agent`).
- Territories & Calendars.
- Parts & Stockrooms (shared with ITAM/HAM concepts).

## Key Features

- Intelligent scheduling and territory-based auto-assignment.
- Mobile technician experience: accept tasks, GPS navigation, offline work, photo/signature capture.
- Parts reservation and usage tracking for each work order.
- Contractor and crew management for large jobs.
- Integration with CSM/ITSM for on-site resolution of customer or IT issues.

## How to Recreate in a PDI

1. Activate FSM plugins and configure a sample territory model.
2. Create test agents with skills and assign to territories.  
3. Configure Dispatcher Workspace as described in `/docs/dispatcher-guide.md`.  
4. Install and connect FSM Mobile app to your instance.
5. Use `/data/sample_work_orders.csv` and `/data/sample_parts_catalog.csv` to load demo data.

## Files in this repo

- `/docs/dispatcher-guide.md` – how to use the dispatcher workspace.  
- `/docs/mobile-app-guide.md` – setup for technicians.  
- `/data/sample_work_orders.csv`, `/data/sample_parts_catalog.csv` – example work and parts.

This project is ideal to talk about FSM, logistics, and mobile workforce scenarios in interviews.
