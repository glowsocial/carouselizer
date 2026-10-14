# Carouselizer

Carouselizer is a free tool from [boomp.net](https://boomp.net).
This repo is the one static page at [carouselizer.ai](https://carouselizer.ai).
The page runs no JavaScript.
Nothing is stored or collected on this site.

## How it works

The page holds a plain GET form that points at https://boomp.net/free-carousel-generator.
The form sends the visitor's `website` plus four `utm_*` values.
The boomp.net generator does the work and asks for the email.
This site has no backend.

## The hand-off contract

| Parameter | Value | Who reads it |
|-----------|-------|--------------|
| `website` | What the visitor types (up to 2,048 characters) | The boomp.net generator pre-fills its website box |
| `utm_source` | `carouselizer` | boomp.net first-touch attribution |
| `utm_medium` | `microsite` | boomp.net first-touch attribution |
| `utm_campaign` | `free_generator` | boomp.net first-touch attribution |
| `utm_content` | The placement (see below) | boomp.net first-touch attribution |

There are four placements.
Three come from the page body, and the fourth is the header logo link.

- `carouselizer_hero`: the form in the hero.
- `carouselizer_close`: the form in the closing section.
- `carouselizer_plans`: links to boomp.net pricing.
- `carouselizer_logo`: the header logo link.

Plain legal and footer links (privacy, terms) carry no tags.

## Where the assets came from

- Logos: the Boomp brand kit at https://boomp.net/branding.
- Slides: resized to 640 x 800 WebP from a real carousel Boomp made and published for Daily Bolt.
- Favicons: the Boomp icon. The 32 px and 192 px versions are flattened onto the Chalk ground `#f6f1ef`.
- Share card: fetched from boomp.net's own renderer with exactly this URL:

```
https://boomp.net/api/og?title=Carouselizer%3A%20free%20carousels%20from%20any%20website&description=Type%20your%20website.%20Get%20eight%20finished%20slides%2C%20a%20PDF%2C%20and%20the%20caption.%20Free.
```

## How it deploys

The site runs on GitHub Pages from branch `main` at the repo root.
The custom domain comes from the `CNAME` file.
HTTPS is enforced.
A push to `main` publishes within a few minutes.
Never delete or edit the `CNAME` file; without it the custom domain drops.

## Before you push

- No gradients and no emoji.
- Only the Boomp palette hexes.
- Every link resolves.
- No price or statistic that is not sourced.

## License

See [LICENSE](LICENSE).
