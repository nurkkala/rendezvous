# Rendezvous

This is a reference implementation of 
a _portion_ the Rendezvous semester project.
It is the basis for the final exam in the course.
To prepare for the exam,
you should install the application
and try it out as detailed here.
Your goal should be to study the code
to understand in detail **how it works**
and **how it implements key ideas**
from the course.

**How It Works.**
You should be able to trace any
implemented
capability of the reference implementation
through the _full stack_:

- From user interface (`vue` components)
- to browser-side application code (`vue` business logic)
- to network request (using `axios`)
- to server-side API endpoint (`hapi` route)
- to route handler function (`hapi` route handler)
- to database access (`objection` ORM, `knex` query builder, Postgres)
- and back out to the user interface

Examples of exam questions
related to the code might be:

- Where does the `Team` component
  store the data shown in the
  _Teams You Can Join_ list?
- How does the toolbar update
  to reflect whether a member is
  currently logged in?
- How does the RESTful API server
  retrieve the members for each team?

**How It Implements Key Ideas.**
In addition to the mechanics of
the application,
you should be prepared to answer questions
about how the various layers fit together
in the broader context of
_multi-tier web application development_.
For example:

- How is the single-page application (SPA)
  user experience
  fundamentally different from a 
  traditional ("Web 1.0") application?
- What is the main role of the server
  in a full-stack SPA? 
- Why does a robust SPA include
  a routing module?
  How does it enhance the user experience?

## Implementation Notes

The reference implementation makes 
occasional use of advanced features
of the full-stack ecosystem
that we have not covered explicitly
in class.

**Vuex.** 
The user interface
uses the [Vuex](https://vuex.vuejs.org/)
module to manage the
member currently signed in
to the application.
You are not expected to _know_
Vuex for the exam
(although you are welcome to learn about it;
follow the link).

All you should need to know
about the use of Vuex is the following:

- When a member is signed in, `currentMember` 
  refers to an object with the current member's
  details (e.g., `first_name`, `id`).
  If no member is signed-in, `currentMember` is `null`.
- You will see references in several components to
  weird-looking `mapXYZ` functions.
  These are helper functions to make it simpler 
  to access Vuex state; you can ignore them.
  
**Migrations.** 
The schema and seed data are written
using parts of Knex and Objection that we haven't covered in class.
All that you need to know is how to run
the associated commands, detailed below.
If you are interested in learning more,
read about the 
[Knex schema builder](https://knexjs.org/#Schema),
[Knex migrations](https://knexjs.org/#Migrations), and 
[Objection graph inserts](http://vincit.github.io/objection.js/#graph-inserts).


## Installation

1. Clone the repository to your development workstation.
1. Install the required NPM packages
   (`yarn install` or `npm install`)
   Yes, this takes _way_ too long.
   
## Configuration

Note: I assume that you're using `yarn`
to run commands from `package.json`
(e.g., `yarn serve`).
If you're using `npm`, that's fine,
you'll have to substitute
the `run` command
(e.g., `npm run serve`).

1. In `knexfile.js`, update your database settings:
    ```javascript
    connection: {
        host: 'faraday.cse.taylor.edu',
        user: '<your user id>',
        password: '<your password>',
        database: '<your database name>'
    }
    ```
1. Create the database schema using a Knex migration:
   ```bash
   yarn knex:migrate
   ```
   You should see a few lines of output
   including something like
   ```Batch 1 run: 1 migrations```
   If this doesn't work, it's probably because there's a problem
   with your `connection` settings.
1. Store sample data in the database using a Knex/Objection seed:
   ``` bash
   yarn knex:seed
   ```
   Output should include something like:
   ```Ran 1 seed files```

## Execution

1. In a `bash` shell, run the API server.
   ```bash
   yarn api
   ```
   You should see the route list and logging output
   that indicates that the server is running.
1. In a _different_ shell, run the Vue CLI server.
   ```bash
   yarn serve
   ```
   Vue CLI should build the UI code 
   and display the URLs for the application.
1. Open your browser to one of the indicated URLs.
   You should see the Rendezvous application 
   open to a guest welcome page.
   
## Experimentation

Kick the tires on the sample application
to better understand what's implemented.

While you're doing this,
keep the Vue Developer Tools
open and click around on various
components to see their local state
(i.e., their `data` attribute).

You should also keep an eye on the database 
as you join and leave teams, add new teams,
sign up as a new member, etc.
Use _DataGrip_ (or your tool of choice)
to view changes to the
`members`, `teams`, and `team_members`
tables.

1. The Knex seed data 
   that you installed earlier
   includes two members:

   - `fred@example.com`, password `Password99`
   - `zelda@example.com`, password `Password99`

   Click `Sign In` and enter a member's credentials.   
   You should find yourself at the *Member* page
   with lists of teams.
1. Join and leave teams a few times.
   Observe the behavior of the user interface:

   - Teams move from list to list
   - The number of team members updates as you join or leave.

   In the Vue Dev Tools,
   drill down to the `Teams` component
   and look through its state.
1. Add a team by clicking the `Add a Team` button.
   The new team should appear in the list of teams you can join.
1. Click `Log Out`
   followed by `Sign Up`
   and create a new member.
1. Log in as the new member.
   Notice that you're not part of any team.
1. Try the `Join` and `Leave`
   functions on the members page.

Remember that your goal is 
to understand how the code works
_across the full stack_.
As you run the application,
read and understand the related code;
make sure you understand how
all the pieces and parts fit together
to implement the application.
