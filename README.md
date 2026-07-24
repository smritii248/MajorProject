# EcoThread (simple version)

Same 4 screens, same design — just simpler code. No design-token file, no
style-object props, just plain Tailwind classes directly in each component.
Easier to read, easier to explain, easier to tweak.

## Layout

```
src/
  App.jsx                  page routing (which screen is showing)
  main.jsx                 entry point

  components/               small reusable pieces
    StatusBar.jsx
    BottomNav.jsx
    Pill.jsx                filter chip (All / Donate / Sell ...)
    Tag.jsx                 colored badge (Reusable, Donate, ...)
    StatCard.jsx            small metric tile

  screens/                  one file per full page
    HomeScreen.jsx           Assess a garment
    ReportScreen.jsx         Garment report
    PlacesScreen.jsx         Nearby places
    MarketScreen.jsx         Marketplace
    ProfileScreen.jsx        placeholder
```

## Run it

```bash
npm install
npm run dev
```

Open the printed `http://localhost:5173/` link.

## Flow

Home → tap photo box → Report → tap "Sell it"/"Donate" → Places → back
arrow returns to Report → back arrow returns to Home. Market/Profile are
plain tab switches.
