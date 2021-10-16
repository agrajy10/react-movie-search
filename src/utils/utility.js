export function formatReleaseDate(releaseDate) {
    const date = new Date(releaseDate);
    return `${date.getDate()} ${date.toLocaleString("en-us", {
      month: "long",
    })} ${date.getFullYear()}`;
  }