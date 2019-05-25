# Using Hugo

I love Hugo as a static site generator, but when it comes to modifying themes, I get very confused as to which layout files are responsible for which page of the display, so this file is my attempt to document this for my future self.

- Home
  - layouts -> \_default -> list.html
  - layouts -> \_default -> single.html for each post
- Apps
  - content -> apps.md (type = 'apps')
  - layouts -> apps -> single.html
- Archives
  - layouts -> \_default -> section.html
- Tags
  - layouts -> \_default -> terms.html
  - layouts -> \_default -> taxonomy.html for each tag listing
- Contact
  - content -> contact.md
- JSON Feed
  - layouts -> \_default -> list.json.json

Hello Friend theme edit: 
 - Partials/logo.html
 - add width style to logo__cursor
 -     <span class="logo__cursor" style="width: 2px"></span>


Plus various partials of header, footer, pagination, menu etc.
