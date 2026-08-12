# Information system for a boat transportation

# application on the east coast of the adriatic

## (Project for Systems III)

**Name and surname:** Vuk Ignjatović

**Year of draft submission** 2026

**Method of course completion: implementation**


## Problem statement

In 2025 Slovenia, Croatia and Montenegro received a total of over 31.4 million tourists. About one in ten
of those tourists needed to take some sort of boat transportation during their stay. So far there hasn’t
been a single way for people to compare the price, speed and quality of boat transportation. This means
that around 3 million potential users are left without a proper information system forcing them to rely on
walking across the city ports under heavy sun and talking to tourist guides. At the same time the boat
owners don’t have a way of getting in contact with the potential customers so they rely on working for
agencies which take a large cut out. An implementation of a boat transportation information system
would cut out the agencies, allowing tourists and boat owners to connect efficiently and directly.

The users would need to sign up to use the application in order to message other users on the platform.
Depending on if the user is offering services they can specify that they are a boat owner which will allow
them to upload rides. Each ride would contain information about the type of boat used, images, path,
price as well as personal preferences ( no pets, no children etc. ).The tourists would search for boat
rides between a set of destinations and the recommendation system would offer them the list of
rides.The tourists can message boat owners whose rides are published to see which ride suits them the
best. To reserve a ride the tourist would have to send a reservation request and the boat owner has the
ability to accept the ride or decline it. After completing the ride, the user can leave a review of the driver
and the driver could do the same to the user. This way both parties would communicate with each other
without the agencies.

From the perspective of stakeholders this app could provide revenue through data collection about the
users, a premium subscription service which provides additional features as well as a 5% cut off of all
boat rides which the user will pay to the app through an in-app transaction. The main selling point of the
app is actually the data. The boat information API will offer valuable information to local restaurants, port
authorities and tourist agencies about the local traffic. The data about arrivals, most sought after routes,
premium routes will be fed into custom-built machine learning models which would be used to predict
not just how many tourists will be present in an area, but also which type of tourists. Additional GUI tools
can be developed to generate visualizations such as heat maps for non-technical customers.


Functional and nonfunctional requirements of new system

**Non-functional requirements:**

```
Requirement Type Explanation
```
Performance (^) The application must process up to 100 boat ride uploads, deletions or modifications per
minute.
The application must process up to 5,000 search requests per minute.
The system must maintain at least 3,000 concurrent chatting sessions, supporting up to
6,000 simultaneous users. Assuming sessions resolve within 2 or 3 days, the system can
serve up to 200,000 active users per summer season.
Geospatial search queries must return results in under 500 ms when the database contains
up to 10,000 active records.
If the Stripe API fails, the application will retry within 5 minutes. If the transaction fails due to
the user's card, the booking is cancelled. If Stripe itself is unavailable, the booking is
preserved and retried. Stripe's 99.99% uptime means this fallback is rarely needed.
Information (^) Ride availability must be near-real-time. The system uses a read replica for search
queries, prioritising availability over consistency. When a ride becomes full, booking
requests sent to a stale replica will be automatically denied once the state synchronises,
and the tourist will receive an automated notification explaining the denial.
The searching functionality relies on Google Maps Places API for start and end port
location input and for search queries.
Google Cloud Vision API is used to validate uploaded images of personal IDs and boat
licences during owner verification.
The H3 Hexagonal Hierarchical Indexing algorithm, open-sourced by Uber, is used to
query the database for geospatially optimal ride suggestions.
Anonymised and aggregated user activity data may be shared with business partners via
a dedicated analytics API, in compliance with GDPR.
The personal tax numbers and annual income of boat owners will be reported to the tax
authorities of their respective countries once per year, as required by law.
Economy During peak holiday season the system scales out horizontally to ensure a minimum uptime
of 98%. After the season, it scales back to a minimum uptime of 90%, reducing infrastructure
costs during low-demand periods.
Scheduled horizontal scaling is used: on a defined date, additional servers are provisioned
and data is distributed among them. After the season, the server count is reduced. This
approach ensures no single server failure causes total downtime.
The chat subsystem uses serverless computing via Google Cloud microservices, eliminating
the need to provision dedicated messaging servers and paying only for actual usage during
peaks.
Chat logs from non-cross-border rides are deleted after 12 months. Serverless chat storage
is overwritten by new messages as capacity is needed, minimising long-term storage costs.


```
Control
(and Security)
```
```
All client-server communication must use HTTPS. WebSocket connections must use WSS.
The application must redirect any HTTP request to HTTPS.
Users are authenticated with Google OAuth 2.0. Only a session token is stored on the client,
no passwords or sensitive credentials are being saved to the database.
The backend is implemented in Node.js and protected against SQL injection through an
ORM library called Sequelize. All user inputs must be validated
All data collected about users, chat logs and trips must comply with EU GDPR. Servers must
be located within the EEA zone.
Chat logs from rides that cross international borders are backed up to a secondary database
after ride completion and retained for 12 months. This backup is accessible only through the
read-only Jurisdictional API, available to authorities upon verified request.
No raw credit card details are stored in the application database. All payment data is
handled exclusively by Stripe.
Anonymised analytics data shared with partners must not include any personally identifiable
information, in accordance with GDPR Article 89.
```
Efficiency (^) Search requests query a read only copy of the ride database rather than the primary,
separating read and write requests and keeping both fast.
The H3 geospatial index reduces full table scans by partitioning the Earth into hexagonal
cells, allowing the system to narrow candidate rides to a small geographic subset before
applying further filters.
The chat subsystem is decoupled from the core application as an independent microservice.
This means a surge in messaging load does not degrade search or booking performance.
Expired ride data and associated chat logs are automatically purged on a defined schedule,
preventing unbounded database growth without manual intervention.
A single React Native codebase targets web, iOS and Android, eliminating duplicate
development and maintenance effort across platforms.
Service (^) The system serves two user roles: tourists (search, book, review, report) and boat owners
(all tourist capabilities plus ride management and scheduling). A single account may hold
both roles simultaneously.
The primary user base is mobile users in the East Adriatic region during summer,
predominantly international tourists. The web interface must be fully responsive across
screen sizes.
The application interface and critical information must be available in five languages:
Slovenian, German, Italian, English and Serbo-Croatian.
(^) Peak season uptime is 98%, while the off season uptime is 90%. Both are maintained
through horizontal scaling as described under Economy.
Boat owner accounts require identity verification (personal ID and boat licence reviewed via
Google Cloud Vision API) before ride publishing is enabled. Standard tourist accounts
require only Google OAuth registration.
Users are informed of chat deletion schedules and messaging guidelines at the start of
every chat session.


### Functional requirements

The system should enable the following functionalities:

Preview:
● Non registered users will have the ability to see how the idea works from the landing page.

Users

```
● Only registered users can access the application.
● The user can specify if they are a tourist and/or a boat owner. Tourists are limited to the search
screen and profile page, while the boat owners will have an additional page which will help
them upload information about their rides. A user which contains both will have the ability to
both search for a ride and publish a ride.
● If the users wants to be a boat user they will need to go through an additional
verification procedure in which they publish their licence as well as personal id.
● The information about number of reviews, their average as well as a sample of few reviews
left for the user should be visible on the users profile
● To ensure the users that the application is safe all client-server communication must be encrypted
in transit.
```
```
● Application needs to be able to ask and obtain user location using a window prompt.
```
The Search page

```
● An open source recommendation algorithm will be adapted for performing ride suggestions based
off of the user's location. The recommended information will be visible on the search page under
the input fields.
● Geospatial indexing should be implemented in the database for more efficient searching
● The search page should implement rate limiting for the amount of requests a user sends to
the server in a one minute period
● .The ride which the boat owner marks as full should not be visible nor searchable to
non-riders.
```
```
● The system must be able to sort all the searched boat rides depending on pricing,
duration, capacity, reviews and proximity to the original request
```
Chatting system

```
● The system will contain an automatic filter implemented using regex and an array of bad words
in multiple languages.
● The chats are meant to be very short so each user will only be able to send up to 30
messages inside one chat. This will be enough to communicate crucial information without
getting into arguments. After that only the users who are paying a subscription to the app will
be able to continue sending messages with a rate limit of 20 messages per minute
● The tourists need to be able to send ride booking requests and the boat owners have the ability
to accept them or deny them. If the ride request isn’t accepted 4 hours before the ride’s start
it’s considered denied.
● All chats connected to a specific ride will be deleted 4 hours after the ride is completed
● Chats containing information about cross-country rides will be moved to cold storage prior to
deletion. This storage could be utilizing magnetic tape for cost efficiency.
● The users will be able to see chatting guidelines as well as the information about chat deletion
on the start of the chat
```

Ride upload, deletion and modification

```
● Boat owners need to be able to upload, edit and delete their ride services
● The system should allow the boat users to set up a weekly schedule of rides
● The rides need to contain information about the boat, owner, expected duration, start and end
ports, if the transfer crosses borders, cost of the ride as well as a list of tourists taking the
ride. Boat owners who pay a subscription will be able to upload photos.
● Photo uploading will be scanned using an open source image detection algorithm which will
block upload of inappropriate images. The inappropriate images are NSFW photos, weapons,
images of plain text or non-boat photos which are irrelevant like pets.
● Rate limiting will also be implemented for publishing boat rides. A user can only publish or
modify up to 2 rides per day with one account. Those who have the app subscription will be able
to publish up to 300 rides per month.
● Within the form for ride upload the owner can specify a quick generic response given to each
user which requests a ride. This response is meant to contain all the additional information
about the trip which hasn’t been already listed.
● After the end time of a ride is completed both the owner and the tourist will get a pop up
asking them to confirm if it was completed.
● Rides crossing borders will display an icon of a boat on top of the globe, alongside a short
text explaining that the ride crosses borders.
```
```
Reviews
```
```
● Once the ride is completed the users have the ability to write short reviews about each other and
to give a final rating. This can only be done if both parties mark the ride as completed. If only
one party claims that the ride wasn’t completed an automatically generated review will be placed
under the profile of a person who didn’t confirm it as completed. It will state the information about
the ride and that there was a conflict when it comes to confirmation.
```
```
Report mechanism
```
```
● Users should be able to report each other for violating community guidelines.
● Ride posts can be reported by users.
● The system needs to include a mechanism for accurately classifying reports and
introducing account deletion or suspension
```

Database management system:

```
● The nature of the system is such that it can be used for transportation of illegal substances as
well as firearms or illegal immigrants. This is why the data about the rides which cross
countries
,as well as all of the conversations that lead to the confirmation of the ride will be stored in cold
storage. The cold storage will utilize magnetic tapes for fast writing and cost effectiveness.
```
```
● The database management system will utilize serverless databases which will expand over the
summer by acquiring multiple new servers. It’s meant to offer low latency, scalability, cost
predictiveness and high uptime. It will be used to handle search traffic, store chat messages
and offer safe storage of authentication tokens.
```
```
● The other is the data which will store information about users, reviews, rides and the
booking procedure. The purpose of this part is to act as a back-up for the serverless storage
and
```
```
● A Jurisdictional API is to be developed which could query ride information. The API must have
the ability to extract the information about which users were present during the ride, when was
the ride marked as completed and what was the originally planned path. The Jurisdictional API is
not a public endpoint. Access is only granted after a formal verification of legal warrants, at
which point a temporary credential is issued to the authorities.
```
```
Payment system and Subscription.
```
```
● Boat owners who want to publish many rides or include images in their posts need to pay
a premium user fee.
● To make sure the boat owners don’t cancel rides once they confirm them, they will be charged
a service fee for each tourist that they affect with their scheduling problems. This money will be
transferred back to the tourists
● To make sure tourists don’t cancel the rides once they confirm them they will be charged an
extra fee for cancelling. This extra part of the fee will go to the boat driver of the confirmed ride.
● The credit card details as well as the subscription service will be securely stored and processed
using Stripe
● Premium users will have special insignia signaling that they have paid to use the app. This way
other users would see them as more trustworthy. They will be exempt from the rule of paying
for service fees, unless they cancel a confirmed ride.
● The system should allow the users to book a ride even if the payment platform fails to perform
a transaction. The transaction information will be saved to the database and processed later.
```

Non-functional requirements

```
● The application needs to be able to process up to 100 boat ride uploads, deletions of
or modifications per minute.
```
```
● The system needs to be able to maintain at least 3000 chatting sessions. Which means at once
up to 6000 users should be able to communicate. The assumption is that the communication will
be resolved within two or three days. This means that we can handle up to 200 000 active users
per summer season.
● The system shall authenticate users via Google OAuth 2.0 and store only a session token on
the client.
● The application must force the HTTPS communication in client server communication.
```
```
● The application needs to be able to process up to 5000 search requests per minute.
```
```
● The back end of the application will be written in Node.js. It will be protected from SQL injections
using ORM libraries like Sequalize.
```
```
● Data about user activity will be anonymised and aggregated to generate usage analytics
which may be shared with business partners through the boat analytics API.
```
```
● H3 (Hexagonal Hierarchical Indexing) algorithm which is open sourced by Uber will be utilized to
search the database for a list of optimal rides.
● The information system will be implemented as a web page and needs to be easily accessible
to all users and fully responsive.
```
```
● The searching functionality will rely on Google's maps places API for listing the locations
the users can use to list the start and end port of the boat ride as well as for searching.
```
```
● The chat system shall be decoupled from the core application using microservices offered by
Google. This way immense serverless computing power can be obtained during critically
high usage. If the chat belongs to a point which crosses countries it will be stored in a back
up database after the ride is completed.
```
```
● The chat logs will be deleted from the database server after 12 months. The serverless logs
from the completed rides will be over-written by new messages as soon as they come in.
```
```
● The back up of chat logs will be accessible using the Jurisdictional API which will be able to
only read the data. The system should reserve servers within the EEA zone to offer minimal
legal complications.
```
```
● During the peak holiday season the application needs to have the ability to expand the
computing power by acquiring additional servers to assure the minimum uptime of 98%. Once
the season is closed the system can scale back to the minimal required uptime of 90%. This will
be achieved through scheduled horizontal scaling. On a set date the number of servers
purchased will expand and the data will be shared among them. Then after the season ends the
number of servers will be reserved. Horizontal scaling offers the most robust service as the
downtime of a single server may not introduce a total collapse of the application. As long as at
least a few servers are running the system continues operating.
```

● Many tourists are searching but only a small number of owners are uploading or modifying the
rides. To deal with this the search functionality the requests will query a copy of the database
which contains ride information. The boat owners will directly modify the database's latest
version and the servers will asynchronously update the information. Synchronization systems
must be implemented such that the availability is prioritized over consistency. Due to
inconsistency of the state it can occur that the tourist sends a booking request to a full ride. Once
the state is synchronized the tourists requests would be automatically denied with an automatic
response.

● The data collected about the users, chat logs and trips should comply with EU’s
GDPR compliance law.

● Google Cloud Vision API will be used as a verification algorithm for validating the images of IDs
as well as of boat licences.

● Geospatial search queries must return results in under 500ms when the database contains up
to 10,000 active records.
● The crucial app information needs to be available in Slovenian, German, Italian, English
and Serbo-Croatian
● If the Stripe API fails to perform a transaction the application will re-try to invoke the API within
the following 5 minutes. If the API is down by that time, the booking procedure will not be
denied to the users. If the API works, but the transaction doesn’t go through, the booking will be
cancelled. The booking fee is meant to encourage the users to not make unserious bookings.
The Stripes 99.99% uptime will allow the app to perform reliably in most situations.
● The personal tax numbers of boat owners, as well as their income will be saved and reported
to the authorities of their respective countries once a year due to legal obligations.


### Data modelling

#### Entity relationship diagram (ERD)

```
Figure 1: Entity-relationship diagram of the boat transportation application on the east coast of the
adriatic. The diagram is available at link.
```

#### Data dictionary

Table 1: Data dictionary for boat information

```
Entity
Name
```
```
Entity Desc. Entity
Attribute
```
```
Attribute Desc. Attribute
Domain
```
```
Attribute
Def. Val.
```
```
Attribute Constraint
```
```
user Stores information
about all registered
users. A user may
hold the role of
tourist, boat owner,
or both
simultaneously.
This entity is
queried by the
Jurisdictional API
and analytics API
```
```
id Unique identifier of the
user.
```
```
INTEGER auto-gener
ated
```
```
Primary key, not null,
unique
user_name Chosen display name
visible to other users.
```
```
VARCHAR(50) null Not null, unique
```
```
first_name Legal first name of the
user.
```
```
VARCHAR(50) null Not null
```
```
last_name Legal last name of the
user.
```
```
VARCHAR(50) null Not null
```
```
age Age of the user in years. INTEGER null Not null, must be >= 18
gender Self-reported gender of the
user.
```
```
VARCHAR(20) null Nullable
```
```
nationality ISO 3166-1 country code
of the user's nationality.
```
```
CHAR(2) null Not null
```
```
language Preferred UI language
code (e.g. en, de, sl, hr).
```
```
CHAR(5) 'en' Not null
```
```
role User role determining
access level in the system.
```
```
ENUM('tourist',
'owner', 'both')
```
```
'tourist' Not null
```
```
created Timestamp of account
creation.
```
```
TIMESTAMP CURRENT
_DATE
```
```
Not null
```
```
verified Whether the user's ID and
licence has been verified
via Google Cloud Vision
API.
```
```
BOOLEAN FALSE Not null
```
```
is_flagged Whether the user has been
flagged by a boat owner
for non-payment or
misconduct.
```
```
BOOLEAN FALSE Not null
```
```
stripe_custo
mer_id
```
```
Stripe customer reference
used for recurring payment
without re-entering card
details.
```
```
VARCHAR(100) null Nullable, unique
```

```
Entity
Name
```
```
Entity Desc. Entity
Attribute
```
```
Attribute Desc. Attribute
Domain
```
```
Attribute
Def. Val.
```
```
Attribute Constraint
```
**preference** Stores
optional
lifestyle
preferences
for a user,
used by the
recommendat
ion algorithm
to match
compatible
rides and
co-passenger
s. It’s
extremely
useful for the
analytics API

```
id Unique identifier of the
preference record.
```
```
INTEGER auto-gener
ated
```
```
Primary key, not null,
unique
smokes Whether the user smokes. BOOLEAN FALSE Nullable
drinks Whether the user drinks
alcohol.
```
```
BOOLEAN FALSE Nullable
```
```
has_kids Whether the user travels
with children.
```
```
BOOLEAN FALSE Nullable
```
```
has_pets Whether the user travels
with pets.
```
```
BOOLEAN FALSE Nullable
```
```
stay_duration Expected number of
overnight stays during the
trip
```
```
INTEGER null Nullable
```
```
Entity Name Entity Desc. Entity Attribute Attribute Desc. Attribute Domain Attribute
Def. Val.
```
```
Attribute
Constraint
```
**subscription** Tracks
premium
subscription
purchases.
Subscribers
have
increased rate
limits and can
upload photos.
The payment
re-occurs
monthly
without the
user needing
to re-enter
details

```
id Unique identifier of the
subscription.
```
```
INTEGER auto-gene
rated
```
```
Primary key, not
null, unique
expires_at Date and time the
subscription expires.
```
```
TIMESTAMP null Not null
```
```
purchased_at Date and time the
subscription was
purchased.
```
```
TIMESTAMP CURREN
T_DATE
```
```
Not null
```
```
stripe_subscri
ption_id
```
```
Stripe subscription object
ID used for renewal and
cancellation management.
THIS IS NOT A FOREIGN
KEY. Its for the library
```
```
VARCHAR(100) null Not null, unique
```
```
has_premium Set to true if user has
purchased premium
```
```
BOOLEAN false Not null
```

```
Entity
Name
```
```
Entity Desc. Entity
Attribute
```
```
Attribute Desc. Attribute Domain Attribu
te Def.
Val.
```
```
Attribute Constraint
```
**boats** Stores
information
about boats
registered on the
platform. A boat
must be owned
by a verified
boat-owner user.

```
id Unique identifier of the
boat.
```
```
INTEGER auto-ge
nerated
```
```
Primary key, not null,
unique
name Name or nickname of the
boat.
```
```
VARCHAR(100) null Not null
```
```
seats Maximum passenger
capacity of the boat.
```
```
INTEGER null Not null, must be > 0
```
```
desc Free-text description of the
boat provided by the owner.
```
```
TEXT null Nullable
```
```
year Year the boat was
manufactured.
```
```
INTEGER null Nullable
```
```
type Type of boat. Enum(‘ sailboat’,
‘motorboat’,
‘catamaran’,
‘cruiser’,’jetski’,’fishi
ng_boat’)
```
```
null Not null
```
```
registration Official registration or
licence number of the boat.
```
```
VARCHAR(50) null Not null, unique
```
```
Entity
Name
```
```
Entity Desc. Entity
Attribute
```
```
Attribute Desc. Attribute
Domain
```
```
Attribute Def.
Val.
```
```
Attribute
Constraint
```
**port** Represents a city or a
port. Ports are indexed
geospatially using H
for efficient search

```
id Unique identifier of the port. INTEGER auto-generated Primary key, not null,
unique
name Port name VARCHAR(100) null Not null
h3_index H3 hexagonal cell index
used for geospatial
proximity search.
```
```
VARCHAR(20) null Not null, indexed
```
```
latitude latitude coordinate of the
port for map display.
```
```
FLOAT null Not null
```
```
longitude longitude coordinate of the
port for map display.
```
```
FLOAT null Not null
```

```
Entity
Name
```
```
Entity Desc. Entity Attribute Attribute Desc. Attribute
Domain
```
```
Attribute
Def. Val.
```
```
Attribute Constraint
```
```
ride Represents a
single boat
trip listed by a
boat owner. A
ride has a
defined route,
schedule,
cost, and can
re-occur in
specified time
intervals.
```
```
id Unique identifier of the ride. INTEGER auto-gene
rated
```
```
Primary key, not null,
unique
ticket_cost Cost per passenger ticket
expressed in EUR.
```
```
FLOAT null Not null, must be >= 0
```
```
expected_arrival Expected arrival date and
time at the end port.
```
```
TIMESTAMP null Not null
```
```
description Additional ride information
provided by the boat owner.
```
```
TEXT null Nullable
```
```
date Scheduled departure date
and time.
```
```
TIMESTAMP null Not null
```
```
cross_border Whether the ride crosses an
international border.
Cross-border rides are
flagged for cold storage
retention. Especially
important for rides which
enter the EU from
Montenegro
```
```
BOOLEAN FALSE Not null
```
```
generic_response Automatic response sent to
each user who sends a chat
message or submits a
booking request
```
```
TEXT null Nullable
```
```
posted_at Timestamp when the ride
listing was published.
```
```
TIMESTAMP CURREN
T_DATE
```
```
Not null
```
```
cancelled_at Timestamp when the ride
was cancelled by the owner.
Used to trigger the
cancellation penalty logic.
```
```
TIMESTAMP null Nullable
```
```
status Current state of the ride.
Used in search for filtering
occupied or cancelled rides
```
```
ENUM('activ
e', 'full',
'completed',’
scheduled’,
'cancelled')
```
```
'active' Not null
```
```
weekly_repeats Days of the week on which
this ride recurs
```
```
ENUM(‘mon’
,..., ‘sun’),
```
```
null Nullable
```
(^) **tourist_confirmed_
completion**
Whether the tourist has
confirmed the ride was
completed. Required before a
review can be submitted.
BOOLEAN FALSE Not null
(^) **owner_confirmed_
completion**
Whether the boat owner has
confirmed the ride was
completed. Required before a
review can be submitted.
BOOLEAN FALSE Not null


```
Entity
Name
```
```
Entity Desc. Entity Attribute Attribute Desc. Attribute
Domain
```
```
Attribute
Def. Val.
```
```
Attribute Constraint
```
**ride_stop** Represents an
intermediate
port stop on a
ride route,
ordered
between the
start and end
ports defined
on the ride.
This information
is overwritten
together with
the ride.

```
id Unique identifier of the
stop record.
```
```
INTEGER auto-gener
ated
```
```
Primary key, not null,
unique
stop_order Sequence position of
this stop in the route,
starting from 1.
```
```
INTEGER null Not null, must be >= 1
```
```
available_seats Remaining seats
available for
passengers boarding
from this stop onward.
```
```
INTEGER null Not null, must be >= 0
```
```
expected_arrival Expected arrival time at
this stop.
```
```
TIMESTAMP null Not null
```
```
date Scheduled departure
time from this stop.
```
```
TIMESTAMP null Not null
```
```
Entity
Name
```
```
Entity Desc. Entity
Attribute
```
```
Attribute Desc. Attribute
Domain
```
```
Attribute
Def. Val.
```
```
Attribute Constraint
```
**booking** Records a
tourist's request
to join a specific
ride. Tracks the
full lifecycle from
initial request
through owner
confirmation,
completion, and
payment.

```
id Unique identifier of the
booking.
```
```
INTEGER auto-gener
ated
```
```
Primary key, not null,
unique
cost Total cost of the booking at
the time of confirmation, in
EUR.
```
```
FLOAT null Not null, must be >= 0
```
```
number_of
_tickets
```
```
Number of passenger seats
reserved in this booking.
```
```
INTEGER 1 Not null, must be >= 1
```
```
created_at Timestamp when the booking
request was submitted.
```
```
TIMESTAMP CURRENT
_DATE
```
```
Not null
```
```
status_con
firmed
```
```
Whether the booking has
been accepted by the boat
owner.
```
```
BOOLEAN FALSE Not null
```
```
commissio
n_charged
```
```
Whether the platform service
fee has been collected from
this booking.
```
```
BOOLEAN FALSE Not null
```
```
Entity
Name
```
```
Entity Desc. Entity
Attribute
```
```
Attribute Desc. Attribute
Domain
```
```
Attribute
Def. Val.
```
```
Attribute Constraint
```
**chat** Represents the
messaging
thread
associated with
a single booking.
One chat exists
per booking.
Cross-border
chats are
retained in cold
storage for the
Jurisdictional
API.

```
id Unique identifier of the chat
thread.
```
```
INTEGER auto-gener
ated
```
```
Primary key, not null,
unique
crossing_bor
der
```
```
Whether the associated ride
crosses an international
border. Determines cold
storage retention.
```
```
BOOLEAN FALSE Not null
```
```
scheduled_d
eletion_at
```
```
Timestamp after which the
chat is automatically
purged, set to 4 hours after
ride completion.
```
```
TIMESTAMP null Nullable
```

```
Entity
Name
```
```
Entity Desc. Entity
Attribute
```
```
Attribute Desc. Attribute
Domain
```
```
Attribute
Def. Val.
```
```
Attribute Constraint
```
**message** A single
message sent
within a chat
thread. The
regex content
filter marks
flagged
messages
rather than
deleting them
silently,
allowing
moderator
review.

```
id Unique identifier of the
message.
```
```
INTEGER auto-gener
ated
```
```
Primary key, not null,
unique
content Text content of the
message.
```
```
TEXT null Not null
```
```
time Timestamp when the
message was sent.
```
```
TIMESTAMP CURRENT
_DATE
```
```
Not null
```
```
is_flagged Whether the content
moderation regex filter
flagged this message for
review.
```
```
BOOLEAN FALSE Not null
```
```
Entity
Name
```
```
Entity Desc. Entity
Attribute
```
```
Attribute Desc. Attribute
Domain
```
```
Attribute
Def. Val.
```
```
Attribute Constraint
```
**review** A rating and
written review
left by one user
about another
after a
completed ride.
Only unlocked
once both
parties confirm
completion.

```
id Unique identifier of the
review.
```
```
INTEGER auto-gener
ated
```
```
Primary key, not null,
unique
rating Numeric rating given by the
reviewer on a scale of 1 to
5.
```
```
INTEGER null Not null, must be
between 1 and 5
```
```
description Written review text provided
by the reviewer.
```
```
TEXT null Nullable
```
```
date Timestamp when the review
was submitted.
```
```
DATETIME CURRENT
_DATE
```
```
Not null
```
```
Entity
Name
```
```
Entity Desc. Entity
Attribute
```
```
Attribute Desc. Attribute
Domain
```
```
Attribute
Def. Val.
```
```
Attribute Constraint
```
**transaction** Records
every
financial
operation
including ride
payments,
refunds,
cancellation
penalties,
and
subscription
purchases.
Stripe
handles all
card
processing;
no card data
is stored
here.

```
id Unique identifier of the
transaction.
```
```
INTEGER auto-gener
ated
```
```
Primary key, not null,
unique
stripe_paym
ent_id
```
```
Stripe payment intent or
charge ID returned by the
Stripe API.
```
```
VARCHAR(100) null Nullable
```
```
type Nature of the financial
operation.
```
```
ENUM('ride_pay
ment', 'refund',
'penalty',
'subscription')
```
```
null Not null
```
```
status Current processing state of
the transaction.
```
```
ENUM('pending',
'completed',
'failed', 'retrying')
```
```
'pending' Not null
```
```
amount Transaction amount
expressed in EUR.
```
```
FLOAT(2) null Not null
```

```
Entity
Name
```
```
Entity Desc. Entity
Attribute
```
```
Attribute Desc. Attribute
Domain
```
```
Attribute
Def. Val.
```
```
Attribute Constraint
```
```
report Records a report
submitted by any
user against
another user or
a ride listing for
guideline
violations,
non-payment, or
inappropriate
behaviour.
```
```
id Unique identifier of the
report.
```
```
INTEGER auto-gener
ated
```
```
Primary key, not null,
unique
type Indicates whether the report
targets a user a ride listing
or a message
```
```
ENUM('user',
'ride,’message’')
```
```
null Not null
```
```
description Explanation of the reason
for the report.
```
```
TEXT null Not null
```
```
status Current resolution status of
the report
```
```
ENUM('pending',
'reviewed',
'resolved',
'dismissed')
```
```
'pending' Not null
```
```
date Timestamp when the report
was submitted.
```
```
TIMESTAMP CURRENT
_DATE
```
```
Not null
```
https://www.figma.com/board/yvCSEGgSN1uc2dbUn40WuQ/Seminar?node-id=0-1&t=76cT2TKTyG8L
d zd-

## Physical model:

```
Figure 2: Physical data model. Creation video is available here.
```

## Wireframe diagrams

_The design is available here_


