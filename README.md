# Calendar test:

## to run the app:
run " docker compose up "

## endpoint:
* get appoinements: GET "localhost:8100/slots?date=2024-04-15"
* create new appointments: POST "localhost:8100/slots" 
{
    "date": "2024-04-15",
    "start" : "12:30"
}

## to consider: 
* all available days and slots set in config file

