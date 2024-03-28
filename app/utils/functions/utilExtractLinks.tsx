export function utilExtractLinks(postText: string) {
  // Regular expression to match URLs
  var urlRegex = /(https?:\/\/[^\s]+)/g;

  // Array to store the extracted URLs
  var urls = [] as string[];

  // Match URLs in the post text
  var matches = postText.match(urlRegex);

  // If matches are found, iterate over them and push to the URLs array
  if (matches) {
    matches.forEach(function (url) {
      urls.push(url);
    });
  }

  return urls;
}
