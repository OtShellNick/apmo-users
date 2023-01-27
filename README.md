# apmo-users

For start app on clean Ubuntu 22.04 run next commands:

```
sudo chmod +x ./start.sh
sudo ./start.sh
```

or app can run in Docker container

```
docker build -t 'apmo-users:1' .
docker run -d -p 8088:80 apmo-users:1
```