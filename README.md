# Demo

[YouTube Link](https://youtu.be/h7MUUR10D3Q)

# Starting Backend

0. Make sure MySQL is running. Refer to the attached database dump of simplerecipes and execute it. The dump is also located in `simple-recipes/backend/sql/simplerecipesdump.sql`.

1. You must node installed (`brew install node`). For reference, I am running on version `v17.8.0`. npm must also be installed, but it should come with node. 

2. Create a .env file in /backend that will contain the DB credentials you point to. It should look like this (fill in your password):\
DB_HOST="localhost"\
DB_NAME="simplerecipes"\
DB_USER="root"\
DB_PASSWORD=XXXX

| Config Value              | Description                               |
| ------------------------- | ----------------------------------------- |
| `DB_HOST="localhost"`     | Host for DB (likely is localhost).        |
| `DB_NAME="simplerecipes"` | Name of DB (should be simplerecipes).     |
| `DB_USER="root"`          | User of DB (likely is root).              |
| `DB_PASSWORD=XXXX`        | Your DB password.                         |

3. In your terminal, navigate to simple-recipes/backend. Run `npm install`. This is necessary to install the dependencies used in this project as specified in `simple-reciples/backend/package.json`.

4. Also in simple-recipes/backend, run `npm start`.\
You should see:\
`Listening on 8080`\
`Connected to MySQL DB. threadId: ...`


# Starting Client
1. Dependencies: python3 must be installed ([official link](https://www.python.org/downloads/macos/)). The python libraries used are `requests`, `getpass`, and `json`. All of these can be installed with pip (e.g. `pip install requests`).

2. In your terminal, navigate to simple-recipes/client. Run `python recipesClient.py`.\
You should see:\
`Do you want to login (enter: "l") or sign up (enter "s")?`

