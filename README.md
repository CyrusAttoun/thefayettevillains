# thefayettevillains Monorepo

## Structure

- `client/` — React frontend (Mantine, Vite)
- `server/` — Python backend (add your API code)
- `.github/` — CI/CD workflows

## Setup

See `client/README.md` and `server/README.md` for details.

---

TheFayettevillains
------------------
A community postings site for residents of Fayetteville, AR and surrounding areas
mockup site at: https://fayetteville-vibes-hub.lovable.app/

Areas of Site
-------------
- different areas on site:
	- home
	- art listings
	- rummage sale map
	- land/houses: real estate site using AI, free to list, AI sales process 
	- general posts / photos
	- restaurant finder
	- items for sale or for free
	- Fayetteville foraging map -- the site sucks, though. Talk to neighbor and see if there is an API or something 
- each area is composed of a listing of cards
- posts under each area are under a common interface -- a card
- home: the home page of the site should show an auto-scrolling carousel of featured items

Features:
---------
- anyone can browse, but interactions or posting require a login (fb, google, apple only?)
- all comments, photos, and postings must pass the AI vibe check
- comments can be controlled by the person that posted as well
- privacy-focused -- we don't sell people's data
- we sort results based on date posted, popularity of posting, whether or not it is featured/boosted, and an AI content rating (if it's negative we deprioritize it)

What does a card have?
----------------------
- combination of photos, audio, video
- rich text
- people can comment -- but the poster controls the comment
- people can also message the poster if the poster allows items
- to message or post, one must be logged in
- each area has specific features and behavioral differences. For example:
	- cards expire at different times depending on which area they are under
	
Tech Stack
----------
- react + radix-ui for frontend
- publish frontend to github pages initially -- perhaps cloudflare workers in the future
- build process for front end -- github workflows
- python on backend?  I need python for AI so I might as well use it for everything
- I wonder what to use for blob storage and databases.
