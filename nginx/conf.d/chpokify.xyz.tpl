upstream frontend_host {
    server ${DEV_IP_ADDR}:${CLIENT_PORT};
}

upstream backend_host {
    server server:${SERVER_PORT};
}

server {
    listen 443 ssl http2;
    server_name chpokify.xyz;

    include /var/www/html/docker/ssl/chpokify.xyz;

    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy false;
    proxy_set_header X-GeoIP2-City-County-Code ${COUNTRY_CODE};
    proxy_set_header X-GeoIP2-City-County-NAME ${COUNTRY_NAME};

    location /tilda {
        proxy_pass http://tilda:8080;
    }

    location /save-sprint-planning-time {
        proxy_pass http://tilda:8080;
    }

    location /ru/save-sprint-planning-time {
        proxy_pass http://tilda:8080;
    }

    location /purpose {
        proxy_pass http://tilda:8080;
    }

    location /press {
        proxy_pass http://tilda:8080;
    }

    location /team {
        proxy_pass http://tilda:8080;
    }

    location /join {
        proxy_pass http://tilda:8080;
    }

    location /contact {
        proxy_pass http://tilda:8080;
    }

    location /integrations {
        proxy_pass http://tilda:8080;
    }

    location /enterprise {
        proxy_pass http://tilda:8080;
    }

    location /planning-poker-guide {
        proxy_pass http://tilda:8080;
    }

    location /icebreaker-questions {
        proxy_pass http://tilda:8080;
    }


    location /retro {
        proxy_pass http://tilda:8080;
    }

    location /agile-ecosystem {
        proxy_pass http://tilda:8080;
    }

    location /ru/agile-ecosystem {
        proxy_pass http://tilda:8080;
    }

    location /events {
       proxy_pass http://tilda:8080;
    }

    location /events/agile-cyprus-meetup {
       proxy_pass http://tilda:8080;
    }

    location /api {
        proxy_pass http://backend_host;
    }

    location /_next/webpack-hmr {
        proxy_pass http://frontend_host/_next/webpack-hmr;

        proxy_redirect off;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    location /socket.io {
        proxy_pass http://server:8083/socket.io/;
        proxy_redirect off;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        proxy_pass http://frontend_host;
    }
}
