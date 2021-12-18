docker run --rm -it --name code8081 --env PASSWORD=123 -v $(pwd):/app/hello -v ~/.ssh:/root/.ssh:ro -p 8081:8080 -p 3000:3000 node14
