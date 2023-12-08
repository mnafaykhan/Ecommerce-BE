NGINX CONFIGURATION WITH NODE
===============================
sudo apt-get udate
sudo apt-get install nginx
sudo service nginx status
sudo unlink /etc/nginx/sites-available/default

cd /etc/nginx/sites-available
touch my_node_server.config

sudo vim /etc/nginx/sites-available/my_node_server.config

Paste in the following configuration:
-------------------------------------
#The Nginx server instance
server{
    listen 80;
    server_name wach.quest;
    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_pass http://127.0.0.1:3500;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        # location /overview {
        #     proxy_pass http://127.0.0.1:3000$request_uri;
        #     proxy_redirect off;
        # }
    }
}


The above configuration has Nginx listening on port 80 on your-domain.com. The / is your Uniform Resource Identifier (URI) with the following properties:

proxy_set_header, which sets the host header to be that of the Nginx server
proxy_pass http, which instructs Nginx to proxy all requests matching the location pattern to an upstream (backend) server
proxy_http_version, which converts the incoming connection to HTTP 1.1
proxy_set_header Upgrade, which converts the proxied connection to type Upgrade because WebSockets only communicate on upgraded connections
proxy_set_header Connection, which ensures the connection header value is U``pgrade
Save the changes and exit the file by clicking the Esc key. Then, type the command :wq and hit the Enter or return key.

For the next step, let’s enable the above file by creating a symbolic from it to the sites-enabled directory, which Nginx reads from during startup:


sudo ln -s /etc/nginx/sites-available/my_node_server.config /etc/nginx/sites-enabled/


The server block is now enabled and configured to return responses to requests based on the listen port and location path.

Now it’s time to start both our Node.js application and the Nginx service to trigger the recent changes. But first, let’s check the status of Nginx to confirm that the configuration is working properly:


sudo nginx -t


The output upon running the above command would look like this:

nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful

The above output confirms that our configuration was successful. Next, restart Nginx to enable your changes:

sudo systemctl restart nginx
With Nginx running again, let’s allow full access through the Nginx firewall:

sudo ufw allow 'Nginx Full'
Next, navigate to the directory of the Node.js application:

cd ~/nginx_server_project
Start your Node.js server application using the following command:

node server.js
Node.js Server Running And Listening For A Request
Open your browser and access the Node.js application using your-domain.com:

Accessing The Node.js Application
Now we can navigate to the address your-domain.com/overview on the browser and access the /overview endpoint of our application:

Accessing The /overview Endpoint
To further test if every other path we defined is working, let’s try the last path, your-domain.com/api:

Accessing The /api Endpointq
