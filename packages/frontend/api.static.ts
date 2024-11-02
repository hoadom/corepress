import { api } from "encore.dev/api";

export const assets = api.static({
  expose: true,
  path: "/admin/*path",
  dir: "./assets",
});

export const rootAssets = api.static({
  expose: true,
  path: "/!path",
  dir: "./assets",
  notFound: "./assets/not_found.html",
});
