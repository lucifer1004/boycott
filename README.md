# Boycott

This is a Udacity project. It is statically deployed
[here](https://boycott.gabriel-wu.com) via Now.

## To run it locally

```sh
git clone https://github.com/lucifer1004/boycott
cd boycott
yarn install
yarn start
```

You can then visit it at `localhost:3000`

## Features

- Search for places using Yelp Fusion API (`cors-anywhere` is used to address
  the CORS issue)
- Filter options: All/Open/High Rating/Low Price
- Use of Google Map API is via
  [`@googlemap-react/core`](https://github.com/lucifer1004/react-google-map),
  which is a React wrapper for Google Map written by myself.
