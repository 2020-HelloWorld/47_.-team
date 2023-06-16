import http.server
import http.client
import json

class ProxyHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        # Specify the target server and path
        target_host = '4592-2401-4900-61b6-f711-85e9-27c7-2d3e-bc0e.ngrok-free.app'
        target_path = self.path

        # Create a connection to the target server
        connection = http.client.HTTPSConnection(target_host)

        # Send a GET request to the target server
        connection.request('GET', target_path)

        # Get the response from the target server
        response = connection.getresponse()

        # Extract the cookie from the response
        cookie = response.headers['Set-Cookie'].split(";")[0]
        cookie = cookie.split("=")
        key = cookie[0]
        value = cookie[1]
        message = {key: value}
        message = json.dumps(message)

        # Set the CORS headers
        self.send_response(response.status)
        self.send_header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Allow-Credentials', 'true')

        # Copy the response headers to the client
        for header, value in response.getheaders():
            if header != 'Content-Length':
                self.send_header(header, value)

        # Set the content type and content length headers
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(message)))

        # End the response headers
        self.end_headers()

        # Send the response body to the client
        self.wfile.write(message.encode())

        # Close the connection to the target server
        connection.close()

    def do_OPTIONS(self):
        # Set the CORS headers for the OPTIONS request
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Allow-Credentials', 'true')
        self.end_headers()

if __name__ == '__main__':
    # Specify the proxy server address and port
    proxy_address = ('0.0.0.0', 4000)
    # Create and start the proxy server
    proxy_server = http.server.HTTPServer(proxy_address, ProxyHandler)
    print('Proxy server is running on http://0.0.0.0:4000')
    proxy_server.serve_forever()
