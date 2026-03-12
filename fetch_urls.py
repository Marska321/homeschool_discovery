import urllib.request
import re

url = "https://en.wikipedia.org/wiki/Ballroom_dance"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    images = re.findall(r'//upload\.wikimedia\.org/wikipedia/commons/thumb(?:(?:/[0-9a-fA-F]+)+/[^/\'"]+\.jpg)/\d+px-[^/\'"]+\.jpg', html)
    with open('url.txt', 'w') as f:
        for img in sorted(set(images)):
            f.write("https:" + img + "\n")
except Exception as e:
    with open('url.txt', 'w') as f:
        f.write("Error: " + str(e) + "\n")
