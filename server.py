from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from urllib import parse
from maze import MazeTree


def generate_maze(h, w):

    mzt = MazeTree.generate_random_maze(int(w[0]),int(h[0]))
    print (mzt)
    return mzt.to_json()

class GetHandler(BaseHTTPRequestHandler):

    def do_GET(self):

        urlParsed = parse.urlparse(self.path)
        print (urlParsed)
        print('query   :', urlParsed.path)
        message = ""
        if (urlParsed.path == '/generate_maze'):
            parm = parse.parse_qs(urlParsed.query)
            print ('PARM   :', parm)
            h = parm['height']
            w = parm['width']
            message = generate_maze(h,w)

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        self.wfile.write(bytes(message, 'utf8'))
        return

    def do_POST(self):
        content_len = int(self.headers.getheader('content-length'))
        post_body = self.rfile.read(content_len)
        self.send_response(200)
        self.end_headers()

        data = json.loads(post_body)

        self.wfile.write(mzt['foo'])
        return

if __name__ == '__main__':
    server = HTTPServer(('localhost', 8080), GetHandler)
    print ('Starting server at http://localhost:8080')
    server.serve_forever()