# Using Hugo

I love Hugo as a static site generator, but when it comes to modifying themes, I get very confused as to which layout files are responsible for which page of the display, so this file is my attempt to document this for my future self.

- Home
  - theme -> layouts -> \_defaults -> list.html
  - theme -> layouts -> \_defaults -> single.html for each post
- Apps
  - content -> apps.md (type = 'apps')
  - layouts -> apps -> single.html
- Archives
  - theme -> layouts -> \_defaults -> section.html
- Tags
  - theme -> layouts -> \_defaults -> terms.html
  - theme -> layouts -> \_defaults -> taxonomy.html for each tag listing
- Contact
  - content -> contact.md
- JSON Feed
  - layouts -> \_defaults -> list.json.json

Plus various partials of header, footer, pagination, menu etc.
