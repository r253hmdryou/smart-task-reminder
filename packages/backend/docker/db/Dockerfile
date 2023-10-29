FROM mysql:8.0 as build
ENV LANG="C.UTF-8" TZ="Asia/Tokyo"
USER mysql
COPY files /
EXPOSE 3306
CMD ["mysqld"]
