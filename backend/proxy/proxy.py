import http.server
import http.client
import json

class ProxyHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        # Specify the target server and path
        target_host = 'f2b0-2401-4900-61c6-f7d4-c4ab-c401-7f76-1dfb.ngrok-free.app'
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
        self.send_header('Access-Control-Allow-Origin', 'http://localhost:3000')
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
        self.send_header('Access-Control-Allow-Origin', 'http://localhost:3000')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Allow-Credentials', 'true')
        self.end_headers()

    
    def do_POST(self):
        # Specify the target server and path
        target_host = 'f2b0-2401-4900-61c6-f7d4-c4ab-c401-7f76-1dfb.ngrok-free.app'
        target_path = self.path

        # Extract the POST data from the request
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length).decode('utf-8')

        # Parse the POST data as JSON
        json_data = json.loads(post_data)
        print(json_data)
        # Convert the JSON data to a string
        json_string = json.dumps(json_data)

        # Create a connection to the target server
        connection = http.client.HTTPSConnection(target_host)

        # Set the headers for the POST request
        headers = {
            'Content-Type': 'application/json',
            'Content-Length': str(len(json_string))
        }

        # Send a POST request to the target server
        connection.request('POST', target_path, body=json_string, headers=headers)

        # Get the response from the target server
        response = connection.getresponse()
        
        # Set the CORS headers
        self.send_response(response.status)
        self.send_header('Access-Control-Allow-Origin', 'http://localhost:3000')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Allow-Credentials', 'true')

        # Copy the response headers to the client
        for header, value in response.getheaders():
            if header != 'Content-Length':
                self.send_header(header, value)

        # Get the response body
        response_body = response.read().decode('utf-8')
        response_data = json.loads(response_body)

        # Modify the response data as needed
        cookie  = ""
        try:
            cookie = response.headers['Set-Cookie']
            cookie = list(cookie.split(';'))[0]
            cookie = list(cookie.split("="))
            print(cookie)
        except:
            pass
        response_data[cookie[0]] = cookie[1]

        # Convert the modified response data back to a JSON string
        response_body = json.dumps(response_data)
        response_bytes = response_body.encode('utf-8')
        
        # Set the content type and content length headers
        self.send_header('Content-Length', str(len(response_bytes)))

        # End the response headers
        self.end_headers()

        # Send the response body to the client
        self.wfile.write(response_bytes)

        # Close the connection to the target server
        connection.close()
        
if __name__ == '__main__':
    # Specify the proxy server address and port
    proxy_address = ('0.0.0.0', 4000)
    # Create and start the proxy server
    proxy_server = http.server.HTTPServer(proxy_address, ProxyHandler)
    print('Proxy server is running on http://0.0.0.0:4000')
    proxy_server.serve_forever()
