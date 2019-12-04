# SINF_2019

Repository for the 2019 SINF class in FEUP

## Install

`cd backend`
`cp .env.example .env`
`adonis key:generate`

## Run

Just run `docker-compose up` in the root of the project and all 5 containers should build and start.

Backend: http://0.0.0.0/3335
Frontend: http://0.0.0.0/3001
Redis DB: http://0.0.0.0/6379
Postgres DB: http://0.0.0.0/5433
PG admin: http://0.0.0.0/5051


# How to

## Do a Purchase Order to Sales Order

Customer must create a purchase order with series ICX (where X stands for an ID)
Add Supplier (Supplier/Customer relationship must be defined in Master Data)
Add Products (Purchase Items/ Sales Items must be defined in Master Data)