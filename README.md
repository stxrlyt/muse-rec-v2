Mapping alternative Turtle file paths to the pages in this folder:

1. app/components/settings.tsx - settings.ttl
2. app/findMore/page.tsx - behave-knowledge.ttl and session.ttl
3. app/accountHistory/page.tsx - history.ttl/songs.ttl

songCard.tsx can be attributed to either the songs in history.ttl, behave-knowledge.ttl, or session.ttl depending on the page it's used in.

The songs recommended in Homepage can be increased or decreased by the <select> component in the top right corner.